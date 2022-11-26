class _MatchTpye {
  summonerName: string;
  gameDuration: string;
  queueId: number;
  win: boolean;
  personalMatch: any;
  participants: any;
  images: any;

  constructor(
    summonerName: string,
    gameDuration: string,
    queueId: number,
    win: boolean,
    summonerMatch: any,
    participants: any,
    images: any
  ) {
    this.summonerName = summonerName;
    this.gameDuration = gameDuration;
    this.queueId = queueId;
    this.win = win;
    this.personalMatch = summonerMatch;
    this.participants = participants;
    this.images = images;
  }

  getSummonerName() {
    return this.summonerName;
  }
  getGameDuration() {
    return this.gameDuration;
  }
  getQueueId() {
    return this.queueId;
  }
  getWin() {
    return this.win;
  }
  getSummonerMatch() {
    return this.personalMatch;
  }
  getParticipants() {
    return this.participants;
  }
  getImage(key: string) {
    return this.images[key];
  }
}
export default _MatchTpye;
