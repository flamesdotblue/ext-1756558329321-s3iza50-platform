import { useEffect, useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import Scoreboard from './components/Scoreboard';
import GameGrid from './components/GameGrid';

const ALL_SHAPES = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#B980F0', '#FF8BA7'];

function createDeck(pairCount = 4) {
  const shapes = ALL_SHAPES.slice(0, pairCount);
  const picked = shapes.map((s, i) => ({ type: s, color: COLORS[i % COLORS.length] }));
  const pairs = picked.flatMap((p, idx) => [
    { id: `${idx}-a`, ...p },
    { id: `${idx}-b`, ...p },
  ]);
  // Shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map(c => ({ ...c, isFlipped: false, isMatched: false }));
}

export default function App() {
  const [difficulty, setDifficulty] = useState('easy'); // easy: 4 pairs, medium: 6 pairs
  const pairCount = difficulty === 'easy' ? 4 : 6;
  const [deck, setDeck] = useState(() => createDeck(pairCount));
  const [flipped, setFlipped] = useState([]); // store ids of currently flipped (max 2)
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const totalPairs = useMemo(() => pairCount, [pairCount]);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = flipped;
      const first = deck.find(c => c.id === firstId);
      const second = deck.find(c => c.id === secondId);
      setMoves(m => m + 1);

      if (first && second && first.type === second.type) {
        // match
        setTimeout(() => {
          setDeck(d => d.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true } : c));
          setMatches(m => m + 1);
          setFlipped([]);
          setIsChecking(false);
        }, 500);
      } else {
        // not a match
        setTimeout(() => {
          setDeck(d => d.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c));
          setFlipped([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [flipped, deck]);

  const onCardClick = (id) => {
    if (isChecking) return;
    const card = deck.find(c => c.id === id);
    if (!card || card.isMatched || card.isFlipped) return;
    if (flipped.length >= 2) return;
    setDeck(d => d.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    setFlipped(f => [...f, id]);
  };

  const newGame = (newDifficulty = difficulty) => {
    const pairs = newDifficulty === 'easy' ? 4 : 6;
    setDifficulty(newDifficulty);
    setDeck(createDeck(pairs));
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
  };

  const gameWon = matches === totalPairs && totalPairs > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-100 text-slate-800">
      <HeroSection />

      <main className="max-w-5xl mx-auto px-4 pb-20 -mt-10">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 sm:p-6 border border-white/60">
          <Scoreboard
            moves={moves}
            matches={matches}
            totalPairs={totalPairs}
            difficulty={difficulty}
            onNewGame={() => newGame(difficulty)}
            onChangeDifficulty={(d) => newGame(d)}
            gameWon={gameWon}
          />

          <GameGrid deck={deck} onCardClick={onCardClick} />

          {gameWon && (
            <div className="mt-6 text-center">
              <button
                onClick={() => newGame(difficulty)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 text-lg font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-transform"
              >
                Play again
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
