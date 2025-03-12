import { KnexService } from '../../database/knex.service';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';

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

    async createUser(name: string, email: string) {
        return this.userModel.create({ name, email });
    }

    async updateUser(id: number, name: string) {
        return this.userModel.update(id, { name });
    }

    async deleteUser(id: number) {
        return this.userModel.delete(id);
    }
}
