interface csProps {
  neutralMinionsKilled: number;
  totalMinionsKilled: number;
}

interface wardProps {
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
}

export interface matchDeatilProps {
  assists: number;
  champLevel: number;
  championId: number;
  championName: string;
  deaths: number;
  items: Array<number>;
  kda: number;
  kills: number;
  runeInfo: object;
  summonerName: string;
  summonerSpell1Id: number;
  summonerSpell2Id: number;
  totalCS: csProps;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  wardInfo: wardProps;
  win: boolean;
}

export interface matchProps {
  gameDuration: number;
  queueId: number;
  participants: matchDeatilProps[];
  personalMatch?: matchDeatilProps;
}
