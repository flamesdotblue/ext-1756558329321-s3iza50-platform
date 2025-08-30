import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/0 via-white/10 to-white" />
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 drop-shadow-sm">
            Match the Shapes!
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-slate-700">
            Flip two cards to find a pair. Bright, friendly, and fun for little learners.
          </p>
        </div>
      </div>
    </section>
  );
}
