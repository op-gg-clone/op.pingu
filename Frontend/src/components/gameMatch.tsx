import { useCallback, useEffect, useState } from 'react';
import _MatchTpye2 from '../type/matchType2';
import SummonerInfo from './summonerInfo';
import SimpleMatchInfo from './simpleMatchInfo';

import matchService2 from '../utils/matchService2';
import DetailMatchInfo from './detailMatchInfo';

type SummonerType = {
  summonerName: string;
};

const GameMatch = ({ summonerName }: SummonerType) => {
  const [match, setMatch] = useState<_MatchTpye2[]>([]);

  const [showDetail, setShowDetail] = useState<number[]>([]);

  const matchTypeInit = useCallback(async () => {
    const response = await fetch('/game/match');
    const data = await response.json();
    const matchList = matchService2(data.result, summonerName);
    setMatch(matchList);
  }, [summonerName]);

  useEffect(() => {
    matchTypeInit();
  }, [matchTypeInit]);

  const handleOpneDetail = (idx: number) => () => {
    return true;
  };

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
      <div className="bg-blue-900 h-36 rounded-lg mt-1 mb-1 font-roboto drop-shadow-lg">
        <div className="text-white text-center text-3xl pt-4 font-semibold tracking-widest">
          OP.PINGU
        </div>
        <div className="flex bg-white text-center mt-4 mx-3 rounded-xl">
          <div className="bg-blue-200 w-1/6 rounded-l-xl">
            <p className="text-center text-blue-600 mt-3 font-bold">KR</p>
          </div>
          <input className="h-12 w-3/5 ml-2" placeholder="소환사명"></input>
          <button className="text-blue-600 font-bold text-xl">.PING!</button>
        </div>
      </div>
      <SummonerInfo name={summonerName} rank="1" tier="Gold" />
      {match.map((e, idx) => {
        return (
          <div key={idx} className="matchInfo">
            <SimpleMatchInfo matchInfo={e} detailBtnClickHandler={handleDetailBtn(idx)} />
            {showDetail.includes(idx) && <DetailMatchInfo isDetail={handleOpneDetail} />}
          </div>
        );
      })}
      <div>
        <button className="text-center bg-slate-500 text-white w-full mt-1 rounded-lg p-2 font-noto text-lg drop-shadow-lg">
          전적 더 보기
        </button>
      </div>
    </div>
  );
};

export default GameMatch;
