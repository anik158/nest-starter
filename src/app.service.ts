import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {

  private context = 'AppService.getHello';

  constructor(private readonly logger: LoggerService, private readonly configService: ConfigService, private readonly databaseService: DatabaseService) {

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
      this.databaseService.user.findMany().then(users => {}).catch(error => {
        this.logger.error('Database error', error.stack, this.context, { additional: 'Additional log data' });
      });

      return 'Hello World!';


  }
}
