import _MatchTpye2 from '../type/matchType2';
import itemImage from '../img/1001.png';
import championImage from '../img/Aatrox.png';
import SummonerFlash from '../img/SummonerFlash.png';
interface matchInfo {
  matchInfo: _MatchTpye2;
  detailBtnClickHandler: any;
}
const SpellRune = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="h-5 w-5">
      <img className="h-full w-full object-cover rounded-md" src={imageSrc} alt="champion" />
    </div>
  );
};

const ItemIcon = ({ itemImage }: { itemImage: string }) => {
  return (
    <div className="h-5 w-5 drop-shadow-sm">
      <img className="h-full w-full object-cover rounded-md" src={itemImage} alt="champion" />
    </div>
  );
};

const SimpleMatchInfo = ({ matchInfo, detailBtnClickHandler }: matchInfo) => {
  return (
    <div
      className={`flex flex-col mt-1 rounded-lg p-2 font-noto ${
        matchInfo.personalMatch.win ? 'bg-blue-400' : 'bg-red-400'
      }`}
    >
      <div className="grid grid-flow-col">
        <div className="font-medium text-sm">
          {matchInfo.personalMatch.win ? (
            <p className="text-blue-900">승리</p>
          ) : (
            <p className="text-red-900">패배</p>
          )}
        </div>
        <div className="text-sm text-white">
          <p>{matchInfo.getGameDurationToString()}</p>
        </div>
        <div className="text-sm text-white text-right">
          <p>소환사의 협곡</p>
        </div>
        <div className="text-right mr-2 text-sm font-medium">
          <button onClick={detailBtnClickHandler}>더보기</button>
        </div>
      </div>
      <div className="flex p-4 justify-between">
        <div className="flex">
          <div className="relative h-10 w-10">
            <img
              className="h-full w-full object-cover rounded-full"
              src={championImage}
              alt="champion"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-gray-800 text-white text-sm text-center rounded-full">
              {matchInfo.personalMatch.champLevel}
            </span>
          </div>
          <div className="inline-grid grid-cols-2 gap-1 ml-1">
            {[0, 1, 2, 3].map((v) => (
              <SpellRune key={v} imageSrc={SummonerFlash} />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-1/6">
          <div className="inline-grid grid-cols-5 text-sm font-bold">
            <span className="text-white">{matchInfo.personalMatch.kills}</span>
            <span>/</span>
            <span className="text-red-600">{matchInfo.personalMatch.deaths}</span>
            <span>/</span>
            <span className="text-white">{matchInfo.personalMatch.assists}</span>
          </div>
          <div>
            <p className="text-[0.6rem] text-center">{`${Number(
              matchInfo.personalMatch.kda
            ).toFixed(2)}:1 평점`}</p>
          </div>
        </div>
        <div className="flex flex-col text-[0.6rem] text-gray-200">
          <div>
            <p>{`${matchInfo.getCS()} (${matchInfo.getAverageCS()}) CS`}</p>
          </div>
          <div>
            <p className="text-red-600">킬관여?</p>
          </div>
          <div>
            <p>{`제어 와드 ${matchInfo.personalMatch.wardInfo.visionWardsBoughtInGame}`}</p>
          </div>
        </div>
        <div className="inline-grid grid-cols-4 gap-0.5">
          {[0, 1, 2, 3, 4, 5, 6].map((v) => (
            <ItemIcon key={v} itemImage={itemImage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleMatchInfo;
