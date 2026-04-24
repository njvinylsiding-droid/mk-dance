import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, student } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Dance Styles', id: 'styles' },
    { label: 'Instructors', id: 'instructors' },
    { label: 'Schedule', id: 'schedule' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Community', id: 'community', isPage: true, route: '/community' },
    { label: 'Free Guides', id: 'downloads' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (link: { id: string; isPage?: boolean; route?: string }) => {
    if (link.isPage && link.route) {
      navigate(link.route);
    } else {
      scrollTo(link.id);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-lg">MK</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl tracking-tight">MK Dance Studio</span>
              <span className="block text-amber-400 text-[10px] uppercase tracking-[0.3em] -mt-1">Newark's Ironbound</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                  link.isPage 
                    ? 'text-amber-400 hover:text-amber-300' 
                    : 'text-white/80 hover:text-amber-400'
                }`}
              >
                {link.label}
                {link.isPage && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-amber-400 transition-all duration-300" />
              </button>
            ))}
            {/* Dashboard / Login Button */}
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="ml-3 flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-[10px] font-bold">
                  {student?.first_name?.[0]}{student?.last_name?.[0]}
                </div>
                My Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="ml-3 flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium transition-all border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Student Portal
              </button>
            )}
            <button
              onClick={() => scrollTo('book-trial')}
              className="ml-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-105"
            >
              Free Trial Class
            </button>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={`block w-full text-left hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                link.isPage 
                  ? 'text-amber-400 hover:text-amber-300' 
                  : 'text-white/80 hover:text-amber-400'
              }`}
            >
              {link.label}
              {link.isPage && (
                <span className="ml-2 text-[10px] bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full">NEW</span>
              )}
            </button>
          ))}
          {/* Mobile Dashboard Link */}
          <button
            onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
            className="block w-full text-left hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isAuthenticated ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-[8px] font-bold text-white">
                  {student?.first_name?.[0]}{student?.last_name?.[0]}
                </div>
                My Dashboard
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Student Portal
              </span>
            )}
          </button>
          <button
            onClick={() => scrollTo('book-trial')}
            className="w-full mt-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full text-sm font-bold"
          >
            Free Trial Class
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

