import { IMatchInfo, ISummonerInfo } from '../type/IMatchInfo';

class _MatchTpye implements IMatchInfo {
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
  personalMatch: ISummonerInfo;

  constructor(
    gameCreation: number,
    gameDuration: number,
    gameEndTimestamp: number,
    gameId: number,
    gameMode: string,
    gameName: string,
    gameStartTimestamp: number,
    gameType: string,
    gameVersion: string,
    participants: ISummonerInfo[],
    personalMatch: ISummonerInfo
  ) {
    this.gameCreation = gameCreation;
    this.gameDuration = gameDuration;
    this.gameEndTimestamp = gameEndTimestamp;
    this.gameId = gameId;
    this.gameMode = gameMode;
    this.gameName = gameName;
    this.gameStartTimestamp = gameStartTimestamp;
    this.gameType = gameType;
    this.gameVersion = gameVersion;
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
    return this.personalMatch.totalMinionsKilled + this.personalMatch.neutralMinionsKilled;
  }

  getAverageCS(): string {
    return (this.getCS() / this.gameDuration).toFixed(1);
  }
}

export default _MatchTpye;
