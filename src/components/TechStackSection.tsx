import React from 'react';
import { VIDEO_PROJECTS } from '../utils/portfolio-data';
import { ExternalLink, Film } from 'lucide-react';

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
                    ? 'bg-[#0f0f12] border border-dashed border-zinc-800/90'
                    : 'bg-[#141414] border border-zinc-800/90 hover:border-zinc-600 shadow-lg'
                }`}
              >
                <div>
                  {/* Top Square/4:3 Silent GIF Preview */}
                  <div
                    className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 ${
                      project.isPlaceholder
                        ? 'bg-zinc-950/90 border border-zinc-800/70 flex flex-col items-center justify-center text-center px-4'
                        : 'bg-[#080c14] border border-zinc-800/90'
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
                ) : (
                  <div className="mt-5 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs text-zinc-600">
                    <span>Aguardando publicação</span>
                    <span className="font-mono text-[10px]">EM BREVE</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
