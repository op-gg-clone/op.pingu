import { Injectable } from '@nestjs/common';
import { Summoner } from './summoner.model';
import { Match } from './matches.model';
import { ConfigService } from '@nestjs/config';
import { rmSync } from 'fs';
import { match } from 'assert';

@Injectable()
export class RecordsService {
  // 사용자 아이디로 전적 불러오기
  async getMatchesBySummonerName(summonerName, start) {
    try {
      const { puuid } = await this.getSummoner(summonerName);
      const matchesId = await this.getMatches(puuid, start);
      const matchesDetail = await Promise.all(
        matchesId.map((matchId) => {
          return this.getMatchDetail(matchId);
        }),
      );
      return matchesDetail;
    } catch (error) {
      console.log(error);
    }
  }

  async getSummoner(summonerName: string) {
    try {
      const response = await fetch(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: { 'X-Riot-Token': process.env.API_KEY },
        },
      ).then((res) => res.json());
      return response;
    } catch (e) {
      return e;
    }
  }

  async getMatches(puuid: string, start: number) {
    try {
      const response = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=5`,
        {
          headers: { 'X-Riot-Token': process.env.API_KEY },
        },
      ).then((res) => res.json());
      return response;
    } catch (e) {
      return e;
    }
  }

  async getMatchDetail(matchId: string) {
    try {
      const foundMatch = await fetch(
        `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
          headers: { 'X-Riot-Token': process.env.API_KEY },
        },
      ).then((res) => res.json());

      const refineMatchDetail = (match) => {
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
            queueId: match.queueId,
          },
          summonerInfo: match.info.participants.map((summoner) => {
            return {
              puuid: summoner.puuid,
              summonerName: summoner.summonerName,
              kills: summoner.kills,
              assist: summoner.assist,
              deaths: summoner.deaths,
              kda: summoner.challenges.kda,
              championName: summoner.championName,
              champLevel: summoner.champLevel,
              item0: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item0}.png`,
              item1: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item1}.png`,
              item2: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item2}.png`,
              item3: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item3}.png`,
              item4: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item4}.png`,
              item5: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item5}.png`,
              item6: `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${summoner.item6}.png`,
              mainPerk: {
                style: summoner.perks.styles[0].stylese,
                perk: summoner.perks.styles[0].selection[0].perk,
              },
              subPerk: summoner.perks.styles[1].style,
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
      };
      return refineMatchDetail(foundMatch);
    } catch (e) {
      console.log(e.message);
      return e;
    }
  }
}
