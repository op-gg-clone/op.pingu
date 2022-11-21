import { Injectable } from '@nestjs/common';
import { Summoner } from './summoner.model';
@Injectable()
export class RecordsService {
    private summoner:Summoner
    async getSummoner(summonerName : string){
        const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-bd9cfcf6-692d-45b5-9611-712944b60310`
        const r = await fetch(url);
        return r   
    }

    getMatches(puuid : string){

    }

    getMatchDetail(matchId){

    }
}
