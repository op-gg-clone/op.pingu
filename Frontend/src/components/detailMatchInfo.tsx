import _MatchType from '../type/matchType';

interface matchInfo {
  data: _MatchType;
}

const DetailMatchInfo = ({ data }: matchInfo): any => {
  const SpellPerk = ({ imageSrc }: { imageSrc: string }) => {
    return (
      <div className="h-5 w-5 bg-black rounded-full">
        <img className="h-full w-full object-cover rounded-md" src={imageSrc} alt="champion" />
      </div>
    );
  };

  const ItemIcon = ({ itemImage }: { itemImage: string }) => {
    if (itemImage.length < 65) {
      return <div className="h-5 w-5 drop-shadow-sm rounded-md opacity-50"></div>;
    }
    return (
      <div className="h-5 w-5 drop-shadow-sm">
        <img className="h-full w-full object-cover rounded-md" src={itemImage} alt="champion" />
      </div>
    );
  };

  return (
    <div className="bg-[#31313C] py-3">
      {data.participants.map((e) => {
        return (
          <div>
            <div className={`flex flex-row   ${e.win ? 'bg-blue-400' : 'bg-red-400'}`}>
              <div className="flex basis-1/4">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={e.championImage}
                    alt="champion"
                  />
                  <span className="absolute bottom-0 left-0 w-5 h-5 bg-gray-800 text-white text-sm text-center rounded-full">
                    {e.champLevel}
                  </span>
                </div>
                <div className="inline-grid grid-cols-2 gap-1 ml-1">
                  <SpellPerk imageSrc={e.spell1} />
                  <SpellPerk imageSrc={e.mainPerk} />
                  <SpellPerk imageSrc={e.spell2} />
                  <SpellPerk imageSrc={e.subPerk} />
                </div>
              </div>
              <div className="flex flex-col ml-4 mt-1 basis-5/12">
                <div className="text-white text-[0.8rem] font-bold">
                  <p>{e.summonerName}</p>
                </div>
                <div className="flex flex-row">
                  <div className="inline-grid grid-cols-5 text-[0.6rem] font-bold">
                    <span className="text-white">{e.kills}</span>
                    <span>/</span>
                    <span className="text-red-600">{e.deaths}</span>
                    <span>/</span>
                    <span className="text-white">{e.assist}</span>
                  </div>
                  <div>
                    <p className="ml-1 text-[0.7rem] text-center">{`${Number(e.kda).toFixed(
                      2
                    )}:1 평점`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  pl-32">
                <div className="flex">
                  <ItemIcon itemImage={e.item0} />
                  <ItemIcon itemImage={e.item1} />
                  <ItemIcon itemImage={e.item2} />
                  <ItemIcon itemImage={e.item3} />
                  <ItemIcon itemImage={e.item4} />
                  <ItemIcon itemImage={e.item5} />
                  <ItemIcon itemImage={e.item6} />
                </div>
                <div className="flex text-[0.8rem]">
                  <span className="mr-2 text-white">딜량:</span>
                  <p className="text-red-500 bg-black rounded-md">
                    {e.totalDamageDealtToChampions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailMatchInfo;
