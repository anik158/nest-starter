import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';

@Injectable()
export class AppService {

  private context = 'AppService.getHello';

  constructor(private readonly logger: LoggerService, 
              private readonly configService: ConfigService, 
              private readonly databaseService: DatabaseService,
              private readonly cacheService: CacheService) {}
      
  getHello() {
      this.logger.log('Calling from getHelp method', this.context, { additional: 'Additional log data' });
      const environmentVariable = this.configService.get('environment') ;

       console.log(`Current environment: ${environmentVariable}`);
      // return {
      //   data: 'Hello World!',
      //   meta: {
      //     pages: 10,
      //   },
      // };

      // return undefined;
      this.databaseService.user.findMany().then(users => {}).catch(error => {
        this.logger.error('Database error', error.stack, this.context, { additional: 'Additional log data' });
      });

      return 'Hello World!';
  }

  async testCache() {
  const cacheKey = 'test-cache-key';

  const cachedData = await this.cacheService.get(cacheKey);

  if (cachedData) {
    return { 
      source: 'FROM CACHE', 
      data: cachedData 
    };
  }

  const newData = {
    message: 'Hello from Redis Cache!',
    timestamp: new Date().toISOString()
  };

  await this.cacheService.set(cacheKey, newData, 60 * 1000);

  return { 
    source: '🗄️ First call (saved to Redis)', 
    data: newData 
  };
}
}
