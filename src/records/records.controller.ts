import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/matchesInfo/:summonerName')
  async getMatchesBySummonerName(@Param('summonerName') summonerName: string) {
    return this.recordsService.getMatchesBySummonerName(summonerName, 0);
  }

  @Get('/summonerInfo/:summonerName')
  async getSummonerInfoBySummonerName(
    @Param('summonerName') summonerName: string,
  ) {
    return this.recordsService.getSummonerInfoBySummonerName(summonerName);
  }
}
