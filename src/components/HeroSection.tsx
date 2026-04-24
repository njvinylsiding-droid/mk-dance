import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ['Salsa On2', 'Bachata', 'Merengue', 'Cha Cha', 'Cumbia'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776000899048_a8b2465b.png"
          alt="Salsa dancing at MK Dance Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Newark's Ironbound Section — Now Enrolling</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6">
            Feel the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
              Rhythm
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white/80">
              Learn{' '}
              <span className="font-bold text-amber-400 inline-block min-w-[200px] transition-all duration-500">
                {texts[currentText]}
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            Join Manuel, Claribel & their magnificent team for the most electrifying Latin dance experience in North Jersey. 
            Private & group lessons for all levels.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('book-trial')}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:shadow-2xl hover:shadow-red-600/30 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Your Free Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => scrollTo('styles')}
              className="group border-2 border-white/30 hover:border-amber-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Dance Styles
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10">
            {[
              { number: '1,500+', label: 'Students Trained' },
              { number: '4', label: 'Expert Instructors' },
              { number: '10+', label: 'Years Experience' },
              { number: '6', label: 'Dance Styles' },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.number}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button onClick={() => scrollTo('styles')} className="flex flex-col items-center gap-2 text-white/50 hover:text-amber-400 transition-colors group">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-current rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
