import { BadRequestException, Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers() {
        const users = await this.userService.getAllUsers();
        return plainToInstance(UserResponseDto, users);
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        const user = this.userService.getUserById(id);
        return plainToInstance(UserResponseDto, user);
    }

    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto) {

        try {
            // check if email exists
            const emailExists = await this.userService.findByEmail(createUserDto.email);
            if (emailExists) {
                throw new HttpException('Email already exists', 400);
            }

            // check if username exists
            const usernameExists = await this.userService.findByUsername(createUserDto.username);
            if (usernameExists) {
                throw new HttpException('Username already exists', 400);
            }

            const user = await this.userService.createUser(createUserDto)

            return { message: "create user success", data: plainToInstance(UserResponseDto, user) };
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
