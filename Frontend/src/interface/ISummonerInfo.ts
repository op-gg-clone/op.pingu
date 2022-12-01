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

export interface Summoner {
  summonerName: string;
  rank: string;
  tier: string;
  wins: number;
  losses: number;
  odds: number;
}
