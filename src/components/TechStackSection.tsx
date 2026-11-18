import React, { useState } from 'react';
import { Code2, ExternalLink, Film, FolderKanban, Trophy } from 'lucide-react';
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
                    <div className={`relative w-full ${project.id === 'pacman' ? 'aspect-square' : 'aspect-[4/3]'} rounded-2xl overflow-hidden mb-4 ${project.isPlaceholder ? 'bg-zinc-950/90 border border-zinc-800/70 flex flex-col items-center justify-center text-center px-4' : 'bg-[#080c14] border border-white/25 shadow-[0_0_12px_rgba(255,255,255,0.08)] group-hover:border-white/55 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.20)]'}`}>
                      {project.id === 'pacman' ? (
                        <svg
                          viewBox="0 0 400 400"
                          role="img"
                          aria-label="Ilustração quadrada do PAC-MAN com labirinto azul, pontos dourados, fantasmas e cerejas"
                          className="absolute inset-0 block h-full w-full"
                          preserveAspectRatio="xMidYMid slice"
                        >
                          <defs>
                            <linearGradient id="ghost-red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff777f"/><stop offset=".42" stopColor="#f32942"/><stop offset="1" stopColor="#a90928"/></linearGradient>
                            <linearGradient id="ghost-orange" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe08a"/><stop offset=".45" stopColor="#ffad27"/><stop offset="1" stopColor="#d85a08"/></linearGradient>
                            <linearGradient id="ghost-green" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b5f27a"/><stop offset=".45" stopColor="#68c947"/><stop offset="1" stopColor="#24813d"/></linearGradient>
                            <linearGradient id="ghost-eye" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#c9e5ff"/></linearGradient>
                            <pattern id="pacman-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                              <circle cx="14" cy="14" r="4.2" fill="#ffb52e" />
                            </pattern>
                          </defs>
                          <g>
                            <rect width="400" height="400" fill="#030303" />
                            <rect width="400" height="400" fill="url(#pacman-dots)" />
                            <g fill="#030303" stroke="#073bff" strokeWidth="5" strokeLinejoin="round">
                              <path d="M22 34h112v28H52v42H18V58h4zM266 34h112v28H296v42h-30zM18 148h82v28H48v50H18zM300 148h82v28h-52v50h-30zM20 270h100v26H48v42H20zM280 270h100v26h-70v42h-30zM145 18h28v90h-28zM228 18h28v90h-28zM145 292h28v90h-28zM228 292h28v90h-28z" />
                              <path d="M90 128h220v16H90zM90 256h220v16H90z" />
                            </g>
                            <g fill="#ffdc24">
                              <path d="M194 168a38 38 0 1 0 0 64l-31-32z" />
                              <circle cx="190" cy="185" r="5" fill="#080808" />
                            </g>
                            <g strokeLinejoin="round">
                              <g transform="translate(70 63)">
                                <path d="M3 49V25C3 10 13 1 27 1s24 9 24 24v24l-7-5-7 6-7-6-7 6-7-6z" fill="#650d20" opacity=".75" transform="translate(0 3)"/>
                                <path d="M3 49V25C3 10 13 1 27 1s24 9 24 24v24l-7-5-7 6-7-6-7 6-7-6z" fill="url(#ghost-red)" stroke="#ff9aa3" strokeWidth="1.4"/>
                                <path d="M10 14Q16 3 27 4" fill="none" stroke="#ffd0d2" strokeWidth="3" opacity=".55" strokeLinecap="round"/>
                                <ellipse cx="19" cy="25" rx="8" ry="10" fill="url(#ghost-eye)" stroke="#fff" strokeWidth="1"/>
                                <ellipse cx="36" cy="25" rx="8" ry="10" fill="url(#ghost-eye)" stroke="#fff" strokeWidth="1"/>
                                <circle cx="21" cy="27" r="4.1" fill="#16418d"/><circle cx="38" cy="27" r="4.1" fill="#16418d"/>
                                <circle cx="22.4" cy="25.4" r="1.5" fill="#fff"/><circle cx="39.4" cy="25.4" r="1.5" fill="#fff"/>
                                <path d="M8 39q4-4 8 0" fill="none" stroke="#ffb2b8" strokeWidth="2" opacity=".65"/>
                              </g>
                              <g transform="translate(275 260)">
                                <path d="M3 49V25C3 10 13 1 27 1s24 9 24 24v24l-7-5-7 6-7-6-7 6-7-6z" fill="#650d20" opacity=".75" transform="translate(0 3)"/>
                                <path d="M3 49V25C3 10 13 1 27 1s24 9 24 24v24l-7-5-7 6-7-6-7 6-7-6z" fill="url(#ghost-red)" stroke="#ff9aa3" strokeWidth="1.4"/>
                                <path d="M10 14Q16 3 27 4" fill="none" stroke="#ffd0d2" strokeWidth="3" opacity=".55" strokeLinecap="round"/>
                                <ellipse cx="19" cy="25" rx="8" ry="10" fill="url(#ghost-eye)" stroke="#fff" strokeWidth="1"/>
                                <ellipse cx="36" cy="25" rx="8" ry="10" fill="url(#ghost-eye)" stroke="#fff" strokeWidth="1"/>
                                <circle cx="21" cy="27" r="4.1" fill="#16418d"/><circle cx="38" cy="27" r="4.1" fill="#16418d"/>
                                <circle cx="22.4" cy="25.4" r="1.5" fill="#fff"/><circle cx="39.4" cy="25.4" r="1.5" fill="#fff"/>
                                <path d="M8 39q4-4 8 0" fill="none" stroke="#ffb2b8" strokeWidth="2" opacity=".65"/>
                              </g>
                              <g transform="translate(285 82)">
                                <path d="M3 39V20C3 8 12 1 25 1s22 7 22 19v19l-6-4-7 5-7-5-7 5-7-5z" fill="#79400b" opacity=".75" transform="translate(0 3)"/>
                                <path d="M3 39V20C3 8 12 1 25 1s22 7 22 19v19l-6-4-7 5-7-5-7 5-7-5z" fill="url(#ghost-orange)" stroke="#ffe2a0" strokeWidth="1.4"/>
                                <path d="M9 12Q15 3 25 4" fill="none" stroke="#fff0c5" strokeWidth="2.8" opacity=".65" strokeLinecap="round"/>
                                <ellipse cx="18" cy="20" rx="7" ry="8.5" fill="url(#ghost-eye)"/><ellipse cx="33" cy="20" rx="7" ry="8.5" fill="url(#ghost-eye)"/>
                                <circle cx="20" cy="22" r="3.7" fill="#16418d"/><circle cx="35" cy="22" r="3.7" fill="#16418d"/>
                                <circle cx="21.2" cy="20.5" r="1.4" fill="#fff"/><circle cx="36.2" cy="20.5" r="1.4" fill="#fff"/>
                              </g>
                              <g transform="translate(87 276)">
                                <path d="M3 39V20C3 8 12 1 25 1s22 7 22 19v19l-6-4-7 5-7-5-7 5-7-5z" fill="#245c25" opacity=".75" transform="translate(0 3)"/>
                                <path d="M3 39V20C3 8 12 1 25 1s22 7 22 19v19l-6-4-7 5-7-5-7 5-7-5z" fill="url(#ghost-green)" stroke="#c7f6a2" strokeWidth="1.4"/>
                                <path d="M9 12Q15 3 25 4" fill="none" stroke="#e4ffc8" strokeWidth="2.8" opacity=".65" strokeLinecap="round"/>
                                <ellipse cx="18" cy="20" rx="7" ry="8.5" fill="url(#ghost-eye)"/><ellipse cx="33" cy="20" rx="7" ry="8.5" fill="url(#ghost-eye)"/>
                                <circle cx="20" cy="22" r="3.7" fill="#16418d"/><circle cx="35" cy="22" r="3.7" fill="#16418d"/>
                                <circle cx="21.2" cy="20.5" r="1.4" fill="#fff"/><circle cx="36.2" cy="20.5" r="1.4" fill="#fff"/>
                              </g>
                            </g>
                            <g stroke="#54c75a" strokeWidth="5" fill="none" strokeLinecap="round">
                              <path d="M70 145q-8-20 8-28M70 145q15-22 27-16" />
                              <path d="M330 224q-8-20 8-28M330 224q15-22 27-16" />
                              <path d="M196 345q-8-20 8-28M196 345q15-22 27-16" />
                            </g>
                            <g fill="#ed1d35">
                              <circle cx="69" cy="151" r="9"/><circle cx="87" cy="151" r="9"/>
                              <circle cx="329" cy="230" r="9"/><circle cx="347" cy="230" r="9"/>
                              <circle cx="195" cy="351" r="9"/><circle cx="213" cy="351" r="9"/>
                            </g>
                          </g>
                        </svg>
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
