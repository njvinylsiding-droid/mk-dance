import React from 'react';
import { useNavigate } from 'react-router-dom';

import CommunityHero from '@/components/community/CommunityHero';
import EventsCalendar from '@/components/community/EventsCalendar';
import StudentSpotlights from '@/components/community/StudentSpotlights';
import PracticePartnerFinder from '@/components/community/PracticePartnerFinder';
import PhotoGallery from '@/components/community/PhotoGallery';
import EventAdminPanel from '@/components/community/EventAdminPanel';

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <CommunityNav />

      {/* Hero */}
      <CommunityHero />

      {/* Quick Nav Strip */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {[
              { label: 'Events', id: 'events-calendar' },
              { label: 'Spotlights', id: 'student-spotlights' },
              { label: 'Partners', id: 'partner-finder' },
              { label: 'Gallery', id: 'photo-gallery' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <EventsCalendar />

      {/* Full-Width Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776003731681_f6084047.jpg"
          alt="Dance workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-amber-900/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
              Dance is the Hidden Language of the Soul
            </h3>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
              Join our community and discover the rhythm within you.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-all hover:scale-105"
            >
              Start Dancing Today
            </button>
          </div>
        </div>
      </div>

      <StudentSpotlights />
      <PracticePartnerFinder />
      <PhotoGallery />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Join the Family?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a complete beginner or an experienced dancer, there's a place for you at MK Dance Studio. 
            Book your free trial class and experience the magic of the Ironbound.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-red-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all hover:scale-105 shadow-xl"
            >
              Book Free Trial Class
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <CommunityFooter />

      {/* Admin Panel */}
      <EventAdminPanel />
    </div>
  );
};

/* Community-specific Navbar */
const CommunityNav: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-lg">MK</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl tracking-tight">MK Dance Studio</span>
              <span className="block text-amber-400 text-[10px] uppercase tracking-[0.3em] -mt-1">Community Hub</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            <button onClick={() => navigate('/')} className="text-white/80 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </button>
            {[
              { label: 'Events', id: 'events-calendar' },
              { label: 'Spotlights', id: 'student-spotlights' },
              { label: 'Partners', id: 'partner-finder' },
              { label: 'Gallery', id: 'photo-gallery' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-white/80 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-amber-400 transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => navigate('/pricing')}
              className="text-white/80 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate('/')}
              className="ml-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105"
            >
              Free Trial Class
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          <button onClick={() => { setIsOpen(false); navigate('/'); }} className="block w-full text-left text-white/80 hover:text-amber-400 hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors">
            Home
          </button>
          {[
            { label: 'Events', id: 'events-calendar' },
            { label: 'Spotlights', id: 'student-spotlights' },
            { label: 'Partners', id: 'partner-finder' },
            { label: 'Gallery', id: 'photo-gallery' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left text-white/80 hover:text-amber-400 hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setIsOpen(false); navigate('/'); }}
            className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-bold"
          >
            Free Trial Class
          </button>
        </div>
      </div>
    </nav>
  );
};

/* Community Footer */
const CommunityFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">MK</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">MK Dance Studio</span>
                <span className="block text-amber-400 text-[9px] uppercase tracking-[0.2em]">Newark's Ironbound</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Newark's premier Latin dance studio and community hub. More than classes — we're a family.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'TikTok'].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  title={social}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    {i === 0 && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z" />}
                    {i === 1 && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                    {i === 2 && <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-3">
              {[
                { label: 'Events Calendar', action: () => document.getElementById('events-calendar')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Student Spotlights', action: () => document.getElementById('student-spotlights')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Find a Partner', action: () => document.getElementById('partner-finder')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Photo Gallery', action: () => document.getElementById('photo-gallery')?.scrollIntoView({ behavior: 'smooth' }) },
              ].map((link, i) => (
                <li key={i}>
                  <button onClick={link.action} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Studio</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', action: () => navigate('/') },
                { label: 'Pricing', action: () => navigate('/pricing') },
                { label: 'Class Schedule', action: () => navigate('/') },
                { label: 'Our Instructors', action: () => navigate('/') },
              ].map((link, i) => (
                <li key={i}>
                  <button onClick={link.action} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                86 Monroe Street, 3rd Floor<br />Newark, NJ 07105
              </li>
              <li>
                <a href="tel:+12019235803" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">(201) 923-5803</a>
              </li>
              <li>
                <a href="mailto:manuel_23@live.com" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">manuel_23@live.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} MK Dance Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</button>
              <button className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommunityPage;
