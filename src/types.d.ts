import '@react-three/fiber';
import * as React from 'react';

declare module 'meshline' {
  import { BufferGeometry, Material, Raycaster, Intersection } from 'three';
  export class MeshLineGeometry extends BufferGeometry { isMeshLine: boolean; setPoints(points:any,wcb?:any):void; setMatrixWorld(matrixWorld:any):void; }
  export class MeshLineMaterial extends Material { lineWidth:number; map:any; useMap:number; color:any; resolution:any; repeat:any; depthTest:boolean; }
  export function raycast(raycaster:Raycaster,intersects:Intersection[]):void;
}
declare module '@react-three/fiber' { interface ThreeElements { meshLineGeometry:any; meshLineMaterial:any; } }
declare global { namespace JSX { interface IntrinsicElements { meshLineGeometry:any; meshLineMaterial:any; } } }
declare module 'react' { namespace JSX { interface IntrinsicElements { meshLineGeometry:any; meshLineMaterial:any; } } }
declare module 'react/jsx-runtime' { namespace JSX { interface IntrinsicElements { meshLineGeometry:any; meshLineMaterial:any; } } }
