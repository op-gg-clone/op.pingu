import { RecordsService } from './records.service';
export declare class RecordsController {
    private recordsService;
    constructor(recordsService: RecordsService);
    getMatchesBySummonerName(summonerName: string): Promise<any>;
    getSummonerInfoBySummonerName(summonerName: string): Promise<any>;
}
