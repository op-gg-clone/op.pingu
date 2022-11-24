import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpservice: HttpService) {}
  private readonly API_KEY = process.env.API_KEY;

  async getAll(name: string): Promise<any[]> {
    //puuid 가져오기
    const userId = await this.getUserId(name);
    //매치 ID 리스트 가져오기
    const matchIdList = await this.getMatchIdList(userId);
    //매치 정보 가져오기
    const matchDataList = await this.getMatchDataList(matchIdList);

    return matchDataList;
  }

  async getUserId(name: string): Promise<string> {
    const ID_URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.API_KEY}`;
    const summoner = await firstValueFrom(this.httpservice.get(ID_URL));
    return summoner.data.puuid;
  }

  async getMatchIdList(id: string): Promise<[string]> {
    const MATCH_ID_LIST_URL = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${id}/ids?start=0&count=10&api_key=${this.API_KEY}`;
    const matchIdList = await firstValueFrom(
      this.httpservice.get(MATCH_ID_LIST_URL),
    );
    return matchIdList.data;
  }

  async getMatchDataList(matchIdList: Array<string>): Promise<any[]> {
    const matchDataList = await Promise.all(
      matchIdList.map(async (matchId: string) => {
        const match = await firstValueFrom(
          this.httpservice.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.API_KEY}`,
          ),
        );
        return match;
      }),
    ).then((result) =>
      result.map((match) => {
        const data = {
          gameDuration: match.data.info.gameDuration,
          queueId: match.data.info.queueId,
          participants: match.data.info.participants.map((user) => {
            return {
              summonerName: user.summonerName,
              champLevel: user.champLevel,
              championId: user.championId,
              championName: user.championName,
              win: user.win,
              kills: user.kills,
              assists: user.assists,
              deaths: user.deaths,
              kda: user.challenges.kda,
              items: [
                user.item0,
                user.item1,
                user.item2,
                user.item3,
                user.item4,
                user.item5,
                user.item6,
              ],
              summonerSpell1Id: user.summoner1Id,
              summonerSpell2Id: user.summoner2Id,
              totalDamageDealt: user.totalDamageDealt,
              totalDamageDealtToChampions: user.totalDamageDealtToChampions,
              totalDamageTaken: user.totalDamageTaken,
              totalCS: {
                totalMinionsKilled: user.totalMinionsKilled,
                neutralMinionsKilled: user.neutralMinionsKilled,
              },
              wardInfo: {
                visionWardsBoughtInGame: user.visionWardsBoughtInGame,
                wardsKilled: user.wardsKilled,
                wardsPlaced: user.wardsPlaced,
              },
              runeInfo: {
                main: {
                  style: user.perks.styles[0].style,
                  perk: user.perks.styles[0].selections[0].perk,
                },
                sub: { style: user.perks.styles[1].style },
              },
            };
          }),
        };
        return data;
      }),
    );
    return matchDataList;
  }
}
