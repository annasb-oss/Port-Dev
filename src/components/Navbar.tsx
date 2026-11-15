import React, { useEffect, useRef, useState } from 'react';

type NavSectionId = 'hero' | 'sobre-mim' | 'experiencias' | 'meus-projetos';

interface NavItem {
  id: NavSectionId;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Início', href: '#hero' },
  { id: 'sobre-mim', label: 'Sobre mim', href: '#sobre-mim' },
  { id: 'experiencias', label: 'Experiências', href: '#experiencias' },
  { id: 'meus-projetos', label: 'Meus Projetos', href: '#meus-projetos' },
];

export default function Navbar() {
  const [activeId, setActiveId] = useState<NavSectionId>('hero');
  const [scrolled, setScrolled] = useState(false);
  const manualLockUntilRef = useRef<number>(0);

  useEffect(() => {
    const updateActiveFromScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);

      if (performance.now() < manualLockUntilRef.current) {
        return;
      }

      const viewportMid = y + window.innerHeight * 0.35;
      const getDocTop = (id: string) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + y : null;
      };

      const sobreTop = getDocTop('sobre-mim');
      const expTop = getDocTop('experiencias');
      const projTop = getDocTop('meus-projetos');

      if (projTop !== null && viewportMid >= projTop) {
        setActiveId('meus-projetos');
      } else if (expTop !== null && viewportMid >= expTop) {
        setActiveId('experiencias');
      } else if (sobreTop !== null && viewportMid >= sobreTop) {
        setActiveId('sobre-mim');
      } else {
        setActiveId('hero');
      }
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setActiveId(item.id);
    manualLockUntilRef.current = performance.now() + 800;

    const target = document.getElementById(item.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (window.location.hash !== item.href) {
      window.history.replaceState(null, '', item.href);
    }
  };

  return (
    <header className="pointer-events-none fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-2 sm:px-4">
      <nav
        aria-label="Navegação principal"
        className={`pointer-events-auto flex items-center gap-0.5 sm:gap-1.5 rounded-full p-1 sm:p-1.5 border transition-all duration-300 max-w-full overflow-hidden bg-transparent backdrop-blur-md ${
          scrolled
            ? 'border-white/30 shadow-[0_8px_28px_rgba(0,0,0,0.32),0_0_18px_rgba(59,130,246,0.10)]'
            : 'border-white/35 shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${
                isActive
                  ? 'text-white'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
