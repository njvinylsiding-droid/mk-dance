import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityHero: React.FC = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776003555166_dd7e98cc.png"
          alt="MK Dance Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Home
            </button>
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-amber-400 text-sm font-medium">Community</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-300 text-sm font-medium">Live Events This Week</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
            The MK
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500">
              Community
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
            More than a studio — we're a family. Join social dance nights, workshops, 
            connect with practice partners, and be part of Newark's most vibrant Latin dance community.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo('events-calendar')}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105"
            >
              View Upcoming Events
            </button>
            <button
              onClick={() => scrollTo('partner-finder')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
            >
              Find a Dance Partner
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: '500+', label: 'Community Members' },
              { value: '12+', label: 'Events Monthly' },
              { value: '50+', label: 'Social Nights/Year' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
