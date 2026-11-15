import React from 'react';
import { TECH_STACK, VIDEO_PROJECTS } from '../utils/portfolio-data';
import { ExternalLink, Film } from 'lucide-react';

const TECH_ICON_SLUGS: Record<string, string> = {
  java: 'java',
  spring: 'spring',
  postgres: 'postgresql',
  mysql: 'mysql',
  docker: 'docker',
  junit: 'junit5',
  github: 'github',
};

export default function TechStackSection() {
  return (
    <section
      id="meus-projetos"
      data-testid="meus-projetos-section"
      className="relative z-10 w-full bg-black px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 text-white scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Meus Projetos — Video/GIF Showcase Grid */}
        <div>
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              Meus <span className="text-[#3b82f6]">Projetos</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Demonstrações visuais sem som dos projetos publicados no GitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-testid={`project-card-${project.id}`}
                className={`group relative p-5 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  project.isPlaceholder
                    ? 'bg-[#0f0f12]/90 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.06)]'
                    : 'bg-[#141414]/90 border border-white/35 shadow-[0_0_10px_rgba(255,255,255,0.10),inset_0_0_12px_rgba(255,255,255,0.025)]'
                } hover:-translate-y-1 hover:border-white/85 hover:shadow-[0_0_12px_rgba(255,255,255,0.58),0_0_28px_rgba(255,255,255,0.20),inset_0_0_16px_rgba(255,255,255,0.06)] focus-within:border-white/85 focus-within:shadow-[0_0_12px_rgba(255,255,255,0.58),0_0_28px_rgba(255,255,255,0.20)] active:shadow-[0_0_12px_rgba(255,255,255,0.45)]
                }`}
              >
                <div>
                  {/* Top Square/4:3 Silent GIF Preview */}
                  <div
                    className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 ${
                      project.isPlaceholder
                        ? 'bg-zinc-950/90 border border-zinc-800/70 flex flex-col items-center justify-center text-center px-4'
                        : 'bg-[#080c14] border border-white/25 shadow-[0_0_12px_rgba(255,255,255,0.08)] group-hover:border-white/55 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.20)]'
                    }`}
                  >
                    {project.gifUrl ? (
                      <img
                        src={
                          project.id === 'nebula-search' && !project.gifUrl.includes('?')
                            ? `${project.gifUrl}?v=3`
                            : project.gifUrl
                        }
                        alt={project.gifAlt ?? project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Film className="w-8 h-8 text-zinc-700 mb-2" aria-hidden="true" />
                        <span className="text-xs font-semibold text-zinc-500">
                          Em breve · GIF sem som
                        </span>
                      </>
                    )}
                  </div>

                  {/* Project Title & Description */}
                  <h3
                    className={`text-xl font-bold mb-1.5 ${
                      project.isPlaceholder
                        ? 'text-zinc-400'
                        : 'text-white group-hover:text-zinc-200 transition-colors'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Action Link */}
                {project.repoUrl ? (
                  <div className="mt-5 pt-4 border-t border-zinc-800/60">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visualizar ${project.title} no GitHub`}
                      data-testid={`project-link-${project.id}`}
                      className="inline-flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-xs font-semibold text-white transition"
                    >
                      <span className="truncate">{project.repoLabel ?? project.repoUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0 transition-colors" />
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* Tech Stack — white glow technology cards */}
        <div id="tech-stack" className="mt-20 scroll-mt-24">
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              Tech <span className="text-[#3b82f6]">Stack</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Tecnologias e ferramentas que utilizo nos meus estudos e projetos.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {TECH_STACK.map((tech) => (
              <article
                key={tech.id}
                data-testid={`tech-card-${tech.id}`}
                className="group relative min-h-[142px] rounded-2xl border border-white/35 bg-[#10141d]/90 px-4 py-5 flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(255,255,255,0.10),inset_0_0_12px_rgba(255,255,255,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-white/85 hover:shadow-[0_0_12px_rgba(255,255,255,0.65),0_0_30px_rgba(255,255,255,0.22),inset_0_0_18px_rgba(255,255,255,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] p-2.5 shadow-[0_0_12px_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.08] group-hover:shadow-[0_0_16px_rgba(255,255,255,0.20)]">
                  <img
                    src={`https://cdn.simpleicons.org/${TECH_ICON_SLUGS[tech.iconName]}/FFFFFF`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="text-base sm:text-lg font-extrabold text-white group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span className="mt-1.5 text-[10px] sm:text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {tech.category}
                </span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_72%)]" />
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
