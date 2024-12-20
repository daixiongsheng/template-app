import { Controller, Get } from '@nestjs/common';

@Controller('main')
export class MainController {
  @Get()
  get() {
    return 'hello world';
  }
}
