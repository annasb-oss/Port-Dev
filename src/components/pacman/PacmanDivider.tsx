import React, { useEffect, useMemo, useRef } from 'react';
import { createInitialGameState, createPellets, stepGameState } from './pacman-game';
const SPRITE_SIZE=28, PELLET_COUNT=24;
export default function PacmanDivider(){
  const containerRef=useRef<HTMLDivElement>(null),widthRef=useRef(1440),gameStateRef=useRef(createInitialGameState(PELLET_COUNT));
  const pacmanElRef=useRef<HTMLDivElement|null>(null),pacmanPathRef=useRef<SVGPathElement|null>(null),pinkGhostElRef=useRef<HTMLDivElement|null>(null),blueGhostElRef=useRef<HTMLDivElement|null>(null),pelletRefs=useRef<(HTMLDivElement|null)[]>([]);
  const initialPellets=useMemo(()=>createPellets(PELLET_COUNT,1),[]);
  useEffect(()=>{
    const container=containerRef.current;if(!container)return;
    widthRef.current=container.clientWidth||window.innerWidth||1440;
    const resizeObserver=new ResizeObserver(entries=>{for(const entry of entries)widthRef.current=entry.contentRect.width;});resizeObserver.observe(container);
    const prefersReducedMotion=typeof window!=='undefined'&&window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let isInViewport=true,isTabVisible=typeof document!=='undefined'?!document.hidden:true,rafId=0,lastTime=performance.now();
    const renderStateToDOM=()=>{
      const state=gameStateRef.current,trackWidth=Math.max(320,widthRef.current),pacEl=pacmanElRef.current;
      if(pacEl){const px=state.pacman.x*trackWidth-SPRITE_SIZE/2;pacEl.style.transform=`translate3d(${px.toFixed(2)}px, ${state.pacman.dodgeHopY.toFixed(2)}px, 0) scaleX(${state.pacman.dir})`;pacEl.style.opacity=state.pacman.invulnerableTimer>0?(Math.sin(state.elapsed*28)>0?1:0.35).toFixed(2):'1';}
      if(pacmanPathRef.current){const angleDeg=4+state.pacman.mouthOpen*38,rad=angleDeg*Math.PI/180,cx=8,cy=8,r=7.4,x1=cx+r*Math.cos(-rad),y1=cy+r*Math.sin(-rad),x2=cx+r*Math.cos(rad),y2=cy+r*Math.sin(rad);pacmanPathRef.current.setAttribute('d',`M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 1 0 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`);}
      for(const ghost of state.ghosts){const el=ghost.id==='pink'?pinkGhostElRef.current:blueGhostElRef.current;if(!el)continue;const px=ghost.x*trackWidth-SPRITE_SIZE/2;el.style.transform=`translate3d(${px.toFixed(2)}px, ${ghost.bobY.toFixed(2)}px, 0) scaleX(${ghost.dir})`;}
      state.pellets.forEach((pellet,idx)=>{const el=pelletRefs.current[idx];if(!el)return;const px=pellet.x*trackWidth-4,pulse=0.8+0.2*Math.sin(state.elapsed*3.2+idx*0.65),opacity=pellet.eaten?0:pellet.fadeIn*pulse,scale=pellet.eaten?0.3:0.85+0.15*pellet.fadeIn;el.style.transform=`translate3d(${px.toFixed(2)}px, 0px, 0) scale(${scale.toFixed(3)})`;el.style.opacity=opacity.toFixed(3);});
    };
    const stopLoop=()=>{if(rafId){cancelAnimationFrame(rafId);rafId=0;}};
    const tick=(now:number)=>{if(!isInViewport||!isTabVisible||prefersReducedMotion){rafId=0;return;}const dt=(now-lastTime)/1000;lastTime=now;stepGameState(gameStateRef.current,dt);renderStateToDOM();rafId=requestAnimationFrame(tick);};
    const startLoop=()=>{if(prefersReducedMotion||!isInViewport||!isTabVisible||rafId)return;lastTime=performance.now();rafId=requestAnimationFrame(tick);};
    const intersectionObserver=new IntersectionObserver(entries=>{const entry=entries[0];if(!entry)return;isInViewport=entry.isIntersecting;if(isInViewport)startLoop();else stopLoop();},{threshold:0.01});intersectionObserver.observe(container);
    const handleVisibilityChange=()=>{isTabVisible=!document.hidden;if(isTabVisible)startLoop();else stopLoop();};
    document.addEventListener('visibilitychange',handleVisibilityChange);renderStateToDOM();startLoop();
    return()=>{stopLoop();intersectionObserver.disconnect();resizeObserver.disconnect();document.removeEventListener('visibilitychange',handleVisibilityChange);};
  },[]);
  const handleTrackClick=(e:React.PointerEvent<HTMLDivElement>)=>{const rect=e.currentTarget.getBoundingClientRect();if(!rect.width)return;gameStateRef.current.pacman.targetX=Math.max(0.04,Math.min(0.96,(e.clientX-rect.left)/rect.width));};
  return <div ref={containerRef} aria-hidden="true" data-testid="pacman-divider" className="pointer-events-none select-none relative z-20 w-full h-12 -mt-6 -mb-6 overflow-hidden">
    <div data-testid="pacman-brown-stripe" onPointerDown={handleTrackClick} className="pointer-events-auto cursor-pointer absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 bg-black"/>
    {initialPellets.map((pellet,idx)=><div key={pellet.id} ref={el=>{pelletRefs.current[idx]=el;}} data-testid="pacman-pellet" className="pointer-events-none absolute top-1/2 left-0 -mt-[4px] rounded-full will-change-transform" style={{width:8,height:8,backgroundColor:'#FFFFFF',boxShadow:'0 0 6px 1px rgba(255, 255, 255, 0.55)'}}/>)}
    <div ref={blueGhostElRef} data-testid="pacman-char-blue" className="pointer-events-none absolute top-1/2 left-0 -mt-[14px] w-7 h-7 will-change-transform"><svg viewBox="0 0 14 14" shapeRendering="crispEdges" className="w-full h-full drop-shadow-[0_0_6px_rgba(0,95,255,0.6)]"><path fill="#0038FF" d="M5 0h4v1h2v1h1v1h1v3h1v7h-2v-1h-1v1h-2v-1H8v1H6v-1H5v1H3v-1H2v1H0V6h1V3h1V2h1V1h2V0z"/><path fill="#FFFFFF" d="M4 3h2v1h1v3H6v1H4V7H3V4h1V3zm6 0h2v1h1v3h-1v1h-2V7H9V4h1V3z"/><rect x="5" y="5" width="2" height="2" fill="#000099"/><rect x="11" y="5" width="2" height="2" fill="#000099"/></svg></div>
    <div ref={pinkGhostElRef} data-testid="pacman-char-pink" className="pointer-events-none absolute top-1/2 left-0 -mt-[14px] w-7 h-7 will-change-transform"><svg viewBox="0 0 14 14" shapeRendering="crispEdges" className="w-full h-full drop-shadow-[0_0_6px_rgba(255,0,110,0.55)]"><path fill="#FF006E" d="M5 0h4v1h2v1h1v1h1v3h1v7h-2v-1h-1v1h-2v-1H8v1H6v-1H5v1H3v-1H2v1H0V6h1V3h1V2h1V1h2V0z"/><path fill="#FFFFFF" d="M4 3h2v1h1v3H6v1H4V7H3V4h1V3zm6 0h2v1h1v3h-1v1h-2V7H9V4h1V3z"/><rect x="5" y="5" width="2" height="2" fill="#0044EE"/><rect x="11" y="5" width="2" height="2" fill="#0044EE"/></svg></div>
    <div ref={pacmanElRef} data-testid="pacman-char-yellow" className="pointer-events-none absolute top-1/2 left-0 -mt-[14px] w-7 h-7 will-change-transform"><svg viewBox="0 0 16 16" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,204,0,0.6)]"><path ref={pacmanPathRef} fill="#FFCC00" d="M 8 8 L 13.8 3.2 A 7.4 7.4 0 1 0 13.8 12.8 Z"/><circle cx="9" cy="4.2" r="1.15" fill="#000000"/></svg></div>
  </div>;
}
