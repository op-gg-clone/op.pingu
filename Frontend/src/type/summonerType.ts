import { ISummonerInfo } from '../interface/ISummonerInfo';

class _SummonerType implements ISummonerInfo {
  tier: string;
  rank: string;
  wins: number;
  losses: number;

  constructor(tier: string, rank: string, wins: number, losses: number) {
    this.tier = tier;
    this.rank = rank;
    this.wins = wins;
    this.losses = losses;
  }

  getOdds() {
    const odds = Math.floor((this.wins / (this.wins + this.losses)) * 100);
    return odds;
  }
}

export default _SummonerType;
