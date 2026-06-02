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
  return await this.appService.testCache();
}
}