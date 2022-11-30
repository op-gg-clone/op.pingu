import { IMatchInfoService } from '../interface/IMatchInfo';
import _MatchType from '../type/matchType';

const matchInfoService = (matchData: IMatchInfoService[], summonerName: string) => {
  const matchList: _MatchType[] = [];
  matchData.forEach((match) => {
    const { matchInfo, summonerInfo } = match;
    const {
      gameCreation,
      gameDuration,
      gameEndTimestamp,
      gameId,
      gameMode,
      gameName,
      gameStartTimestamp,
      gameType,
      gameVersion,
    } = matchInfo;
    const personalMatch = summonerInfo.filter((participant) => {
      return participant.summonerName === summonerName;
    });

    matchList.push(
      new _MatchType(
        gameCreation,
        gameDuration,
        gameEndTimestamp,
        gameId,
        gameMode,
        gameName,
        gameStartTimestamp,
        gameType,
        gameVersion,
        summonerInfo,
        personalMatch[0]
      )
    );
  });

  return matchList;
};

export default matchInfoService;
