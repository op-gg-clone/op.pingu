import { HttpService } from '@nestjs/axios';
export declare class RecordsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getMatchesBySummonerName(summonerName: any, start: any): Promise<any>;
    getSummonerInfoBySummonerName(summonerName: any): Promise<any>;
    getSummonerId(summonerName: string): Promise<any>;
    getSummonerInfo(summonerId: string): Promise<any>;
    getMatches(puuid: string, start: number): Promise<any>;
    getMatchDetail(matchId: string): Promise<any>;
}
