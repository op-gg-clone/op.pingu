export interface ISummonerInfo {
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  getOdds(): number;
}

export interface ISummonerInfoProps {
  summonerName: string;
}
