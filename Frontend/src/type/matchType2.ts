import { matchProps, matchDeatilProps } from './matchInterface';

class _MatchTpye2 implements matchProps {
  gameDuration: number;
  queueId: number;
  participants: matchDeatilProps[];
  personalMatch: matchDeatilProps;

  constructor(
    gameDuration: number,
    queueId: number,
    participants: matchDeatilProps[],
    personalMatch: matchDeatilProps
  ) {
    this.gameDuration = gameDuration;
    this.queueId = queueId;
    this.participants = participants;
    this.personalMatch = personalMatch;
  }

  getGameDurationToString(): string {
    const min: number = Math.round(this.gameDuration / 60);
    const sec: number = this.gameDuration % 60;
    const formatDuration: string = `${min}분 ${sec}초`;
    return formatDuration;
  }

  getCS(): number {
    return (
      this.personalMatch.totalCS.neutralMinionsKilled +
      this.personalMatch.totalCS.totalMinionsKilled
    );
  }

  getAverageCS(): string {
    return (this.getCS() / this.gameDuration).toFixed(1);
  }
}

export default _MatchTpye2;
