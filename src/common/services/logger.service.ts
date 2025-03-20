import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // ✅ บันทึก timestamp ที่อ่านง่าย
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%-app.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '30d',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
