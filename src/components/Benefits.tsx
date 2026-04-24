import React from 'react';

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Heart-Pumping Cardio',
    description: 'Burn 400-600 calories per hour while having the time of your life. Salsa is a full-body workout that never feels like exercise.',
    stat: '500+',
    statLabel: 'Calories/Hour',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Sharper Mind',
    description: 'Learning dance patterns boosts memory, coordination, and cognitive function. Studies show dancing reduces dementia risk by 76%.',
    stat: '76%',
    statLabel: 'Less Dementia Risk',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Stress Destroyer',
    description: 'Music + movement + community = the ultimate stress relief. Leave your worries at the door and dance them away.',
    stat: '85%',
    statLabel: 'Feel Less Stressed',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Amazing Community',
    description: 'Join a vibrant family of dancers from all walks of life. Make lifelong friends and connections on and off the dance floor.',
    stat: '1,500+',
    statLabel: 'Happy Dancers',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Confidence Boost',
    description: 'Watch your confidence soar as you master new moves. The dance floor becomes your stage, and life becomes your performance.',
    stat: '100%',
    statLabel: 'More Confident',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: 'Pure Joy & Fun',
    description: 'Life is too short not to dance! Experience the pure joy of moving to Latin rhythms. Every class ends with smiles and laughter.',
    stat: 'Infinite',
    statLabel: 'Fun Guaranteed',
    color: 'from-pink-500 to-red-500',
  },
];

const Benefits: React.FC = () => {
  const scrollToBooking = () => {
    const el = document.getElementById('book-trial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Why Dance?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Dancing</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Salsa transforms your body, sharpens your mind, and fills your soul with joy. Here's what happens when you start dancing.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{benefit.description}</p>
              <div className="pt-4 border-t border-gray-100">
                <span className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${benefit.color}`}>
                  {benefit.stat}
                </span>
                <span className="text-gray-400 text-sm ml-2">{benefit.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-red-600/20"
          >
            Start Your Transformation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
