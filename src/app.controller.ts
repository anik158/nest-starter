import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return payload;
  }

@Get('test-cache')
async testCache() {
  const cacheKey = 'test-cache-key';

  const cachedData = await this.cacheManager.get(cacheKey);

  if (cachedData) {
    return { 
      source: '✅ FROM CACHE', 
      data: cachedData 
    };
  }

  const newData = {
    message: 'Hello from Redis Cache!',
    timestamp: new Date().toISOString()
  };

  // Fixed way for cache-manager-redis-yet
 await this.cacheManager.set(cacheKey, newData, 60 * 1000);

  return { 
    source: '🗄️ First call (saved to Redis)', 
    data: newData 
  };
}
}