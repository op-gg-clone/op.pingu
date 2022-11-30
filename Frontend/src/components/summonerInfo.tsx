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

const SummonerInfo = ({ summonerName, rank, tier, wins, losses, odds }: Summoner) => {
  return (
    <div className="p-2 bg-[#31313C]">
      <div className="flex">
        <div className="h-1/5 w-1/5">
          <img className="h-full w-full object-cover" src={summonerImage} alt="emblem" />
        </div>
        <div className="ml-2">
          <p className="text-white text-lg">{summonerName}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">전적 갱신</button>
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">핑구</button>
        <button className=" text-white text-sm bg-blue-500 rounded-md h-10">지지</button>
      </div>
      <div className="flex mt-5 justify-around">
        <div className="flex flex-col text-center basis-1/2">
          <div className="text-slate-400 text-sm">솔로랭크</div>
          <div className="mx-auto mt-3 w-1/3 p-1 bg-[#18181d] rounded-full">
            <img className="h-full w-full object-cover" src={getRankEmblem(tier)} alt="emblem" />
          </div>
          <div className="text-white text-sm">
            {tier} {rank}
          </div>
          <div className="mt-3 text-slate-400 text-sm">
            {wins}승 {losses}패 {odds}%
          </div>
        </div>
        <div className="text-center text-slate-400 border-solid border border-black"></div>
        <div className="flex flex-col text-center basis-1/2">
          <div className="text-slate-400 text-sm">자유랭크</div>
          <div className="mx-auto mt-3 w-1/3 p-1 bg-[#18181d] rounded-full">
            <img className="h-full w-full object-cover" src={getRankEmblem(tier)} alt="emblem" />
          </div>
          <div className="text-white text-sm">
            {tier} {rank}
          </div>
          <div className="mt-3 text-slate-400 text-sm">
            {wins}승 {losses}패 {odds}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerInfo;
