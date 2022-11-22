import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpservice: HttpService) {}
  private readonly API_KEY = process.env.API_KEY;
  async getAll(name: string): Promise<any[]> {
    //puuid 가져오기
    const ID_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.API_KEY}`;
    const summoner = await firstValueFrom(this.httpservice.get(ID_URL));
    const puuid = summoner.data.puuid;
    //매치 ID 리스트 가져오기
    const MATCH_ID_LIST_URL = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.API_KEY}`;
    const matchIdList = await firstValueFrom(
      this.httpservice.get(MATCH_ID_LIST_URL),
    );
    const matches = matchIdList.data;
    //매치 정보 가져오기
    function matchListUrl(matchId: string): string {
      return `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.API_KEY}`;
    }
    const matchDataList = await Promise.all(
      matches.map(async (match: string) => {
        const { data } = await firstValueFrom(
          this.httpservice.get(matchListUrl(match)),
        );
        return data;
      }),
    );
    return matchDataList;
    // const { data } = await firstValueFrom(this.httpservice.get(MATCH_LIST_URL));
    // return data;
  }

  getOne(name: string): string {
    return name;
  }
}
