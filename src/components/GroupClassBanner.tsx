import React from 'react';

const GroupClassBanner: React.FC = () => {
  const scrollToBooking = () => {
    const el = document.getElementById('book-trial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[350px] md:h-[450px] overflow-hidden">
      <img
        src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001389814_327490e7.png"
        alt="Group salsa dance class at MK Dance Studio"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Join the Movement.
              <br />
              <span className="text-amber-400">Join the Family.</span>
            </h2>
            <p className="text-white/70 text-lg mb-6">
              Every class is a celebration. Every student becomes family. Experience the joy of Latin dance with people who share your passion.
            </p>
            <button
              onClick={scrollToBooking}
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-xl"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupClassBanner;
