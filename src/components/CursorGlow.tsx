import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Keep the effect exclusive to devices with a real mouse/trackpad.
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!pointerQuery.matches) return;

    // Replace the native arrow: the glowing dot becomes the actual cursor.
    document.documentElement.classList.add('portfolio-custom-cursor');

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
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
      document.documentElement.classList.remove('portfolio-custom-cursor');
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
