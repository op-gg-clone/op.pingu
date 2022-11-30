import { ISummonerInfo } from '../interface/ISummonerInfo';
import _SummonerType from '../type/summonerType';

const summonerInfoService = (summonerData: ISummonerInfo) => {
  const summonerType = new _SummonerType(
    summonerData.tier,
    summonerData.rank,
    summonerData.wins,
    summonerData.losses
  );
  const summoner = [];
  summoner.push(summonerType);
  return summoner;
};

export default summonerInfoService;
