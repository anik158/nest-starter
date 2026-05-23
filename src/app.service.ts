import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private readonly configService: ConfigService) {

  }
  getHello() {
      const environmentVariable = this.configService.get('environement') ;
      console.log(`Current environment: ${environmentVariable}`);
      // return {
      //   data: 'Hello World!',
      //   meta: {
      //     pages: 10,
      //   },
      // };

      return undefined;
      return 'Hello World!';


  }
}
