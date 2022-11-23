import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class LolService {
  constructor(private readonly httpService: HttpService) {}

  // * Match
  async getMatchsByUsername(username: string, start = 0) {
    try {
      const puuid = await this.getPuuid(username);
      const matchIds = await this.getMatchId(puuid, start);
      const matchInfos = await this.getMatchInfo(matchIds);
      return matchInfos;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  //* GET puuid
  async getPuuid(username: string): Promise<AxiosResponse<any, any>> {
    try {
      const summonerInfo = await this.httpService
        .get(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
          {
            headers: { 'X-Riot-Token': process.env.RIOT_DEV_API_KEY },
          },
        )
        .toPromise();

      return summonerInfo.data.puuid;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  // * GET MatchId
  async getMatchId(
    puuid: AxiosResponse<any, any>,
    start: number,
  ): Promise<any> {
    try {
      const matchId = await this.httpService
        .get(
          `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=10`,
          {
            headers: { 'X-Riot-Token': process.env.RIOT_DEV_API_KEY },
          },
        )
        .toPromise();

      return matchId.data;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }

  //* GET MatchInfo
  async getMatchInfo(matchId: string[]): Promise<any> {
    try {
      const matchInfo = await matchId.map((match) =>
        this.httpService
          .get(`https://asia.api.riotgames.com/lol/match/v5/matches/${match}`, {
            headers: { 'X-Riot-Token': process.env.RIOT_DEV_API_KEY },
          })
          .toPromise(),
      );

      const result = await Promise.all([...matchInfo]) //
        .then((result) =>
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

      return result;
    } catch (error) {
      throw new HttpException(error.response.statusText, error.response.status);
    }
  }
}
