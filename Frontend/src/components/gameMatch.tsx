import { useCallback, useEffect, useState } from 'react';
import { getMatchBySummonerName, getSummonerInfoBySummonerName } from '../utils/apiService';
import matchInfoService from '../utils/matchInfoService';
import _MatchType from '../type/matchType';
import _SummonerType from '../type/summonerType';
import SummonerInfo from './summonerInfo';
import SimpleMatchInfo from './simpleMatchInfo';
import DetailMatchInfo from './detailMatchInfo';
import summonerInfoService from '../utils/summonerInfoService';
import SummonerSearch from './summonerInput';

interface SummonerType {
  summonerBaseName: string;
}

const GameMatch = ({ summonerBaseName }: SummonerType) => {
  const [match, setMatch] = useState<_MatchType[]>([]);
  const [summoner, setSummoner] = useState<_SummonerType[]>([]);
  const [showDetail, setShowDetail] = useState<number[]>([]);
  const [summonerName, setSummonerName] = useState(summonerBaseName);

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      setSummonerName(e.target.value);
    }
  };

  const matchInfoInit = useCallback(async () => {
    const matchList = await getMatchBySummonerName(summonerName);
    const matchInit = matchInfoService(matchList, summonerName);
    setMatch(matchInit);
  }, [summonerName]);

  const summonerInfoInit = useCallback(async () => {
    const response = await getSummonerInfoBySummonerName(summonerName);
    const summonerInit = summonerInfoService(response);
    setSummoner(summonerInit);
  }, [summonerName]);

  useEffect(() => {
    matchInfoInit();
    summonerInfoInit();
  }, [matchInfoInit, summonerInfoInit]);

  const handleDetailBtn = (idx: number) => () => {
    setShowDetail((prev) => {
      const newList = [...prev];
      if (newList.includes(idx)) {
        const list = newList.filter((e) => e !== idx);
        return list;
      }
      newList.push(idx);
      return newList;
    });
  };

  return (
    <div className="bg-[#1C1C1F] h-full sm:bg-red-400">
      <div className="bg-blue-900 h-36">
        <div className="text-white text-center text-3xl pt-4">OP.PINGU</div>
        <SummonerSearch onKeyPress={onKeyPress} />
      </div>
      {summoner.length && (
        <SummonerInfo
          summonerName={summonerName}
          rank={summoner[0].rank}
          tier={summoner[0].tier}
          wins={summoner[0].wins}
          losses={summoner[0].losses}
          odds={summoner[0].getOdds()}
        />
      )}
      {match.length ? (
        match.map((e, idx) => {
          return (
            <div key={idx} className="matchInfo">
              <SimpleMatchInfo matchInfo={e} detailBtnClickHandler={handleDetailBtn(idx)} />
              {showDetail.includes(idx) && <DetailMatchInfo />}
            </div>
          );
        })
      ) : (
        <div className="text-white">로딩중</div>
      )}
    </div>
  );
};

export default GameMatch;
