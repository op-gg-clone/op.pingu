const SummonerSearch = () => {
  return (
    <form className="flex bg-white text-center mt-4 mx-3 rounded-xl">
      <div className="bg-blue-200 w-1/6 rounded-l-xl">
        <p className="text-center text-blue-600 mt-3">KR</p>
      </div>
      <input className="h-12 w-3/5 ml-2" placeholder="소환사명"></input>
      <button className="text-blue-700 font-bold text-xl">.PING!</button>
    </form>
  );
};

export default SummonerSearch;
