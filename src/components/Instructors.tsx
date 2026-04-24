import React from 'react';

const instructors = [
  {
    name: 'Manuel',
    role: 'Co-Founder & Lead Instructor',
    specialty: 'Salsa On2 · Bachata',
    bio: 'With over 15 years of dance experience, Manuel brings the authentic New York Salsa On2 style to Newark\'s Ironbound. His passion for teaching and infectious energy make every class unforgettable.',
    highlight: true,
  },
  {
    name: 'Claribel',
    role: 'Co-Founder & Lead Instructor',
    specialty: 'Salsa · Merengue · Bachata',
    bio: 'Claribel\'s graceful technique and warm teaching style have inspired hundreds of dancers. Together with Manuel, she built MK Dance Studio into the Ironbound\'s premier dance destination.',
    highlight: true,
  },
  {
    name: 'Lizette',
    role: 'Instructor',
    specialty: 'Bachata · Cha Cha · Cumbia',
    bio: 'Lizette\'s vibrant personality lights up every class. Her patient approach and attention to detail help students of all levels find their rhythm and confidence.',
    highlight: false,
  },
  {
    name: 'Angel',
    role: 'Instructor',
    specialty: 'Salsa On2 · Merengue · Cumbia',
    bio: 'Angel brings explosive energy and creative choreography to MK Dance Studio. His dynamic teaching style pushes students to reach new heights on the dance floor.',
    highlight: false,
  },
];

const Instructors: React.FC = () => {
  const scrollToBooking = () => {
    const el = document.getElementById('book-trial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="instructors" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Meet Your Teachers</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Magnificent</span> Team
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four passionate instructors dedicated to sharing the art of Latin dance with the Ironbound community and beyond.
          </p>
        </div>

        {/* Team Photo */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl relative group">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776000917104_5838cfca.jpg"
            alt="MK Dance Studio instructors - Manuel, Claribel, Lizette, and Angel"
            className="w-full h-[300px] md:h-[450px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Manuel, Claribel, Lizette & Angel</h3>
            <p className="text-amber-400 text-lg font-medium">Your dance family in the Ironbound</p>
          </div>
        </div>

        {/* Individual Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${instructor.highlight ? 'from-red-600 to-amber-500' : 'from-gray-600 to-gray-500'} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <span className="text-white font-black text-xl">{instructor.name[0]}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{instructor.name}</h3>
              <p className={`text-sm font-semibold mb-1 ${instructor.highlight ? 'text-amber-400' : 'text-gray-400'}`}>
                {instructor.role}
              </p>
              <p className="text-red-400 text-xs font-medium mb-4">{instructor.specialty}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{instructor.bio}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-xl"
          >
            Train With Our Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
