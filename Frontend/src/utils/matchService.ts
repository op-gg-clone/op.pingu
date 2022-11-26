import _MatchTpye from '../type/matchType';
import itemImage from '../img/1001.png';
import summonerImage from '../img/5629.png';
import championImage from '../img/Aatrox.png';
import SummonerFlash from '../img/SummonerFlash.png';

type ImageType = {
  [key: string]: string;
  itemImage: string;
  summonerImage: string;
  championImage: string;
  SummonerFlash: string;
};

const tempObj: ImageType = {
  itemImage: itemImage,
  summonerImage: summonerImage,
  championImage: championImage,
  SummonerFlash: SummonerFlash,
};

const matchService = (matchData: any, summonerName: string): _MatchTpye[] => {
  const matchList: _MatchTpye[] = [];
  matchData.forEach((match: any) => {
    const min: number = Math.round(Number(match['gameDuration']) / 60);
    const sec: number = Number(match['gameDuration']) % 60;
    const formatDuration: string = `${min}분 ${sec}초`;

    const searchSummonerInfo = match['participants'].filter((e: any) => {
      return e.summonerName === summonerName;
    });

    const matchType = new _MatchTpye(
      summonerName,
      formatDuration,
      match['queueId'],
      searchSummonerInfo[0]['win'],
      searchSummonerInfo[0],
      match,
      tempObj
    );
    matchList.push(matchType);
  });
  return matchList;
  // const min: number = Math.round(Number(matchData['gameDuration']) / 60);
  // const sec: number = Number(matchData['gameDuration']) % 60;
  // const formatDuration: string = `${min}분 ${sec}초`;

  // const searchSummonerInfo = matchData['participants'].filter((e: any) => {
  //   return e.summonerName === summonerName;
  // });

  // const matchType = new _MatchTpye(
  //   summonerName,
  //   formatDuration,
  //   matchData['queueId'],
  //   searchSummonerInfo[0]['win'],
  //   searchSummonerInfo[0],
  //   matchData
  // );

  // return matchType;
};

export default matchService;
