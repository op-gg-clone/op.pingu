import { useCallback, useEffect, useState } from 'react';
import SummonerInfo from './summonerInfo';
import SimpleMatchInfo from './simpleMatchInfo';
import matchService from '../utils/matchService';

import _MatchTpye from '../type/matchType';

type SummonerType = {
  summonerName: string;
};

const GameMatch = ({ summonerName }: SummonerType) => {
  const [match, setMatch] = useState<_MatchTpye[]>([]);

  const matchTypeInit = useCallback(async () => {
    const response = await fetch('/game/match');
    const data = await response.json();
    const matchList = matchService(data.result, summonerName);
    setMatch(matchList);
  }, [summonerName]);

  useEffect(() => {
    matchTypeInit();
  }, [matchTypeInit]);

  return (
    <div className="bg-[#1C1C1F] h-full sm:bg-red-400">
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
          <div key={idx}>
            <SimpleMatchInfo data={e} />
          </div>
        );
      })}
    </div>
  );
};

export default GameMatch;
