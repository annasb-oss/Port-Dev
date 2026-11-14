import React, { useMemo } from 'react';

export default function AuroraBackground() {
  // Generate 80 crisp stars scattered across the deep night sky
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const top = ((i * 41 + 17) % 98) + '%';
      const left = ((i * 59 + 11) % 99) + '%';
      const isBright = i % 4 === 0;
      const size = isBright ? 2.5 : i % 2 === 0 ? 1.8 : 1.2;
      const baseOpacity = isBright ? 0.9 : 0.6;
      const duration = 2.0 + ((i * 17) % 35) / 10 + 's';
      const delay = ((i * 13) % 25) / 10 + 's';
      return { id: i, top, left, size, baseOpacity, duration, delay, isBright };
    });
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02040b] select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#010309] via-[#020512] to-[#010207]" />
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <span key={star.id} className={`absolute rounded-full ${star.isBright ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-aurora-twinkle-bright' : 'bg-blue-100 animate-aurora-twinkle'}`} style={{top:star.top,left:star.left,width:`${star.size}px`,height:`${star.size}px`,opacity:star.baseOpacity,animationDuration:star.duration,animationDelay:star.delay}} />
        ))}
      </div>
      <div className="aurora-wave aurora-wave-primary" />
      <div className="aurora-wave aurora-wave-secondary" />
      <div className="aurora-wave aurora-wave-violet" />
      <div className="aurora-wave aurora-wave-streamer" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#010308] to-transparent z-10" />
    </div>
  );
}
