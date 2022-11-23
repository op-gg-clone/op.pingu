import { Controller, Get, Param, Query } from '@nestjs/common';
import { LolService } from './lol.service';

@Controller('riotApi')
export class LolController {
  constructor(private readonly lolSercvice: LolService) {}
  // * sommonerName 검색 후 puuid return
  @Get('/summoner/:username')
  getMatchInfoByUserName(
    @Param('username') username: string,
    @Query('start') start?: number,
  ) {
    return this.lolSercvice.getMatchsByUsername(username, start);
  }
}
