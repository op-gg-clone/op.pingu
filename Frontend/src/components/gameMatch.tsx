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

const GameMatch = () => {
  const [match, setMatch] = useState<_MatchType[]>([]);
  const [summoner, setSummoner] = useState<_SummonerType[]>([]);
  const [showDetail, setShowDetail] = useState<number[]>([]);
  const [summonerName, setSummonerName] = useState('Cozily');

  const onKeyPress = (e: any) => {
    if (e.target.value !== summonerName) {
      setSummoner(() => []);
      setMatch(() => []);
    }
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
    <div className="h-full bg-slate-300">
      <div className="bg-blue-900 h-36 rounded-lg my-1 font-roboto drop-shadow-lg">
        <div className="text-white text-center text-3xl pt-4 font-semibold tracking-widest">
          OP.PINGU
        </div>
        <SummonerSearch onKeyPress={onKeyPress} />
      </div>
      {summoner.length ? (
        <SummonerInfo
          summonerName={summonerName}
          rank={summoner[0].rank}
          tier={summoner[0].tier}
          wins={summoner[0].wins}
          losses={summoner[0].losses}
          odds={summoner[0].getOdds()}
        />
      ) : (
        <div className="text-white bg-slate-500 w-full h-12 text-center p-2 mt-1 rounded-lg font-noto text-lg">
          로딩중
        </div>
      )}
      {match.length ? (
        match.map((e, idx) => {
          return (
            <div key={idx} className="matchInfo">
              <SimpleMatchInfo matchInfo={e} detailBtnClickHandler={handleDetailBtn(idx)} />
              {showDetail.includes(idx) && <DetailMatchInfo data={e} />}
            </div>
          );
        })
      ) : (
        <div className="text-white bg-slate-500 w-full h-12 text-center p-2 mt-1 rounded-lg font-noto text-lg">
          로딩중
        </div>
      )}
      {match.length ? (
        <div>
          <button className="text-center bg-slate-500 text-white w-full mt-1 rounded-lg p-2 font-noto text-lg drop-shadow-lg">
            전적 더 보기
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default GameMatch;
