import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller('')
export class AppController {
  @Get()
  index() {
    return 'PokerBox - Take your card game to a mixed event 🚀';
  }
}
