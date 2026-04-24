import React, { useState } from 'react';

const styles = [
  {
    name: 'Salsa On2',
    subtitle: 'New York Style',
    description: 'The smooth, sophisticated New York mambo style. Dance on the 2nd beat with elegant body movement and intricate turn patterns.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776000965979_8c3d87a7.jpg',
    level: 'All Levels',
    featured: true,
  },
  {
    name: 'Bachata',
    subtitle: 'Sensual & Traditional',
    description: 'From the Dominican Republic to the Ironbound. Master the romantic hip movements and intimate partner connection.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776000990287_3c3528a1.png',
    level: 'All Levels',
    featured: false,
  },
  {
    name: 'Merengue',
    subtitle: 'Fun & Energetic',
    description: 'The easiest Latin dance to learn and the most fun! Perfect for beginners with its simple marching rhythm and playful turns.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001119706_62720bda.jpg',
    level: 'Beginner Friendly',
    featured: false,
  },
  {
    name: 'Cha Cha',
    subtitle: 'Playful & Precise',
    description: 'Add flair with the iconic cha-cha-cha triple step. A lively dance that builds rhythm, timing, and confidence on the floor.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001136856_38d97cfc.jpg',
    level: 'All Levels',
    featured: false,
  },
  {
    name: 'Cumbia',
    subtitle: 'Colombian Groove',
    description: 'Feel the Colombian rhythm with circular movements and playful footwork. A crowd favorite at every Latin party.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001410004_86fcb5d1.jpg',
    level: 'All Levels',
    featured: false,
  },
];

const DanceStyles: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState(0);

  const scrollToBooking = () => {
    const el = document.getElementById('book-trial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="styles" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">What We Teach</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Master Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Latin Rhythm</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From the elegance of Salsa On2 to the passion of Bachata — we teach every style that makes Latin dance unforgettable.
          </p>
        </div>

        {/* Featured Style (Salsa On2) */}
        <div className="mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto min-h-[400px]">
              <img
                src={styles[0].image}
                alt={styles[0].name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/50 md:block hidden" />
            </div>
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit">
                Signature Style
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{styles[0].name}</h3>
              <p className="text-amber-400 font-semibold mb-4">{styles[0].subtitle}</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{styles[0].description}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToBooking}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-lg"
                >
                  Try a Free Class
                </button>
                <span className="inline-flex items-center gap-2 text-white/60 px-4 py-3 border border-white/20 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {styles[0].level}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Styles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.slice(1).map((style, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              onClick={scrollToBooking}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={style.image}
                  alt={style.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{style.subtitle}</span>
                  <h3 className="text-2xl font-black text-white mt-1 mb-2">{style.name}</h3>
                  <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3">
                    {style.description}
                  </p>
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {style.level}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DanceStyles;
