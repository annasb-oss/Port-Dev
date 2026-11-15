import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Keep the effect exclusive to devices with a real mouse/trackpad.
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!pointerQuery.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      dot.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
      dot.style.opacity = '1';
    };

    const handlePointerLeave = () => {
      dot.style.opacity = '0';
    };

    const handlePointerEnter = () => {
      dot.style.opacity = '1';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    document.documentElement.addEventListener('pointerenter', handlePointerEnter);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      document.documentElement.removeEventListener('pointerenter', handlePointerEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="portfolio-cursor-glow"
    />
  );
}
