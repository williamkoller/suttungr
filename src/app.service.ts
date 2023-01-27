import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message: `¯\_(ツ)_/¯`,
    };
  }
}
