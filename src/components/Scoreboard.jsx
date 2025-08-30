import { Sparkles } from 'lucide-react';

export default function Scoreboard({ moves, matches, totalPairs, difficulty, onNewGame, onChangeDifficulty, gameWon }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 border border-orange-200/70">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-amber-200">
          <Sparkles className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm text-slate-600">Moves: <span className="font-semibold text-slate-900">{moves}</span></p>
          <p className="text-sm text-slate-600">Matches: <span className="font-semibold text-slate-900">{matches}/{totalPairs}</span></p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-white rounded-full p-1 border border-amber-200 shadow-sm">
          <button
            onClick={() => onChangeDifficulty('easy')}
            className={`px-3 py-1.5 text-sm rounded-full transition ${difficulty === 'easy' ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white' : 'text-slate-700 hover:bg-amber-50'}`}
          >
            Easy
          </button>
          <button
            onClick={() => onChangeDifficulty('medium')}
            className={`px-3 py-1.5 text-sm rounded-full transition ${difficulty === 'medium' ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white' : 'text-slate-700 hover:bg-amber-50'}`}
          >
            Medium
          </button>
        </div>

        <button
          onClick={onNewGame}
          className="ml-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          New Game
        </button>
      </div>

      {gameWon && (
        <div className="w-full sm:w-auto text-center sm:text-right text-base font-semibold text-pink-600">
          Yay! You matched them all!
        </div>
      )}
    </div>
  );
}
