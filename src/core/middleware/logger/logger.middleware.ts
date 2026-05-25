import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from 'src/core/logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly logger: LoggerService) {}


  use(req: Request, res: Response, next: () => void) {
    
    res.on('finish', () => {
      const { method, originalUrl } = req;
      const { statusCode } = res;

      const logData = { method,
        originalUrl,      
      };

      if(statusCode >= 500) {
        this.logger.error(`${method} ${originalUrl} ${statusCode}`, undefined, 'HTTP', logData);
      } else if (statusCode >= 400) {
        this.logger.warn(`${method} ${originalUrl} ${statusCode}`,'HTTP', logData);
      } else {
        this.logger.log(`${method} ${originalUrl} ${statusCode}`, 'HTTP', logData);
      } 
  
    });
    next();
  }
}
