// interface IMatchDetailInfo {
//   gameCreation: number;
//   gameDuration: number;
//   gameEndTimestamp: number;
//   gameId: number;
//   gameMode: string;
//   gameName: string;
//   gameStartTimestamp: number;
//   gameType: string;
//   gameVersion: string;
// }

export interface ISummonerInfo {
  puuid: string;
  summonerName: string;
  kills: number;
  deaths: number;
  assist: number;
  kda: number;
  championName: string;
  championImage: string;
  champLevel: number;
  item0: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
  mainPerk: string;
  subPerk: string;
  spell1: string;
  spell2: string;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

export interface IMatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  participants: ISummonerInfo[];
  personalMatch?: ISummonerInfo;

  getGameDurationToString(): string;
  getCS(): number;
  getAverageCS(): string;
}
