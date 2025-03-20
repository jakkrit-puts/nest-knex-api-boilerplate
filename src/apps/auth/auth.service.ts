import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RedisService } from '../../database/redis.service';
import { UserLoginDto } from './dto/user-login';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) { }


  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async login(userLoginDto: UserLoginDto) {

    const user = await this.userService.findByUsername(userLoginDto.username);

    if (!user) {
      throw new UnauthorizedException('User Invalid');
    }

    const isPasswordValid = await this.comparePassword(userLoginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password Invalid');
    }


    const payloadAccessToken = { sub: user.id, email: user.email, roles: user.role };
    const payloadRefreshToken = { sub: user.id };

    const accessToken = this.jwtService.sign(payloadAccessToken, { expiresIn: `${process.env.EXP_ACCESS_TOKEN}` });
    const refreshToken = this.jwtService.sign(payloadRefreshToken, { expiresIn: `${process.env.EXP_REFRESH_TOKEN}` });

    // Store refresh token in Redis with a 7-day expiry
    await this.redisService.set(`refresh_${user.id}`, refreshToken, 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string, oldRefreshToken: string) {
    const storedToken = await this.redisService.get(`refresh_${userId}`);

    if (!storedToken || storedToken !== oldRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }


    const user = await this.userService.getUserById(Number(userId));

    if (user) {
      const payloadAccessToken = { sub: user.id, email: user.email, roles: user.role };
      const payloadRefreshToken = { sub: user.id };

      const newAccessToken = this.jwtService.sign(payloadAccessToken, { expiresIn: `${process.env.EXP_ACCESS_TOKEN}` });
      const newRefreshToken = this.jwtService.sign(payloadRefreshToken, { expiresIn: `${process.env.EXP_REFRESH_TOKEN}` });

      await this.redisService.set(`refresh_${userId}`, newRefreshToken, 7 * 24 * 60 * 60);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
  }

  async logout(userId: string) {
    await this.redisService.del(`refresh_${userId}`);
  }
}
