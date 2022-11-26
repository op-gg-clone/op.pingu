import _MatchTpye from '../type/matchType';

type MatchType = {
  data: _MatchTpye;
};

const SimpleMatchInfo = ({ data }: MatchType) => {
  console.log(data);
  const isWin = data.getWin();
  const CS =
    data.personalMatch.totalCS.neutralMinionsKilled + data.personalMatch.totalCS.totalMinionsKilled;
  const argCS = (CS / Number(data.getGameDuration().slice(0, 2))).toFixed(1);

  return (
    <div className={`flex flex-col mt-1 ${isWin ? 'bg-blue-400' : 'bg-red-400'}`}>
      <div className="flex">
        <div className="font-bold text-sm">
          {isWin ? <p className="text-blue-900">승리</p> : <p className="text-red-900">패배</p>}
        </div>
        <div>
          <p>{data.getGameDuration()}</p>
        </div>
        <div>
          <p>게임모드 코드가 뭐지?</p>
        </div>
        <div>
          <button>ㅇ</button>
        </div>
      </div>
      <div className="flex p-4 justify-between">
        <div className="flex">
          <div className="relative h-10 w-10">
            <img
              className="h-full w-full object-cover rounded-full"
              src={data.getImage('championImage')}
              alt="champion"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-gray-800 text-white text-sm text-center rounded-full">
              {data.personalMatch.champLevel}
            </span>
          </div>
          <div className="inline-grid grid-cols-2 gap-1 ml-1">
            <div className="h-5 w-5">
              <img
                className="h-full w-full object-cover rounded-md"
                src={data.getImage('SummonerFlash')}
                alt="champion"
              />
            </div>
            <div className="h-5 w-5">
              <img
                className="h-full w-full object-cover rounded-md"
                src={data.getImage('SummonerFlash')}
                alt="champion"
              />
            </div>
            <div className="h-5 w-5">
              <img
                className="h-full w-full object-cover rounded-md"
                src={data.getImage('SummonerFlash')}
                alt="champion"
              />
            </div>
            <div className="h-5 w-5">
              <img
                className="h-full w-full object-cover rounded-md"
                src={data.getImage('SummonerFlash')}
                alt="champion"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/6">
          <div className="inline-grid grid-cols-5 text-sm font-bold">
            <span className="text-white">{data.personalMatch.kills}</span>
            <span>/</span>
            <span className="text-red-600">{data.personalMatch.deaths}</span>
            <span>/</span>
            <span className="text-white">{data.personalMatch.assists}</span>
          </div>
          <div>
            <p className="text-[0.6rem] text-center">{`${Number(data.personalMatch.kda).toFixed(
              2
            )}:1 평점`}</p>
          </div>
        </div>
        <div className="flex flex-col text-[0.6rem] text-gray-200">
          <div>
            <p>{`${CS} (${argCS}) CS`}</p>
          </div>
          <div>
            <p className="text-red-600">킬관여?</p>
          </div>
          <div>
            <p>{`제어 와드 ${data.personalMatch.wardInfo.visionWardsBoughtInGame}`}</p>
          </div>
        </div>
        <div className="inline-grid grid-cols-4 gap-0">
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
          <div className="h-5 w-5">
            <img
              className="h-full w-full object-cover rounded-md"
              src={data.getImage('itemImage')}
              alt="champion"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMatchInfo;
