import React, { useState } from 'react';
import { Code2, ExternalLink, Film, FolderKanban, Gamepad2, Trophy } from 'lucide-react';
import { EXPERIENCE_TIMELINE, TECH_STACK, VIDEO_PROJECTS } from '../utils/portfolio-data';

type PortfolioTab = 'projects' | 'tech' | 'achievements';
const TABS: { id: PortfolioTab; label: string; icon: React.ElementType }[] = [
  { id: 'projects', label: 'Projetos', icon: FolderKanban },
  { id: 'tech', label: 'Tech Stack', icon: Code2 },
  { id: 'achievements', label: 'Conquistas', icon: Trophy },
];
const TECH_ICONS: Record<string, { slug: string; color: string }> = {
  java: { slug: 'java', color: 'F89820' }, spring: { slug: 'spring', color: '6DB33F' },
  postgres: { slug: 'postgresql', color: '4169E1' }, mysql: { slug: 'mysql', color: '4479A1' },
  docker: { slug: 'docker', color: '2496ED' }, junit: { slug: 'junit5', color: '25A162' },
  github: { slug: 'github', color: 'FFFFFF' },
};

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('projects');
  return (
    <section id="meus-projetos" data-testid="meus-projetos-section" className="relative z-10 w-full bg-black px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 text-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">Meu <span className="text-[#3b82f6]">Portfólio</span></h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">Explore meus projetos, estudos, tecnologias e conquistas.</p>
        </div>

        <div role="tablist" aria-label="Categorias do portfólio" className="mx-auto mb-8 flex w-fit max-w-full items-center justify-start sm:justify-center gap-1.5 overflow-x-auto overscroll-x-contain rounded-full border border-white/30 bg-transparent p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.30)] backdrop-blur-md">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button key={tab.id} type="button" role="tab" id={`portfolio-tab-${tab.id}`} aria-selected={selected} aria-controls={`portfolio-panel-${tab.id}`} onClick={() => setActiveTab(tab.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${selected ? 'border-transparent bg-transparent text-white shadow-none' : 'border-transparent bg-transparent text-zinc-400 hover:border-transparent hover:bg-transparent hover:text-white'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />{tab.label}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`portfolio-panel-${activeTab}`} aria-labelledby={`portfolio-tab-${activeTab}`} className="min-h-[260px]">
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_PROJECTS.map((project) => (
                <article key={project.id} data-testid={`project-card-${project.id}`} className={`glow-border-card group relative isolate p-5 rounded-3xl transition-all duration-300 flex flex-col justify-between ${project.isPlaceholder ? 'bg-[#0f0f12]/90 border border-white/20' : 'bg-[#141414]/90 border border-white/35 shadow-[0_0_10px_rgba(255,255,255,0.10),inset_0_0_12px_rgba(255,255,255,0.025)]'} hover:-translate-y-1 hover:border-white/85 hover:shadow-[0_0_12px_rgba(255,255,255,0.58),0_0_28px_rgba(255,255,255,0.20),inset_0_0_16px_rgba(255,255,255,0.06)] focus-within:border-white/85`}>
                  <div className="relative z-[2]">
                    <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 ${project.isPlaceholder ? 'bg-zinc-950/90 border border-zinc-800/70 flex flex-col items-center justify-center text-center px-4' : 'bg-[#080c14] border border-white/25 shadow-[0_0_12px_rgba(255,255,255,0.08)] group-hover:border-white/55 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.20)]'}`}>
                      {project.id === 'pacman' ? (
                        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-black" aria-label="Prévia do jogo PAC-MAN">
                          <div aria-hidden="true" className="absolute inset-3 rounded-xl border border-blue-700/80 shadow-[0_0_18px_rgba(37,99,235,0.25)]" />
                          <div aria-hidden="true" className="absolute inset-x-7 top-1/4 h-px bg-blue-500/70 shadow-[0_0_8px_#2563eb]" />
                          <div aria-hidden="true" className="absolute inset-x-7 bottom-1/4 h-px bg-blue-500/70 shadow-[0_0_8px_#2563eb]" />
                          <div aria-hidden="true" className="absolute left-[18%] top-[20%] h-2 w-2 bg-white shadow-[24px_0_#fff,48px_0_#fff,72px_0_#fff,96px_0_#fff]" />
                          <div aria-hidden="true" className="absolute right-[18%] bottom-[20%] h-2 w-2 bg-white shadow-[-24px_0_#fff,-48px_0_#fff,-72px_0_#fff,-96px_0_#fff]" />
                          <div className="relative z-[1] flex items-center gap-3 sm:gap-4">
                            <span className="relative block h-11 w-11 rounded-full border-[3px] border-yellow-300 border-r-transparent bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.35)]" />
                            <span className="h-5 w-5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.25)]" />
                            <span className="h-5 w-5 rounded-full bg-pink-300" />
                            <span className="h-5 w-5 rounded-full bg-cyan-300" />
                          </div>
                          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.25em] text-yellow-300">
                            <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" /> ARCADE
                          </div>
                        </div>
                      ) : project.gifUrl ? <img src={project.gifUrl} alt={project.gifAlt ?? project.title} loading="lazy" className="w-full h-full object-cover" /> : <><Film className="w-8 h-8 text-zinc-700 mb-2" aria-hidden="true" /><span className="text-xs font-semibold text-zinc-500">Em breve · GIF sem som</span></>}
                    </div>
                    <h3 className={`text-xl font-bold mb-1.5 ${project.isPlaceholder ? 'text-zinc-400' : 'text-white group-hover:text-zinc-200 transition-colors'}`}>{project.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                  </div>
                  {project.repoUrl && <div className="relative z-[2] mt-5 pt-4 border-t border-zinc-800/60"><a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visualizar ${project.title} no GitHub`} data-testid={`project-link-${project.id}`} className="inline-flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-xs font-semibold text-white transition"><span className="truncate">{project.repoLabel ?? project.repoUrl}</span><ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0 transition-colors" /></a></div>}
                </article>
              ))}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {TECH_STACK.map((tech) => (
                <article key={tech.id} data-testid={`tech-card-${tech.id}`} className="glow-border-card group relative isolate min-h-[142px] rounded-2xl border border-white/35 bg-[#10141d]/90 px-4 py-5 flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(255,255,255,0.10),inset_0_0_12px_rgba(255,255,255,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-white/85 hover:shadow-[0_0_12px_rgba(255,255,255,0.65),0_0_30px_rgba(255,255,255,0.22),inset_0_0_18px_rgba(255,255,255,0.07)]">
                  <span className="relative z-[2] mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] p-2.5 shadow-[0_0_12px_rgba(255,255,255,0.08)]"><img src={`https://cdn.simpleicons.org/${TECH_ICONS[tech.iconName].slug}/${TECH_ICONS[tech.iconName].color}`} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-contain" /></span>
                  <span className="relative z-[2] text-base sm:text-lg font-extrabold text-white">{tech.name}</span>
                  <span className="relative z-[2] mt-1.5 text-[10px] sm:text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{tech.category}</span>
                </article>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPERIENCE_TIMELINE.map((entry) => (
                <article key={entry.id} className="glow-border-card relative isolate rounded-2xl border border-white/25 bg-[#10141d]/90 p-5 shadow-[0_0_10px_rgba(255,255,255,0.08)]">
                  <div className="relative z-[2] flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06]"><Trophy className="h-5 w-5 text-amber-200" aria-hidden="true" /></span><div className="min-w-0"><h3 className="font-bold text-white">{entry.institution}</h3><p className="mt-1 text-sm font-semibold text-zinc-200">{entry.courseOrRole}</p>{entry.description && <p className="mt-2 text-xs leading-relaxed text-zinc-400">{entry.description}</p>}{(entry.period || entry.tags?.length) && <p className="mt-3 text-xs font-semibold text-cyan-200">{[entry.period, ...(entry.tags ?? [])].filter(Boolean).join(' · ')}</p>}{entry.linkUrl && <a href={entry.linkUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-cyan-200 hover:text-white">{entry.linkLabel ?? 'Ver projeto'} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}</div></div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
