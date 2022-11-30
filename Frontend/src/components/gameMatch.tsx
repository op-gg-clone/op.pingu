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
    <div className="bg-[#1C1C1F] h-full sm:bg-slate-300">
      <div className="bg-blue-900 h-36">
        <div className="text-white text-center text-3xl pt-4">OP.PINGU</div>
        <div className="flex bg-white text-center mt-4 mx-3 rounded-xl">
          <div className="bg-blue-200 w-1/6 rounded-l-xl">
            <p className="text-center text-blue-600 mt-3">KR</p>
          </div>
          <input className="h-12 w-3/5 ml-2" placeholder="소환사명"></input>
          <button className="text-blue-700 font-bold text-xl">.PING!</button>
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
    </div>
  );
};

export default GameMatch;
