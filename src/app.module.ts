import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './apps/users/users.module';
import { PersonsModule } from './apps/persons/persons.module';
import { AuthModule } from './apps/auth/auth.module';
import { LoggerService } from './common/services/logger.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // ใช้งาน LoggerMiddleware ทุก Route
  }
}
