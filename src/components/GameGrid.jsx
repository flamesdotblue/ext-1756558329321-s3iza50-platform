import MemoryCard from './MemoryCard';

export default function GameGrid({ deck, onCardClick }) {
  const count = deck.length;
  const gridCols = count === 8 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-6';

  return (
    <div className="mt-5 sm:mt-6">
      <div className={`grid ${gridCols} gap-3 sm:gap-4 place-items-center`}>
        {deck.map(card => (
          <MemoryCard key={card.id} card={card} onClick={() => onCardClick(card.id)} />
        ))}
      </div>
    </div>
  );
}
