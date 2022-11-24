import { Injectable } from '@nestjs/common';
import { Summoner } from './summoner.model';
import { Match } from './matches.model';
import { ConfigService } from '@nestjs/config';
import { rmSync } from 'fs';
import { match } from 'assert';

@Injectable()
export class RecordsService {
  async getSummoner(summonerName: string) {
    try {
      const response = await fetch(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: { 'X-Riot-Token': process.env.API_KEY },
        },
      ).then((res) => res.json());
      console.log(response);
      return response;
    } catch (e) {
      return e;
    }
  }

  async getMatches(summonerName: string) {
    const user = await this.getSummoner(summonerName);
    const puuid = user.puuid;
    console.log(puuid);
    try {
      const response = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
        {
          headers: { 'X-Riot-Token': process.env.API_KEY },
        },
      ).then((res) => res.json());
      const res = response;
      console.log('matchID :', res);
      return res;
    } catch (e) {
      return e;
    }
  }

  async getMatchDetail(summonerName: string) {
    try {
      const matches = await this.getMatches(summonerName);
      const foundMatches = await Promise.all(
        matches.map(async (match) => {
          await fetch(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${match}`,
            {
              headers: { 'X-Riot-Token': process.env.API_KEY },
            },
          )
            .then((res) => res.json())
            .then((res) => console.log(res)); //<-----여기까진 불러와 진다
        }),
      );

      console.log('정제된 데이터 1: ');
      console.log('foundMatches: ', foundMatches); //<------그럼 여기서 object 20개 짜리 배열이 떠야하는데 왜 undefined 20개??

      const result = foundMatches.map((match) => {
        return {
          matchInfo: {
            gameCreation: match.info.gameCreation,
            gameDuration: match.info.gameDuration,
            gameEndTimestamp: match.info.gameEndTimestamp,
            gameId: match.info.gameId,
            gameMode: match.info.gameMode,
            gameName: match.info.gameName,
            gameStartTimestamp: match.info.gameStartTimestamp,
            gameType: match.info.gameType,
            gameVersion: match.info.gameVersion,
            mapId: match.metadata.mapId,
          },
          summonerInfo: match.info.participants.map((summoner) => {
            return {
              puuid: summoner.puuid,
              summonerName: summoner.summonerName,
              kill: summoner.kill,
              asistant: summoner.asistant,
              death: summoner.death,
              kda: summoner.challenges.kda,
              championName: summoner.championName,
              champLevel: summoner.champLevel,
              item0: summoner.item0,
              item1: summoner.item1,
              item2: summoner.item2,
              item3: summoner.item3,
              item4: summoner.item4,
              item5: summoner.item5,
              item6: summoner.item6,
              mainPerk: summoner.perk.styles[0].style,
              subPerk: summoner.perk.styles[1].style,
              spell1: summoner.summoner1Id,
              spell2: summoner.summoner2Id,
              totalDamageDealt: summoner.totalDamageDealt,
              totalDamageDealtToChampions: summoner.totalDamageDealtToChampions,
              totalDamageShieldedOnTeammates:
                summoner.totalDamageShieldedOnTeammates,
              totalDamageTaken: summoner.totalDamageTaken,
              totalMinionsKilled: summoner.totalMinionsKilled,
              neutralMinionsKilled: summoner.neutralMinionsKilled,
              visionWardsBoughtInGame: summoner.visionWardsBoughtInGame,
              wardsKilled: summoner.wardsKilled,
              wardsPlaced: summoner.wardsPlaced,
              win: summoner.win,
            };
          }),
        };
      });

      console.log('정제된 데이터 2 : ');
      return result;
    } catch (e) {
      console.log('!!!!!error!!!!!');
      return e;
    }
  }
}
