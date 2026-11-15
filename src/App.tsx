import React from 'react';
import BandApp from './components/band/App';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ExperiencesSection from './components/ExperiencesSection';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';
import AuroraBackground from './components/AuroraBackground';
import PacmanDivider from './components/pacman/PacmanDivider';
import HeroStarfield from './components/HeroStarfield';
import CursorGlow from './components/CursorGlow';

class BandErrorBoundary extends React.Component<
  React.PropsWithChildren,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="responsive-wrapper" aria-hidden="true" />;
    }
    return this.props.children;
  }
}


export default function App() {
  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      <CursorGlow />
      {/* Dark night sky with moving Aurora Borealis and twinkling stars */}
      <AuroraBackground />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Hero Section: 3D Interactive Card Badge with Physics over deep dark navy background with subtle blue glow */}
      <section
        id="hero"
        aria-label="Apresentação 3D interativa"
        className="relative z-10 w-full h-screen min-h-[650px] overflow-hidden select-none bg-[#030712]"
      >
        {/* Subtle dark navy & discrete blue background illumination */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 72% 42%, rgba(30, 64, 175, 0.24) 0%, rgba(15, 23, 42, 0.32) 45%, rgba(3, 7, 18, 0) 78%), radial-gradient(circle at 22% 52%, rgba(57, 123, 255, 0.14) 0%, rgba(19, 217, 232, 0.05) 36%, rgba(3, 7, 18, 0) 68%), linear-gradient(135deg, #02050e 0%, #050b1c 55%, #030712 100%)',
          }}
        />

        {/* Twinkling stars & shooting stars passing behind the hero presentation and 3D badge */}
        <HeroStarfield />

        {/* 3D Card Interactive Experience (Rapier Physics + Three.js Lanyard with transparent canvas) */}
        <BandErrorBoundary><BandApp /></BandErrorBoundary>

        {/* Portfolio Presentation Text */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-start md:justify-center items-center md:items-start px-5 pt-22 sm:px-10 sm:pt-28 md:px-12 lg:px-16 xl:px-20 md:py-16">
          <div className="max-w-xl md:max-w-[54%] lg:max-w-xl text-center md:text-left">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.26em] text-slate-400/95 mb-2 sm:mb-4">
              SEJA BEM-VINDO AO MEU PORTFÓLIO
            </p>

            <h1 className="text-[1.85rem] sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans text-white text-balance">
              Olá, eu sou{' '}
              <span
                className="inline-block whitespace-nowrap bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #713BFF 0%, #397BFF 33%, #13D9E8 66%, #21E6C3 100%)',
                }}
              >
                Ana Carolina
              </span>
            </h1>

            <p className="mt-2.5 sm:mt-4 text-[13px] sm:text-lg md:text-base lg:text-xl font-medium tracking-wide text-[#5EEAD4] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Estudante de Programação <span className="text-slate-400 mx-1">|</span> Desenvolvedora Java
            </p>
          </div>
        </div>
      </section>

      {/* Divisória interativa Pac-Man entre Início e Sobre Mim */}
      <PacmanDivider />

      {/* Seção Sobre Mim */}
      <AboutSection />

      {/* Seção Experiências (Formação e Estudos + Experiência e Projetos) */}
      <ExperiencesSection />

      {/* Seção Stack Tecnológica */}
      <TechStackSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
