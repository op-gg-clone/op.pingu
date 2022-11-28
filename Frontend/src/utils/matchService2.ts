import { matchProps } from '../type/matchInterface';
import _MatchTpye2 from '../type/matchType2';

const matchService2 = (matchData: matchProps[], summonerName: string) => {
  const matchList: _MatchTpye2[] = [];
  matchData.forEach((match) => {
    const myMatch = match.participants.filter((participant) => {
      return participant.summonerName === summonerName;
    });

    matchList.push(
      new _MatchTpye2(match.gameDuration, match.queueId, match.participants, myMatch[0])
    );
  });

  return matchList;
};

export default matchService2;
