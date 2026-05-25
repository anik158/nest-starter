import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  private context = 'AppService.getHello';

  constructor(private readonly logger: LoggerService, private readonly configService: ConfigService) {

  }
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

      return 'Hello World!';


  }
}
