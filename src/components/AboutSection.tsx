import React from 'react';
import { ABOUT_DATA } from '../utils/portfolio-data';
import { Download } from 'lucide-react';
import AboutPortraitMorph from './AboutPortraitMorph';
import AboutNebulaReveal from './AboutNebulaReveal';

const RESUME_PDF_URL = '/assets/aistudio/ana_Carolina_tech_473a5434.pdf';

export default function AboutSection() {
  return (
    <section
      id="sobre-mim"
      className="relative z-10 w-full min-h-screen bg-[#000000] px-5 sm:px-10 md:px-14 lg:px-16 pt-24 pb-16 flex items-center text-white overflow-hidden scroll-mt-10"
    >
      {/* Always-visible teal / blue-green cosmic nebula over #000000 black */}
      <AboutNebulaReveal />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* ESQUERDA: Apresentação pessoal */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl xl:text-[3.2rem] font-extrabold tracking-tight leading-[1.08] font-sans">
              <span className="text-[#3B82F6]">Sobre</span>{' '}
              <span className="text-white">Mim</span>
            </h2>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-xs">
              {ABOUT_DATA.summary}
            </p>

            <p className="mt-2 text-xs font-medium text-blue-300/85">
              {ABOUT_DATA.focus}
            </p>

            <a
              href={RESUME_PDF_URL}
              download="Ana_Carolina_Barros_Curriculo.pdf"
              rel="noopener noreferrer"
              data-testid="download-resume-button"
              className="mt-6 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Abaixar curriculo</span>
            </a>
          </div>

          {/* CENTRO: Ana em destaque maior com fantasia da Mulher-Gato revelada apenas onde o mouse passa */}
          <div className="lg:col-span-6 flex justify-center items-end">
            <AboutPortraitMorph />
          </div>

          {/* DIREITA: Texto resumido */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-3 text-sm leading-relaxed text-slate-300 max-w-xs">
              {ABOUT_DATA.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
