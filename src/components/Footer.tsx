import React from 'react';
import { Terminal, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full bg-black border-t border-zinc-800/80 py-10 px-4 sm:px-8 text-zinc-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-white">Desenvolvedora Back-end</span>
          <span className="text-zinc-600">•</span>
          <span>Java & Spring Boot Ecosystem</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-xs">
            Construído com dedicação e boas práticas
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition"
          >
            <ArrowUp className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
