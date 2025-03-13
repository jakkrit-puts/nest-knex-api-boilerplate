import { Exclude, Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserResponseDto extends PartialType(CreateUserDto) {
  @Exclude()
  password: string;
}