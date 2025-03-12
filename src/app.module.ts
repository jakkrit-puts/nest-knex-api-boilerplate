import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './apps/users/users.controller';
import { UsersModule } from './apps/users/users.module';
import { PersonsModule } from './apps/persons/persons.module';

@Module({
  imports: [UsersModule, PersonsModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
