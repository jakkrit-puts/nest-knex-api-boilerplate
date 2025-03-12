import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { KnexService } from 'src/database/knex.service';

@Module({
    controllers: [UsersController],
    providers: [UserService, KnexService],
    exports: [UserService]
})
export class UsersModule {

}
