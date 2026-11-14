export interface Pellet {
  id: number;
  x: number;
  color: string;
  glowColor: string;
  eaten: boolean;
  fadeIn: number;
}
export interface PacmanEntity {
  x: number; dir: 1 | -1; speed: number; dodgeHopY: number;
  invulnerableTimer: number; mouthOpen: number; targetX: number | null;
}
export interface GhostEntity {
  id: 'blue' | 'pink'; x: number; dir: 1 | -1; baseSpeed: number;
  speedFactor: number; turnCooldown: number; bobY: number; phase: number;
}
export interface GameState {
  elapsed: number; pellets: Pellet[]; pacman: PacmanEntity;
  ghosts: [GhostEntity, GhostEntity]; roundResetTimer: number;
}
export const GAME_MIN_X = 0.035;
export const GAME_MAX_X = 0.965;
export const PACMAN_PELLET_COLOR = { color: '#FFE033', glow: 'rgba(255, 224, 51, 0.85)' };
export function createPellets(count = 24, startFade = 1): Pellet[] {
  const pellets: Pellet[] = [];
  const startX = 0.05, endX = 0.95;
  const step = count > 1 ? (endX - startX) / (count - 1) : 0;
  for (let i = 0; i < count; i++) pellets.push({ id:i, x:startX+i*step, color:PACMAN_PELLET_COLOR.color, glowColor:PACMAN_PELLET_COLOR.glow, eaten:false, fadeIn:startFade });
  return pellets;
}
export function createInitialGameState(pelletCount = 24): GameState {
  return {
    elapsed:0, pellets:createPellets(pelletCount,1),
    pacman:{x:0.14,dir:1,speed:0.088,dodgeHopY:0,invulnerableTimer:0,mouthOpen:0.5,targetX:null},
    ghosts:[
      {id:'pink',x:0.48,dir:1,baseSpeed:0.068,speedFactor:1,turnCooldown:3.4,bobY:0,phase:0.6},
      {id:'blue',x:0.78,dir:-1,baseSpeed:0.063,speedFactor:1,turnCooldown:4.1,bobY:0,phase:2.3}
    ], roundResetTimer:0
  };
}
export function findNearestUneatenPellet(fromX:number,pellets:Pellet[]):Pellet|null {
  let best:Pellet|null=null,bestDist=Infinity;
  for(const p of pellets){if(p.eaten)continue;const d=Math.abs(p.x-fromX);if(d<bestDist){bestDist=d;best=p;}}
  return best;
}
export function stepGameState(state:GameState,rawDt:number):void {
  const dt=Math.max(0,Math.min(rawDt,0.05)); if(dt===0)return;
  state.elapsed+=dt;
  for(const pellet of state.pellets)if(!pellet.eaten&&pellet.fadeIn<1)pellet.fadeIn=Math.min(1,pellet.fadeIn+dt*2.5);
  for(let i=0;i<state.ghosts.length;i++){
    const ghost=state.ghosts[i]; ghost.turnCooldown-=dt;
    ghost.speedFactor=1+0.18*Math.sin(state.elapsed*1.1+ghost.phase);
    if(ghost.turnCooldown<=0){if(ghost.x>GAME_MIN_X+0.12&&ghost.x<GAME_MAX_X-0.12)ghost.dir=ghost.dir===1?-1:1;ghost.turnCooldown=2.8+((i*1.7+Math.abs(Math.sin(state.elapsed)))%2.4);}
    ghost.x+=ghost.dir*ghost.baseSpeed*ghost.speedFactor*dt;
    if(ghost.x>=GAME_MAX_X){ghost.x=GAME_MAX_X;ghost.dir=-1;}else if(ghost.x<=GAME_MIN_X){ghost.x=GAME_MIN_X;ghost.dir=1;}
    ghost.bobY=Math.sin(state.elapsed*5.2+ghost.phase)*1.5;
  }
  const pac=state.pacman;
  if(pac.invulnerableTimer>0)pac.invulnerableTimer=Math.max(0,pac.invulnerableTimer-dt);
  const dangerDistance=0.09,closeHopDistance=0.048;
  let nearestGhost:GhostEntity|null=null,nearestGhostDist=Infinity;
  for(const ghost of state.ghosts){const dist=Math.abs(ghost.x-pac.x);if(dist<nearestGhostDist){nearestGhostDist=dist;nearestGhost=ghost;}}
  let speedMultiplier=1,dodging=false;
  if(nearestGhost&&nearestGhostDist<dangerDistance){
    const ghostIsAhead=(nearestGhost.x-pac.x)*pac.dir>-0.01&&Math.abs(nearestGhost.x-pac.x)>0.004;
    if(ghostIsAhead&&pac.invulnerableTimer<=0){
      const otherGhost=state.ghosts.find(g=>g.id!==nearestGhost!.id);
      const reverseDir:1|-1=pac.dir===1?-1:1;
      const otherBlocksReverse=otherGhost&&(otherGhost.x-pac.x)*reverseDir>0&&Math.abs(otherGhost.x-pac.x)<dangerDistance;
      if(!otherBlocksReverse){pac.dir=reverseDir;pac.targetX=null;dodging=true;speedMultiplier=1.25;}
      else{dodging=true;speedMultiplier=1.3;}
    }
  }
  const shouldHop=nearestGhost!==null&&nearestGhostDist<closeHopDistance;
  pac.dodgeHopY+=((shouldHop?-5.5:0)-pac.dodgeHopY)*Math.min(1,dt*14);
  if(!dodging){
    if(pac.targetX!==null){const diff=pac.targetX-pac.x;if(Math.abs(diff)<0.015)pac.targetX=null;else{pac.dir=diff>0?1:-1;speedMultiplier=1.15;}}
    else{const targetPellet=findNearestUneatenPellet(pac.x,state.pellets);if(targetPellet){const diff=targetPellet.x-pac.x;if(Math.abs(diff)>0.008)pac.dir=diff>0?1:-1;}}
  }
  pac.x+=pac.dir*pac.speed*speedMultiplier*dt;
  if(pac.x>=GAME_MAX_X){pac.x=GAME_MAX_X;pac.dir=-1;pac.targetX=null;}else if(pac.x<=GAME_MIN_X){pac.x=GAME_MIN_X;pac.dir=1;pac.targetX=null;}
  pac.mouthOpen=0.5+0.5*Math.sin(state.elapsed*Math.PI*2*5.4);
  if(pac.invulnerableTimer<=0&&Math.abs(pac.dodgeHopY)<3.0)for(const ghost of state.ghosts){if(Math.abs(ghost.x-pac.x)<0.022){pac.invulnerableTimer=1.2;pac.dir=pac.x>=ghost.x?1:-1;pac.targetX=null;break;}}
  for(const pellet of state.pellets)if(!pellet.eaten&&Math.abs(pellet.x-pac.x)<0.024){pellet.eaten=true;pellet.fadeIn=0;}
  if(!state.pellets.some(p=>!p.eaten)){if(state.roundResetTimer<=0)state.roundResetTimer=0.85;else{state.roundResetTimer-=dt;if(state.roundResetTimer<=0){state.roundResetTimer=0;state.pellets=createPellets(state.pellets.length,0);}}}
}
