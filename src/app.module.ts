import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apps/users/users.module';
import { PersonsModule } from './apps/persons/persons.module';
import { AuthModule } from './apps/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
