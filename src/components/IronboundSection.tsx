import React from 'react';

const IronboundSection: React.FC = () => {
  const scrollToBooking = () => {
    const el = document.getElementById('book-trial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Full-Width Banner */}
      <div className="relative h-[500px] md:h-[600px]">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776000937576_befcb461.jpg"
          alt="Newark's Ironbound Section"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/90 text-sm font-medium">86 Monroe St, 3rd Floor</span>
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Dance in the Heart of
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">The Ironbound</span>
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Newark's legendary Ironbound section — where the aroma of authentic Latin cuisine fills the streets, 
                where the music never stops, and where the culture runs deep. This is where salsa lives. 
                This is where you'll learn to dance.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Live Latin Culture', icon: (
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  )},
                  { label: 'Amazing Restaurants', icon: (
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  )},
                  { label: 'Near Penn Station', icon: (
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )},
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80">
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>


              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToBooking}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl"
                >
                  Visit Our Studio
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/10"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '3rd Floor', label: 'Spacious Studio', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )},
              { value: 'Free Parking', label: 'Street & Lot Available', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              )},
              { value: 'Near Transit', label: 'Newark Penn Station', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              )},
              { value: 'Safe Area', label: 'Well-Lit & Welcoming', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )},
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{item.value}</p>
                  <p className="text-gray-500 text-xs">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IronboundSection;
