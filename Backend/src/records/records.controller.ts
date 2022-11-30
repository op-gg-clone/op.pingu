import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/matchesInfo/:summonerName')
  async getMatchesBySummonerName(
    @Param('summonerName') summonerName: string,
    @Query('start') start?: number,
  ) {
    return this.recordsService.getMatchesBySummonerName(summonerName, start);
  }

  @Get('/summonerInfo/:summonerName')
  async getSummonerInfoBySummonerName(
    @Param('summonerName') summonerName: string,
  ) {
    return this.recordsService.getSummonerInfoBySummonerName(summonerName);
  }
}
