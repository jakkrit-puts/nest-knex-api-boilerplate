import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Get()
    async getUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }
}
