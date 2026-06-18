import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [CoreModule],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

    describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = await appService.getHello();
      expect(result).toBe('Hello World!');
    });
  });
});

