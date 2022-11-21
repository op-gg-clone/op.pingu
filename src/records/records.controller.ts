import { Controller, Get } from '@nestjs/common';
import { RecordsService } from './records.service'
import { Summoner } from './summoner.model';

@Controller('records')
export class RecordsController {
    constructor(private recordsService : RecordsService){}

@Get()
getSummoner(summonerName){
    return this.recordsService.getSummoner(summonerName);
}

}
