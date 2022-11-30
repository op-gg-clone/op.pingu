import GameMatch from './components/gameMatch';
function App() {
  const name: string = 'Cozily';
  return (
    <div className="App bg-slate-200">
      <div className="container ml-auto mr-auto max-w-screen-sm">
        <GameMatch summonerName={name} />;
      </div>
    </div>
  );
}

export default App;
