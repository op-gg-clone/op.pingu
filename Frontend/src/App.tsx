import GameMatch from './components/gameMatch';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App bg-slate-300 min-h-screen">
      <div className="ml-auto mr-auto max-w-screen-sm">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GameMatch />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
