import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RED_GHOST_BODY_RUNS,
  RED_GHOST_EYE_SCLERA,
  getGhostPupilPositions,
  getGhostGazeForStep,
  computeScrollProgress,
} from './experiences-board';

test('RED_GHOST_BODY_RUNS stays within 14x14 sprite bounds', () => {
  assert.ok(RED_GHOST_BODY_RUNS.length >= 10);
  for (const rect of RED_GHOST_BODY_RUNS) {
    assert.ok(rect.x >= 0 && rect.x + rect.w <= 14);
    assert.ok(rect.y >= 0 && rect.y + rect.h <= 14);
  }
});

test('RED_GHOST_EYE_SCLERA defines both left and right eyes', () => {
  const leftEye = RED_GHOST_EYE_SCLERA.filter((r) => r.x < 7);
  const rightEye = RED_GHOST_EYE_SCLERA.filter((r) => r.x >= 7);
  assert.equal(leftEye.length, 3);
  assert.equal(rightEye.length, 3);
});

test('getGhostPupilPositions shifts pupils strictly inside eye sclera from left to right', () => {
  const left = getGhostPupilPositions('left');
  const center = getGhostPupilPositions('center');
  const right = getGhostPupilPositions('right');

  assert.equal(left.leftEye.x, 3);
  assert.equal(center.leftEye.x, 4);
  assert.equal(right.leftEye.x, 5);

  assert.equal(left.rightEye.x, 9);
  assert.equal(center.rightEye.x, 10);
  assert.equal(right.rightEye.x, 11);

  assert.ok(right.leftEye.x + right.leftEye.w <= 7);
  assert.ok(right.rightEye.x + right.rightEye.w <= 13);
});

test('getGhostGazeForStep cycles side-to-side cleanly including negative wrap', () => {
  const sequence = [0, 1, 2, 3, 4, 5].map((i) => getGhostGazeForStep(i));
  assert.deepEqual(sequence, ['right', 'right', 'center', 'left', 'left', 'center']);
  assert.equal(getGhostGazeForStep(-1), 'center');
  assert.equal(getGhostGazeForStep(6), 'right');
});

test('computeScrollProgress clamps between 0 and 1 and handles non-scrollable containers', () => {
  assert.equal(computeScrollProgress(0, 500, 500), 0);
  assert.equal(computeScrollProgress(0, 400, 500), 0);
  assert.equal(computeScrollProgress(250, 1000, 500), 0.5);
  assert.equal(computeScrollProgress(600, 1000, 500), 1);
  assert.equal(computeScrollProgress(-20, 1000, 500), 0);
});
