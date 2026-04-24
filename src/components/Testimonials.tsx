import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Maria G.',
    location: 'Jersey City, NJ',
    text: "I walked in with two left feet and now I'm dancing salsa at every party! Manuel and Claribel make you feel like family from day one. Best decision I ever made.",
    rating: 5,
    style: 'Salsa On2',
  },
  {
    name: 'David R.',
    location: 'Newark, NJ',
    text: "The energy in this studio is unmatched. Angel pushed me to be better every class. I've lost 30 pounds and gained a whole new social life. MK Dance Studio changed my life.",
    rating: 5,
    style: 'Bachata',
  },
  {
    name: 'Jennifer & Carlos P.',
    location: 'Elizabeth, NJ',
    text: "We started as a couple wanting to learn together. Now we go out dancing every weekend! Lizette's patience and expertise helped us connect through dance in ways we never imagined.",
    rating: 5,
    style: 'Salsa & Bachata',
  },
  {
    name: 'Anthony M.',
    location: 'Hoboken, NJ',
    text: "I was stressed from work and needed an outlet. Salsa became my therapy. The Ironbound location is perfect — I grab dinner at a local spot after every class. It's become my favorite routine.",
    rating: 5,
    style: 'Merengue',
  },
  {
    name: 'Sofia L.',
    location: 'Kearny, NJ',
    text: "As someone in my 50s, I was nervous about starting. But the instructors made me feel so welcome. Now I'm more confident and fit than I was in my 30s! The community here is incredible.",
    rating: 5,
    style: 'Cha Cha',
  },
  {
    name: 'Michael T.',
    location: 'Montclair, NJ',
    text: "I drive 30 minutes to get here and it's worth every mile. The quality of instruction is professional-level. Manuel's Salsa On2 classes are the real deal — authentic New York style.",
    rating: 5,
    style: 'Salsa On2',
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Student Stories</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Dancers</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their lives through Latin dance.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-gray-50 rounded-2xl p-6 border transition-all duration-500 ${
                activeIndex === i ? 'border-red-300 shadow-lg shadow-red-100/50 scale-[1.02]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.location}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">{t.style}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === i ? 'w-8 bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
