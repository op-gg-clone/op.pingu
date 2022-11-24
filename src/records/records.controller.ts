import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get(':summonerName')
  async getMatchesBySummonerName(@Param('summonerName') summonerName: string) {
    return this.recordsService.getMatchesBySummonerName(summonerName, 0);
  }
}
