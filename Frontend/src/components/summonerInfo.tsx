import { getRankEmblem } from '../utils/rankLoader';
import summonerImage from '../img/5629.png';
interface Summoner {
  summonerName: string;
  rank: string;
  tier: string;
  wins: number;
  losses: number;
  odds: number;
}
interface IRankType {
  type: string;
  rank: string;
  tier: string;
  wins: number;
  losses: number;
  odds: number;
}
const RankType = ({ type, tier, rank, wins, losses, odds }: IRankType) => {
  return (
    <div className="flex flex-col text-center basis-1/2">
      <div className="text-slate-400 text-sm">{type}</div>
      <div className="mx-auto mt-3 w-1/3 p-1 bg-[#18181d] rounded-full">
        <img className="h-full w-full object-cover" src={getRankEmblem(tier)} alt="emblem" />
      </div>
      <div className="text-white text-sm">
        {tier} {rank}
      </div>
      <div className="mt-1 text-slate-400 text-sm">
        {wins}승 {losses}패 {odds}%
      </div>
    </div>
  );
};

const SummonerInfo = ({ summonerName, rank, tier, wins, losses, odds }: Summoner) => {
  return (
    <div className="p-2 bg-[#31313C] font-noto rounded-lg drop-shadow-lg">
      <div className="flex">
        <div className="h-20 w-20">
          <img className="h-full w-full object-cover rounded-lg" src={summonerImage} alt="emblem" />
        </div>
        <div className="ml-2 flex items-center">
          <p className="text-white text-lg font-semibold">{summonerName}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">전적 갱신</button>
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">핑구</button>
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">지지</button>
      </div>
      <div className="flex mt-5 justify-around">
        <RankType
          type={'솔로랭크'}
          rank={rank}
          tier={tier}
          wins={wins}
          losses={losses}
          odds={odds}
        />
        <div className="text-center text-slate-400 border-solid border border-black"></div>
        <RankType
          type={'자유랭크'}
          rank={rank}
          tier={tier}
          wins={wins}
          losses={losses}
          odds={odds}
        />
      </div>
    </div>
  );
};

export default SummonerInfo;
