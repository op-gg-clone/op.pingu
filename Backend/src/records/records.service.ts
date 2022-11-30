import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { perks } from './records.perkList';

@Injectable()
export class RecordsService {
  constructor(private readonly httpService: HttpService) {}

  // 소환사 아이디로 전적 불러오기
  // 소환사 id => 소환사의 puuid 획득 => puuid로 최근게임 20개의 mathchId 획득 => matchId로 각 게임의 세부정보 획득 반복함
  async getMatchesBySummonerName(summonerName: string, start = 0) {
    try {
      const { puuid } = await this.getSummonerId(summonerName);
      const matchesId = await this.getMatches(puuid, start);
      const matchesDetail = await Promise.all(
        matchesId.map((matchId) => {
          return this.getMatchDetail(matchId);
        }),
      );
      return matchesDetail;
    } catch (e) {
      console.log('error : ', e.message);
      return e;
    }
  }

  //소환사 이름으로 티어정보,승패수 검색
  async getSummonerInfoBySummonerName(summonerName) {
    try {
      const { id } = await this.getSummonerId(summonerName);
      const summonerInfo = await this.getSummonerInfo(id);
      return summonerInfo;
    } catch (e) {
      console.log('error : ', e.message);
      return e;
    }
  }

  //소환사 이름으로 소환사id 불러오기
  async getSummonerId(summonerName: string) {
    try {
      return (
        await firstValueFrom(
          this.httpService.get(
            `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
            {
              headers: { 'X-Riot-Token': process.env.API_KEY },
            },
          ),
        )
      ).data;
    } catch (e) {
      console.log('error : ', e.message);
      return e;
    }
  }

  // 소환사 id로 전적정보 확인하기 (티어)
  async getSummonerInfo(summonerId: string) {
    try {
      const info = await (
        await firstValueFrom(
          this.httpService.get(
            `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
            {
              headers: { 'X-Riot-Token': process.env.API_KEY },
            },
          ),
        )
      ).data[0];
      
      if (!info) {
        return {
          tier: 'UNRANKED',
          rank: '',
          wins: 0,
          losses: 0,
        };
      }
      
      const summonerInfo = {
        tier: info.tier,
        rank: info.rank,
        wins: info.wins,
        losses: info.losses,
      };
      return summonerInfo;
    } catch (e) {
      console.log('error : ', e.message);
      return e;
    }
  }

  //소환사의 puuid로 게임 matchId 불러오기, arg의 start는 몇번째 게임부터 차례대로 불러올지 정해주는 숫자값
  async getMatches(puuid: string, start: number) {
    try {
      return (
        await firstValueFrom(
          this.httpService.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=10`,
            {
              headers: { 'X-Riot-Token': process.env.API_KEY },
            },
          ),
        )
      ).data;
    } catch (e) {
      console.log('error : ', e.message);
      return e;
    }
  }

  //matchId로 한 게임의 정보를 불러오기
  async getMatchDetail(matchId: string) {
    try {
      //matchId로 match 정보 가져오기
      const foundMatch = (
        await firstValueFrom(
          this.httpService.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            {
              headers: { 'X-Riot-Token': process.env.API_KEY },
            },
          ),
        )
      ).data;

      // 스펠 이름-번호 쌍 데이터 가져오기
      const spellData = Object.values(
        (
          await firstValueFrom(
            this.httpService.get(
              `http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/data/en_US/summoner.json`,
            ),
          )
        ).data.data,
      );

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
              championImage: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/champion/${summoner.championName}.png`,
              champLevel: summoner.champLevel,
              item0: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item0}.png`,
              item1: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item1}.png`,
              item2: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item2}.png`,
              item3: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item3}.png`,
              item4: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item4}.png`,
              item5: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item5}.png`,
              item6: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item6}.png`,
              mainPerk: `https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/Electrocute/Electrocute.png`,
              // {
              //   style: summoner.perks.styles[0].style,
              //   perk: summoner.perks.styles[0].selections[0].perk,
              // }
              subPerk: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png`,
              spell1: `http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/spell/SummonerFlash.png`,
              spell2: `http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/spell/SummonerFlash.png`,
              // spell1: spellData.filter((spell) => {
              //   parseInt(spell.key) == summoner.summoner1Id;
              // }).id,
              // spell2: spellData.filter((spell) => {
              //   parseInt(spell.key) == summoner.summoner2Id;
              // }).id,
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
      console.log('error : ', e.message);
      return e;
    }
  }
}
