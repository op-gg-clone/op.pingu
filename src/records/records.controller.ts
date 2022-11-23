import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service'
import { Summoner } from './summoner.model';

@Controller('records')
export class RecordsController {
    constructor(private recordsService : RecordsService){}

@Get(':summonerName')
async getMatchDetail(@Param('summonerName') summonerName : string){
    return this.recordsService.getMatchDetail(summonerName);
}

}
