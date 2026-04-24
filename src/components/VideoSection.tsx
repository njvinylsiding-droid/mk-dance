import React, { useState } from 'react';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">A Message From Manuel</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              "Dancing Changed
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">My Life.</span>
              <br />
              Let It Change Yours."
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              When Claribel and I started MK Dance Studio, we had one mission: bring the joy of Latin dance to everyone in our community. 
              The Ironbound has always been the heartbeat of Latin culture in New Jersey, and we wanted to create a space where anyone — 
              regardless of age, background, or experience — could discover the magic of salsa.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Today, with Lizette and Angel by our side, we've built more than a dance school. We've built a family. 
              And we'd love for you to be part of it.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001358257_adc89e44.png"
                alt="Manuel - MK Dance Studio founder"
                className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
              />
              <div>
                <p className="font-bold text-gray-900">Manuel</p>
                <p className="text-gray-400 text-sm">Co-Founder, MK Dance Studio</p>
              </div>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-900 group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
              {!isPlaying ? (
                <>
                  <img
                    src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001435209_0616c3fa.png"
                    alt="MK Dance Studio community"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-3">
                      <p className="text-white text-sm font-medium">Welcome to MK Dance Studio</p>
                      <p className="text-white/60 text-xs">Watch Manuel's introduction — 2:30</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-white font-bold text-lg mb-2">Video Coming Soon</p>
                    <p className="text-gray-400 text-sm mb-4">Manuel's welcome video is being produced.</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-2xl -z-10 opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl -z-10 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
