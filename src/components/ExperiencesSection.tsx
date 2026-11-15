import React, { useRef, useState } from 'react';
import {
  GraduationCap,
  Terminal,
  Code2,
  Globe,
  BookOpen,
  Award,
  Languages,
  Calendar,
} from 'lucide-react';
import {
  EDUCATION_TIMELINE,
  TimelineEntry,
  TimelineIconType,
} from '../utils/portfolio-data';
import { computeScrollProgress } from './experiences-board';

const INSTITUTION_LOGOS: Partial<Record<TimelineIconType, string>> = {
  university: `${import.meta.env.BASE_URL}assets/logos/unimar.png`,
  'unimar-extra': `${import.meta.env.BASE_URL}assets/logos/unimar.png`,
  dio: `${import.meta.env.BASE_URL}assets/logos/dio.svg`,
  freecodecamp: `${import.meta.env.BASE_URL}assets/logos/freecodecamp.png`,
  bradesco: `${import.meta.env.BASE_URL}assets/logos/bradesco.svg?v=20261115-2`,
  harvard: `${import.meta.env.BASE_URL}assets/logos/edx.png`,
  duolingo: `${import.meta.env.BASE_URL}assets/logos/duolingo.png`,
  udemy: `${import.meta.env.BASE_URL}assets/logos/udemy.svg?v=20261115-2`,
};

function TimelineEntryIcon({ type }: { type: TimelineIconType }) {
  const logo = INSTITUTION_LOGOS[type];
  if (logo) {
    const label = type === 'harvard' ? 'edX' : type === 'bradesco' ? 'Fundação Bradesco' : type === 'university' ? 'UNIMAR' : type === 'dio' ? 'DIO' : type;
    return (
      <img
        src={logo}
        alt={`Logotipo ${label}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full rounded-full object-contain shrink-0 p-0.5"
      />
    );
  }

  const iconClass = 'w-4 h-4 text-cyan-200';
  switch (type) {
    case 'university':
      return <GraduationCap className={iconClass} aria-hidden="true" />;
    case 'dio':
      return <Terminal className={iconClass} aria-hidden="true" />;
    case 'harvard':
      return <BookOpen className={iconClass} aria-hidden="true" />;
    case 'unimar-extra':
      return <Award className={iconClass} aria-hidden="true" />;
    default:
      return <Code2 className={iconClass} aria-hidden="true" />;
  }
}

interface EducationListProps {
  entries: TimelineEntry[];
  activeId: string;
  onSelect: (id: string) => void;
}

function EducationTimelineList({
  entries,
  activeId,
  onSelect,
}: EducationListProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4 pl-11">
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#061121]">
          Formação e Estudos
        </h3>
        <p className="text-xs font-medium text-slate-300 mt-0.5">
          Formação acadêmica · Cursos complementares · Certificações
        </p>
      </div>

      <div className="relative flex flex-col gap-3">
        {/* Continuous vertical timeline rail */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[15px] top-4 bottom-4 w-[2px] rounded-full bg-white/15"
        />

        {entries.map((entry) => {
          const isActive = activeId === entry.id;

          return (
            <div
              key={entry.id}
              data-testid={`education-item-${entry.id}`}
              className="group relative pl-11"
            >
              {/* Numbered circular marker */}
              <button
                type="button"
                onClick={() => onSelect(entry.id)}
                aria-pressed={isActive}
                aria-label={`Selecionar ${entry.institution}`}
                data-testid={`education-marker-${entry.id}`}
                data-active={isActive ? 'true' : 'false'}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold tabular-nums border-2 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] ${
                  isActive
                    ? 'bg-cyan-300/15 text-cyan-100 border-cyan-200/50 shadow-[0_3px_0_rgba(79,70,229,0.55)] scale-105'
                    : 'bg-slate-950/50 text-cyan-100 border-white/25 group-hover:border-cyan-200 group-hover:text-cyan-100'
                }`}
              >
                {entry.numberLabel}
              </button>

              {/* Wide Horizontal Lying Rectangle Card ("retângulo deitado em uma única fila") */}
              <article
                className={`glow-border-card experience-glow-card relative isolate overflow-visible rounded-xl border-[1.5px] transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-200/60 bg-slate-950/55 shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
                    : 'border-white/25 bg-white/[0.07] hover:border-white/70 hover:bg-white/[0.11]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(entry.id)}
                  className="relative z-[2] w-full text-left px-4 py-3.5 cursor-pointer rounded-xl bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                >
                  {/* Top Row: Icon + Institution (left) | Tags + Period (right) — zero overlap */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-cyan-200/35 bg-cyan-300/[0.09] flex items-center justify-center shrink-0 overflow-hidden shadow-[0_0_12px_rgba(34,211,238,0.10)]">
                        <TimelineEntryIcon type={entry.icon} />
                      </span>
                      <h4 className="text-[15px] sm:text-base font-extrabold text-white leading-snug sm:truncate">
                        {entry.institution}
                      </h4>
                    </div>

                    {(entry.tags?.length || entry.period) && (
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-1 shrink-0 pl-[52px] sm:pl-0">
                        {entry.tags && entry.tags.length > 0 && (
                          <span className="text-[11px] font-bold text-cyan-200 whitespace-nowrap">
                            {entry.tags.join(' · ')}
                          </span>
                        )}
                        {entry.tags?.length && entry.period ? (
                          <span aria-hidden="true" className="hidden sm:inline text-white/30 text-xs">
                            ·
                          </span>
                        ) : null}
                        {entry.period && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-200 tabular-nums whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>{entry.period}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Course & optional description cleanly aligned in horizontal rectangle */}
                  <p className="mt-2 pl-[52px] text-xs sm:text-[13px] font-medium text-slate-200 leading-relaxed">
                    <span className="font-semibold text-white">{entry.courseOrRole}</span>
                    {entry.description ? (
                      <span className="text-slate-300"> — {entry.description}</span>
                    ) : null}
                  </p>
                </button>
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExperiencesSection() {
  const [activeEducationId, setActiveEducationId] = useState<string>(
    EDUCATION_TIMELINE[0]?.id ?? ''
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleInnerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setScrollProgress(computeScrollProgress(el.scrollTop, el.scrollHeight, el.clientHeight));
  };

  return (
    <section
      id="experiencias"
      aria-labelledby="experiencias-heading"
      className="relative z-10 w-full bg-[#040c18] px-4 sm:px-8 md:px-10 lg:px-14 pt-24 pb-24 md:pt-28 md:pb-28 text-white overflow-hidden scroll-mt-14"
    >
      {/* Top Wave Divider — same #000000 black as the Sobre Mim slide flowing smoothly into Minhas Experiências */}
      <div
        aria-hidden="true"
        data-testid="wave-below-about"
        className="pointer-events-none absolute top-0 left-0 right-0 z-[5] w-full overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-16 md:h-[76px]"
        >
          <path
            d="M 0 62 C 95 62, 130 22, 220 22 C 310 22, 360 64, 450 64 C 540 64, 590 22, 680 22 C 770 22, 820 64, 910 64 C 1000 64, 1050 22, 1140 22 C 1230 22, 1280 64, 1355 64 C 1400 64, 1420 52, 1440 44 L 1440 0 L 0 0 Z"
            fill="#000000"
          />
          <path
            d="M 0 62 C 95 62, 130 22, 220 22 C 310 22, 360 64, 450 64 C 540 64, 590 22, 680 22 C 770 22, 820 64, 910 64 C 1000 64, 1050 22, 1140 22 C 1230 22, 1280 64, 1355 64 C 1400 64, 1420 52, 1440 44"
            fill="none"
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Subtle deep navy gradient illumination keeping outer portfolio dark-blue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 45% at 50% 0%, rgba(0, 171, 240, 0.08) 0%, rgba(4, 12, 24, 0) 70%), radial-gradient(circle at 12% 80%, rgba(14, 165, 233, 0.06) 0%, rgba(4, 12, 24, 0) 55%)',
        }}
      />

      {/* Discrete Topographic Contour Texture */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 1100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.085]"
      >
        <g fill="none" stroke="#38bdf8" strokeWidth="1">
          <path d="M-80 140 C 180 60, 420 240, 720 150 C 1020 60, 1240 210, 1520 120" />
          <path d="M-80 185 C 190 105, 430 280, 730 190 C 1030 100, 1250 250, 1520 165" strokeOpacity="0.8" />
          <path d="M-80 235 C 210 155, 445 320, 745 235 C 1045 150, 1265 290, 1520 215" strokeOpacity="0.6" />
          <path d="M-60 880 C 220 790, 490 950, 790 865 C 1090 780, 1290 930, 1520 845" />
          <path d="M-60 935 C 235 845, 505 1000, 805 920 C 1105 840, 1300 980, 1520 900" strokeOpacity="0.7" />
        </g>
      </svg>

      {/* Main Mint-Green Rounded Board */}
      <div className="relative z-10 max-w-[1320px] mx-auto">
        <div
          data-testid="experiences-mint-board"
          className="relative rounded-[28px] sm:rounded-[34px] border border-cyan-100/20 text-white shadow-[0_24px_65px_rgba(0,0,0,0.55)] overflow-visible"
          style={{
            background: 'rgba(7, 20, 39, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          <div className="relative flex flex-col lg:h-[630px] xl:h-[650px]">
            {/* LEFT + CENTER: Pinned header + internal vertically scrollable horizontal rectangle cards */}
            <div className="relative z-10 w-full min-w-0 min-h-0 flex-1 flex flex-col p-5 sm:p-7 lg:p-9">
              {/* Board Header */}
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0 pr-0">
                  <h2
                    id="experiencias-heading"
                    className="text-2xl sm:text-3xl lg:text-[2.15rem] font-extrabold tracking-tight leading-[1.08] text-white font-sans text-balance"
                  >
                    Minhas Experiências
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-300 max-w-xl leading-relaxed">
                    Formação acadêmica, cursos complementares, certificações e estudos em tecnologia.
                  </p>
                </div>
              </div>

              {/* Internal Scroll Progress Bar */}
              <div className="mt-3.5 max-w-md">
                <div
                  aria-hidden="true"
                  className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden"
                >
                  <div
                    className="h-full rounded-full transition-transform duration-150 origin-left"
                    style={{
                      background: 'linear-gradient(90deg, #4F46E5 0%, #1D4ED8 100%)',
                      transform: `scaleX(${Math.max(0.14, scrollProgress)})`,
                    }}
                  />
                </div>
              </div>

              {/* Bounded Internal Scrollable Area */}
              <div
                ref={scrollContainerRef}
                onScroll={handleInnerScroll}
                data-testid="experiences-scroll-area"
                tabIndex={0}
                aria-label="Lista rolável de formação acadêmica e cursos"
                className="mint-board-scroll flex-1 min-h-0 h-[420px] sm:h-[460px] lg:h-auto overflow-y-auto overscroll-contain touch-pan-y mt-4 pr-2 sm:pr-3 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50 rounded-xl"
              >
                <div className="pb-3">
                  <EducationTimelineList
                    entries={EDUCATION_TIMELINE}
                    activeId={activeEducationId}
                    onSelect={setActiveEducationId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider — same #000000 black transitioning below Minhas Experiências into Stack Tecnológica */}
      <div
        aria-hidden="true"
        data-testid="wave-below-experiences"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] w-full overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
          className="block w-full h-12 sm:h-16 md:h-[76px]"
        >
          <path
            d="M 0 44 C 25 34, 50 22, 95 22 C 185 22, 235 64, 325 64 C 415 64, 465 22, 555 22 C 645 22, 695 64, 785 64 C 875 64, 925 22, 1015 22 C 1105 22, 1155 64, 1245 64 C 1335 64, 1385 26, 1440 26 L 1440 84 L 0 84 Z"
            fill="#000000"
          />
          <path
            d="M 0 44 C 25 34, 50 22, 95 22 C 185 22, 235 64, 325 64 C 415 64, 465 22, 555 22 C 645 22, 695 64, 785 64 C 875 64, 925 22, 1015 22 C 1105 22, 1155 64, 1245 64 C 1335 64, 1385 26, 1440 26"
            fill="none"
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
