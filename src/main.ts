import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true })); 

  // Helmet
  app.use(helmet());   // Security Headers

  // Rate Limit
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัด 100 requests ต่อ IP
    message: 'Too many requests from this IP, please try again later',
  });
  app.use(limiter);

  // CORS
  app.enableCors({
    // origin: ['https://yourdomain.com'], // อนุญาตเฉพาะ domain ที่กำหนด
    // methods: 'GET,POST,PUT,DELETE',
    // credentials: true,
  });
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
