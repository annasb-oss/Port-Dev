import React, { useMemo } from 'react';

interface ShootingStar { id:number; top:string; left:string; angle:number; length:number; duration:string; delay:string; }
const SHOOTING_STARS: ShootingStar[] = [
  { id:1, top:'12%', left:'78%', angle:152, length:150, duration:'5.8s', delay:'-0.4s' },
  { id:2, top:'8%', left:'46%', angle:156, length:125, duration:'6.6s', delay:'1.6s' },
  { id:3, top:'26%', left:'92%', angle:148, length:165, duration:'7.2s', delay:'-3.1s' },
  { id:4, top:'18%', left:'62%', angle:154, length:135, duration:'6.2s', delay:'3.4s' },
  { id:5, top:'42%', left:'86%', angle:150, length:140, duration:'7.8s', delay:'5.1s' },
];
export default function HeroStarfield() {
  const stars = useMemo(() => Array.from({length:68}).map((_,i) => {
    const top=`${((i*37+13)%94)+2}%`; const left=`${((i*53+7)%97)+1}%`;
    const isBright=i%5===0; const isBlue=i%3===0;
    const size=isBright?2.4:i%2===0?1.6:1.1; const opacity=isBright?0.85:i%2===0?0.6:0.4;
    const duration=`${2.4+((i*19)%32)/10}s`; const delay=`${((i*11)%28)/10}s`;
    return {id:i,top,left,size,opacity,duration,delay,isBright,isBlue};
  }), []);
  return (
    <div aria-hidden="true" data-testid="hero-starfield" className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {stars.map(star => <span key={star.id} className={`absolute rounded-full ${star.isBright?'bg-white shadow-[0_0_6px_rgba(224,242,254,0.85)] animate-aurora-twinkle-bright':star.isBlue?'bg-sky-200 animate-aurora-twinkle':'bg-slate-100 animate-aurora-twinkle'}`} style={{top:star.top,left:star.left,width:`${star.size}px`,height:`${star.size}px`,opacity:star.opacity,animationDuration:star.duration,animationDelay:star.delay}} />)}
      {SHOOTING_STARS.map(meteor => <div key={meteor.id} className="absolute" style={{top:meteor.top,left:meteor.left,transform:`rotate(${meteor.angle}deg)`}}>
        <div className="hero-shooting-star relative h-[1.5px] rounded-full" style={{width:`${meteor.length}px`,background:'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(125,211,252,0.45) 58%, rgba(255,255,255,0.98) 100%)',animationDuration:meteor.duration,animationDelay:meteor.delay}}>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_8px_2px_rgba(147,197,253,0.9)]" />
        </div>
      </div>)}
    </div>
  );
}
