import GameMatch from './components/gameMatch';
function App() {
  const name: string = 'Cozily';
  return (
    <div className="App bg-slate-300 min-h-screen">
      <div className="ml-auto mr-auto max-w-screen-sm">
        <GameMatch summonerName={name} />
      </div>
    </div>
  );
}

export default App;
