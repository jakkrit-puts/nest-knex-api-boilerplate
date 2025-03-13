import { KnexService } from '../../database/knex.service';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    private userModel: UserModel;

    constructor(private readonly knexService: KnexService) {
        this.userModel = new UserModel(this.knexService);
    }

    async getAllUsers() {
        return this.userModel.findAll();
    }

    async getUserById(id: number) {
        return this.userModel.findById(id);
    }

    async createUser(createUserDto: CreateUserDto) {
        return this.userModel.create(createUserDto);
    }

    async updateUser(id: number, name: string) {
        return this.userModel.update(id, { name });
    }

    async deleteUser(id: number) {
        return this.userModel.delete(id);
    }

    // can create more from base-model ตรงนี้
    async findByEmail(email: string) {
        return this.knexService.getKnex()('users').where({ email }).first();
    }

    async findByUsername(username: string) {
        return this.knexService.getKnex()('users').where({ username }).first();
    }

}
