export type GhostGaze = 'left' | 'center' | 'right';

export type BoardFilter = 'all' | 'education' | 'experience';

export interface PixelRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Exact 14x14 red body pixel spans (horizontal runs) sampled from the
 * reference pixel-art red ghost image (14 columns x 14 rows).
 */
export const RED_GHOST_BODY_RUNS: readonly PixelRect[] = [
  { x: 5, y: 0, w: 4, h: 1 },
  { x: 3, y: 1, w: 8, h: 1 },
  { x: 2, y: 2, w: 10, h: 1 },
  { x: 1, y: 3, w: 12, h: 1 },
  { x: 1, y: 4, w: 12, h: 1 },
  { x: 1, y: 5, w: 12, h: 1 },
  { x: 0, y: 6, w: 14, h: 6 },
  // Scalloped bottom feet (rows 12 & 13)
  { x: 0, y: 12, w: 2, h: 1 },
  { x: 3, y: 12, w: 3, h: 1 },
  { x: 8, y: 12, w: 3, h: 1 },
  { x: 12, y: 12, w: 2, h: 1 },
  { x: 0, y: 13, w: 1, h: 1 },
  { x: 4, y: 13, w: 2, h: 1 },
  { x: 8, y: 13, w: 2, h: 1 },
  { x: 13, y: 13, w: 1, h: 1 },
];

/**
 * Exact stepped white sclera regions for left and right eyes on the 14x14 grid.
 * Left eye spans columns 3..6 (rows 4..6) and 4..5 (rows 3,7).
 * Right eye spans columns 9..12 (rows 4..6) and 10..11 (rows 3,7).
 */
export const RED_GHOST_EYE_SCLERA: readonly PixelRect[] = [
  // Left eye
  { x: 4, y: 3, w: 2, h: 1 },
  { x: 3, y: 4, w: 4, h: 3 },
  { x: 4, y: 7, w: 2, h: 1 },
  // Right eye
  { x: 10, y: 3, w: 2, h: 1 },
  { x: 9, y: 4, w: 4, h: 3 },
  { x: 10, y: 7, w: 2, h: 1 },
];

/**
 * Returns the 2x2 black pupil rectangles inside the 4-column eye wells
 * so the character cleanly looks left, center, or right without subpixel blur.
 */
export function getGhostPupilPositions(gaze: GhostGaze): {
  leftEye: PixelRect;
  rightEye: PixelRect;
} {
  const offset = gaze === 'left' ? 0 : gaze === 'center' ? 1 : 2;
  return {
    leftEye: { x: 3 + offset, y: 5, w: 2, h: 2 },
    rightEye: { x: 9 + offset, y: 5, w: 2, h: 2 },
  };
}

export const GHOST_GAZE_SEQUENCE: readonly GhostGaze[] = [
  'right',
  'right',
  'center',
  'left',
  'left',
  'center',
];

export function getGhostGazeForStep(step: number): GhostGaze {
  const len = GHOST_GAZE_SEQUENCE.length;
  const normalized = ((step % len) + len) % len;
  return GHOST_GAZE_SEQUENCE[normalized];
}

export function computeScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 0;
  const ratio = scrollTop / maxScroll;
  return Math.max(0, Math.min(1, ratio));
}
