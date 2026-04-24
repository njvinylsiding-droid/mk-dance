import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const FreeDownloads: React.FC = () => {
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [submitted1, setSubmitted1] = useState(false);
  const [submitted2, setSubmitted2] = useState(false);

  const handleSubmit = (which: 1 | 2, email: string) => {
    if (!email || !email.includes('@')) {
      toast({ title: 'Please enter a valid email address', variant: 'destructive' });
      return;
    }
    if (which === 1) {
      setSubmitted1(true);
      toast({ title: 'Check your inbox!', description: 'The 15 Salsa Dance Secret Playbook is on its way.' });
    } else {
      setSubmitted2(true);
      toast({ title: 'Challenge accepted!', description: 'The 5-Day Salsa Challenge starts now. Check your email!' });
    }
  };

  return (
    <section id="downloads" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-400 font-bold text-sm uppercase tracking-[0.2em] mb-3">Free Resources</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Start Dancing <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Today</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Download our free guides and start your salsa journey right now — no dance experience required.
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Playbook */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/30 transition-all group">
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001337237_48c68949.jpg"
                alt="15 Salsa Dance Secret Playbook"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">FREE DOWNLOAD</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-white mb-2">The 15 Salsa Dance Secret Playbook</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Unlock the insider secrets that professional salsa dancers use to look effortless on the dance floor. 
                From footwork fundamentals to partner connection — this playbook covers it all.
              </p>
              <ul className="space-y-2 mb-6">
                {['15 proven techniques from pro dancers', 'Step-by-step visual guides', 'Common mistakes to avoid', 'Practice routines included'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {!submitted1 ? (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email1}
                    onChange={e => setEmail1(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit(1, email1)}
                  />
                  <button
                    onClick={() => handleSubmit(1, email1)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 whitespace-nowrap"
                  >
                    Get It Free
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-300 font-medium text-sm">Sent! Check your inbox.</span>
                </div>
              )}
            </div>
          </div>

          {/* 5-Day Challenge */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all group">
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776001297136_e33e79b1.png"
                alt="5-Day 5-Minute Salsa Challenge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">FREE CHALLENGE</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-white mb-2">The 5-Day, 5-Minute Salsa Challenge</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Think you can't learn salsa? Give us just 5 minutes a day for 5 days. 
                Our bite-sized video lessons will have you moving to the rhythm before the week is over.
              </p>
              <ul className="space-y-2 mb-6">
                {['5 daily video lessons (5 min each)', 'Progressive skill building', 'Practice music playlists', 'Join 500+ challenge completers'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              {!submitted2 ? (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email2}
                    onChange={e => setEmail2(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit(2, email2)}
                  />
                  <button
                    onClick={() => handleSubmit(2, email2)}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 whitespace-nowrap"
                  >
                    Join Free
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-300 font-medium text-sm">You're in! Check your inbox for Day 1.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeDownloads;
