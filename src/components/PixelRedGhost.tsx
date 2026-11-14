import React, { useEffect, useState } from 'react';
import {
  GhostGaze,
  RED_GHOST_BODY_RUNS,
  RED_GHOST_EYE_SCLERA,
  getGhostGazeForStep,
  getGhostPupilPositions,
} from './experiences-board';

interface PixelRedGhostProps {
  className?: string;
  svgClassName?: string;
}

export default function PixelRedGhost({
  className = '',
  svgClassName = 'w-full h-full',
}: PixelRedGhostProps) {
  const [step, setStep] = useState(0);
  const [manualOverride, setManualOverride] = useState<GhostGaze | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return;
    }

    const timer = window.setInterval(() => {
      setStep((prev) => (prev + 1) % 6);
    }, 450);

    return () => window.clearInterval(timer);
  }, []);

  const activeGaze: GhostGaze = manualOverride ?? getGhostGazeForStep(step);
  const pupils = getGhostPupilPositions(activeGaze);

  const handleToggleGaze = () => {
    setManualOverride((current) => {
      const base = current ?? activeGaze;
      return base === 'left' ? 'right' : 'left';
    });
    window.setTimeout(() => {
      setManualOverride(null);
    }, 1800);
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      data-testid="pixel-red-ghost-stage"
    >
      <button
        type="button"
        onClick={handleToggleGaze}
        aria-label="Pac-Man vermelho pixelado olhando de um lado para o outro"
        data-testid="pixel-red-ghost-button"
        data-gaze={activeGaze}
        className="relative inline-flex items-center justify-center w-full h-full p-0 cursor-pointer transition-transform duration-200 hover:scale-[1.015] active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#081529] rounded-2xl"
      >
        <svg
          viewBox="0 0 14 14"
          shapeRendering="crispEdges"
          role="img"
          aria-label="Personagem Pac-Man vermelho em pixel art"
          data-testid="pixel-red-ghost-svg"
          data-gaze={activeGaze}
          className={svgClassName}
        >
          {/* Red body (exact #BF1C2D from reference image) */}
          <g fill="#BF1C2D">
            {RED_GHOST_BODY_RUNS.map((rect, idx) => (
              <rect
                key={`body-${idx}`}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
              />
            ))}
          </g>

          {/* White eye sclera */}
          <g fill="#FCFCFC">
            {RED_GHOST_EYE_SCLERA.map((rect, idx) => (
              <rect
                key={`eye-${idx}`}
                x={rect.x}
                y={rect.y}
                width={rect.w}
                height={rect.h}
              />
            ))}
          </g>

          {/* 2x2 black pupils looking from side to side */}
          <g fill="#06080F" data-testid="pixel-red-ghost-pupils">
            <rect
              x={pupils.leftEye.x}
              y={pupils.leftEye.y}
              width={pupils.leftEye.w}
              height={pupils.leftEye.h}
            />
            <rect
              x={pupils.rightEye.x}
              y={pupils.rightEye.y}
              width={pupils.rightEye.w}
              height={pupils.rightEye.h}
            />
          </g>
        </svg>
      </button>
    </div>
  );
}
