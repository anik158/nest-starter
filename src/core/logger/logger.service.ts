import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {

  private logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {

    const environment = this.configService.getOrThrow('environment');
    const isDevelopment = environment === 'development';
    
    console.log(`Logger initialized with environment: ${environment}`);

    const {combine, timestamp, json, colorize, printf} = winston.format;

    const logFormat = isDevelopment ? combine(
      colorize(),
      timestamp(),
      printf(({ timestamp, level, message, context, timestamp: ts, meta }) => {
        const contextStr = context ? ` [${context}]` : '';
        const metaStr = meta ? JSON.stringify(meta) : '';
        return `${level} ${ts}${contextStr}: ${message} ${metaStr}`;
      })
    ) : combine(timestamp(), json());

    this.logger = winston.createLogger({
      format: logFormat,
      transports: [
        new winston.transports.Console()
      ]
    });
  }
  
  log(message: any, context?: string, meta?: any) {
    this.logger.info(message, { context, meta });
  }

  error(message: any, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, { trace, context, meta });
  }

  warn(message: any, context?: string, meta?: any) {
    this.logger.warn(message, { context, meta });
  }

  debug?(message: any, context?: string, meta?: any) {
    this.logger.debug(message, { context, meta });
  }

  
}
