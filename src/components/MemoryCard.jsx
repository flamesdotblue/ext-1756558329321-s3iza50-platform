import { motion } from 'framer-motion';

function Shape({ type, color }) {
  const stroke = '#ffffff';
  const strokeWidth = 6;
  const size = 100;

  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="circle">
        <circle cx="60" cy="60" r="42" fill={color} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
  if (type === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="square">
        <rect x="24" y="24" width="72" height="72" rx="12" fill={color} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="triangle">
        <polygon points="60,22 98,98 22,98" fill={color} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="star">
        <polygon
          points="60,18 71,46 101,46 76,64 85,93 60,76 35,93 44,64 19,46 49,46"
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'heart') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="heart">
        <path
          d="M60 98s-34-20-34-44c0-12 9-20 20-20 8 0 14 4 14 10 0-6 6-10 14-10 11 0 20 8 20 20 0 24-34 44-34 44z"
          fill={color}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (type === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" aria-label="diamond">
        <polygon points="60,16 100,60 60,104 20,60" fill={color} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

export default function MemoryCard({ card, onClick }) {
  const { isFlipped, isMatched, type, color } = card;
  const shown = isFlipped || isMatched;

  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className="relative w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-3xl focus:outline-none focus:ring-4 focus:ring-pink-300/50"
      aria-label={shown ? `${type} card` : 'hidden card'}
    >
      <motion.div
        className={`w-full h-full rounded-3xl shadow-md border ${shown ? 'bg-white/90 border-white' : 'bg-gradient-to-br from-orange-300 to-pink-400 border-pink-200'} flex items-center justify-center`}
        initial={false}
        animate={{ rotateY: shown ? 0 : 180, scale: isMatched ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {shown ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Shape type={type} color={color} />
          </motion.div>
        ) : (
          <div className="w-full h-full rounded-3xl grid grid-cols-3 gap-1.5 p-2">
            <div className="bg-white/40 rounded-xl" />
            <div className="bg-white/70 rounded-xl" />
            <div className="bg-white/40 rounded-xl" />
            <div className="bg-white/70 rounded-xl" />
            <div className="bg-white/40 rounded-xl" />
            <div className="bg-white/70 rounded-xl" />
            <div className="bg-white/40 rounded-xl" />
            <div className="bg-white/70 rounded-xl" />
            <div className="bg-white/40 rounded-xl" />
          </div>
        )}

        {isMatched && (
          <div className="absolute -top-2 -right-2 text-2xl select-none">✨</div>
        )}
      </motion.div>
    </button>
  );
}
