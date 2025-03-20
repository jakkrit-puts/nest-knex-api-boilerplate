import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../services/logger.service'; // ใช้ LoggerService

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;
      const timestamp = new Date().toISOString(); 
      
      this.loggerService.log(`[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${responseTime}ms - IP: ${ip}`);
    });

    next();
  }
}
