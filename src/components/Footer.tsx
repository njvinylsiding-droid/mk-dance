import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({ title: 'Please enter a valid email', variant: 'destructive' });
      return;
    }
    setSubscribed(true);
    toast({ title: 'Welcome to the MK family!', description: "You'll receive our latest updates and special offers." });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Stay in the Rhythm</h3>
              <p className="text-gray-400">Get class updates, events, and exclusive offers delivered to your inbox.</p>
            </div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">You're subscribed!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
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
              Newark's premier Latin dance studio. Teaching salsa, bachata, merengue, and more in the heart of the Ironbound.
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

          {/* Dance Styles */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Dance Styles</h4>
            <ul className="space-y-3">
              {['Salsa On2 (NY Style)', 'Bachata', 'Merengue', 'Cha Cha', 'Cumbia'].map((style, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo('styles')} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {style}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Class Schedule', id: 'schedule' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Our Instructors', id: 'instructors' },
                { label: 'Free Trial Class', id: 'book-trial' },
                { label: 'Free Downloads', id: 'downloads' },
                { label: 'FAQ', id: 'faq' },
              ].map((link, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo(link.id)} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => navigate('/dashboard')} className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors font-medium">
                  Student Portal
                </button>
              </li>
            </ul>
          </div>


          {/* Community */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-3">
              {[
                { label: 'Events Calendar', action: () => navigate('/community') },
                { label: 'Student Spotlights', action: () => navigate('/community') },
                { label: 'Find a Partner', action: () => navigate('/community') },
                { label: 'Photo Gallery', action: () => navigate('/community') },
                { label: 'Social Nights', action: () => navigate('/community') },
              ].map((link, i) => (
                <li key={i}>
                  <button onClick={link.action} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                86 Monroe Street, 3rd Floor
                <br />Newark, NJ 07105
              </li>
              <li>
                <a href="tel:+12019235803" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  (201) 923-5803
                </a>
              </li>
              <li>
                <a href="mailto:manuel_23@live.com" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                  manuel_23@live.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                Mon-Sat: 10am - 9pm
                <br />Sun: 10am - 5pm
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MK Dance Studio. All rights reserved.
            </p>
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

export default Footer;
