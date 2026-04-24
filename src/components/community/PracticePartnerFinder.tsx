import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  dance_level: string;
  preferred_styles: string[];
  availability: string;
  bio: string;
  looking_for: string;
  created_at: string;
}

const danceStyles = ['Salsa On2', 'Bachata', 'Merengue', 'Cha Cha', 'Cumbia'];
const levels = ['beginner', 'intermediate', 'advanced'];
const roles = ['lead', 'follow', 'either'];

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
};

const PracticePartnerFinder: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dance_level: 'beginner',
    preferred_styles: [] as string[],
    availability: '',
    bio: '',
    looking_for: 'either',
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'list', table: 'practice_partners' },
      });
      if (error) throw error;
      setPartners(data || []);
    } catch (err) {
      console.error('Error fetching partners:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStyle = (style: string) => {
    setForm((prev) => ({
      ...prev,
      preferred_styles: prev.preferred_styles.includes(style)
        ? prev.preferred_styles.filter((s) => s !== style)
        : [...prev.preferred_styles, style],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.dance_level) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    if (form.preferred_styles.length === 0) {
      toast({ title: 'Please select at least one dance style', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'create', table: 'practice_partners', data: form },
      });
      if (error) throw error;
      toast({
        title: 'Profile Created!',
        description: "You're now visible to other dancers looking for practice partners.",
      });
      setShowForm(false);
      setPartners((prev) => [data, ...prev]);
      setForm({
        name: '',
        email: '',
        phone: '',
        dance_level: 'beginner',
        preferred_styles: [],
        availability: '',
        bio: '',
        looking_for: 'either',
      });
    } catch (err) {
      toast({ title: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPartners = partners.filter((p) => {
    if (filterLevel !== 'all' && p.dance_level !== filterLevel) return false;
    if (filterStyle !== 'all' && !p.preferred_styles?.includes(filterStyle)) return false;
    return true;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const gradients = [
    'from-red-500 to-pink-500',
    'from-amber-500 to-orange-500',
    'from-blue-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-violet-500',
    'from-teal-500 to-cyan-500',
  ];

  return (
    <section id="partner-finder" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-bold text-sm uppercase tracking-wider">Connect & Practice</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
            Find a Practice Partner
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            The fastest way to improve is to practice. Connect with fellow MK dancers who share your style and level.
          </p>
        </div>

        {/* CTA to join */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Close Form' : 'Create Your Profile'}
          </button>
          <span className="text-gray-400 text-sm">{partners.length} dancers looking for partners</span>
        </div>

        {/* Sign Up Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Create Your Partner Profile</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="(201) 555-0123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dance Level *</label>
                  <select
                    value={form.dance_level}
                    onChange={(e) => setForm((p) => ({ ...p, dance_level: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    {levels.map((l) => (
                      <option key={l} value={l}>
                        {l.charAt(0).toUpperCase() + l.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Dance Styles *</label>
                <div className="flex flex-wrap gap-2">
                  {danceStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleStyle(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        form.preferred_styles.includes(style)
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">I'm looking to dance as</label>
                <div className="flex gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, looking_for: role }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                        form.looking_for === role
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  value={form.availability}
                  onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="e.g., Weekday evenings, Saturday mornings"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-24 resize-none"
                  placeholder="Tell potential partners a bit about yourself and what you're looking for..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-xl shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating Profile...' : 'Create Partner Profile'}
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm font-medium text-gray-500">Filter by:</span>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Styles</option>
            {danceStyles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-400 ml-auto">{filteredPartners.length} dancers found</span>
        </div>

        {/* Partners Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No partners found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or be the first to create a profile!</p>
            <button
              onClick={() => { setFilterLevel('all'); setFilterStyle('all'); }}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, i) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-bold text-lg">{getInitials(partner.name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-lg truncate">{partner.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${levelColors[partner.dance_level] || 'bg-gray-100 text-gray-700'}`}>
                        {partner.dance_level}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">
                        {partner.looking_for === 'either' ? 'Lead/Follow' : partner.looking_for}
                      </span>
                    </div>
                  </div>
                </div>

                {partner.bio && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{partner.bio}</p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {partner.preferred_styles?.map((style) => (
                    <span key={style} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                      {style}
                    </span>
                  ))}
                </div>

                {partner.availability && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {partner.availability}
                  </div>
                )}

                <button
                  onClick={() => {
                    window.location.href = `mailto:${partner.email}?subject=Practice Partner Request from MK Dance Studio&body=Hi ${partner.name}, I found your profile on the MK Dance Studio community page and would love to practice together!`;
                  }}
                  className="w-full bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticePartnerFinder;
