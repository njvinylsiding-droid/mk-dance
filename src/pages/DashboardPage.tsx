import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import OverviewCards from '@/components/dashboard/OverviewCards';
import ProgressChart from '@/components/dashboard/ProgressChart';
import SkillLevels from '@/components/dashboard/SkillLevels';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import Achievements from '@/components/dashboard/Achievements';
import UpcomingBookings from '@/components/dashboard/UpcomingBookings';

const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69db9951f88cdb9f96178167_1776004545222_23946df6.jpg';

// Login/Signup Component
const AuthForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', first_name: '', last_name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await login(form.email, form.password);
        if (result.error) {
          toast({ title: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Welcome back!' });
          onSuccess();
        }
      } else {
        if (!form.first_name || !form.last_name) {
          toast({ title: 'Please fill in all required fields', variant: 'destructive' });
          setLoading(false);
          return;
        }
        if (form.password.length < 6) {
          toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
          setLoading(false);
          return;
        }
        const result = await signup(form);
        if (result.error) {
          toast({ title: result.error, variant: 'destructive' });
        } else {
          toast({ title: 'Account created!', description: 'Welcome to MK Dance Studio!' });
          onSuccess();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/90 to-gray-950" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">MK</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Student Portal</h1>
          <p className="text-gray-400">Track your dance journey, set goals, and earn badges</p>
        </div>

        {/* Demo credentials */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
          <p className="text-amber-400 text-sm font-medium mb-1">Demo Account</p>
          <p className="text-amber-300/70 text-xs">Email: <span className="font-mono">maria@example.com</span> · Password: <span className="font-mono">demo123</span></p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          {/* Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === 'login' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === 'signup' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 text-xs font-medium mb-1 block">First Name *</label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={e => setForm({ ...form, first_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Maria"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-xs font-medium mb-1 block">Last Name *</label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={e => setForm({ ...form, last_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Santos"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-gray-300 text-xs font-medium mb-1 block">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-gray-300 text-xs font-medium mb-1 block">Password *</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter password'}
                required
              />
            </div>
            {mode === 'signup' && (
              <div>
                <label className="text-gray-300 text-xs font-medium mb-1 block">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="(201) 923-5803"
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-red-900/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            Back to MK Dance Studio
          </a>
        </div>
      </div>
    </div>
  );
};

// Attendance History Component (inline to save files)
const AttendanceHistory: React.FC<{ records: any[] }> = ({ records }) => {
  const [filter, setFilter] = useState('all');
  const styles = ['all', ...new Set(records.map(r => r.dance_style))];
  const filtered = filter === 'all' ? records : records.filter(r => r.dance_style === filter);

  const styleColor = (s: string) => {
    const map: Record<string, string> = {
      'Salsa On2': 'bg-red-500/20 text-red-400',
      'Bachata': 'bg-purple-500/20 text-purple-400',
      'Merengue': 'bg-amber-500/20 text-amber-400',
      'Cha Cha': 'bg-emerald-500/20 text-emerald-400',
      'Cumbia': 'bg-blue-500/20 text-blue-400',
    };
    return map[s] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Attendance History</h3>
          <p className="text-gray-400 text-sm mt-1">{records.length} classes attended</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {styles.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === s ? 'bg-white/15 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No classes found</p>
        ) : (
          filtered.map((record, i) => (
            <div key={record.id || i} className="flex items-center gap-4 bg-white/[0.03] rounded-xl p-3 hover:bg-white/[0.06] transition-all">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {new Date(record.class_date + 'T00:00:00').getDate()}
                </span>
                <span className="text-gray-500 text-[10px] uppercase">
                  {new Date(record.class_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{record.class_name}</p>
                <p className="text-gray-500 text-xs">
                  {record.class_time} · {record.instructor} · {record.duration_minutes}min
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex-shrink-0 ${styleColor(record.dance_style)}`}>
                {record.dance_style}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Recommendations Component (inline)
const Recommendations: React.FC<{ recommendations: any[] }> = ({ recommendations }) => {
  const navigate = useNavigate();
  const typeIcons: Record<string, React.ReactNode> = {
    continue: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    try_new: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    frequency: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    level_up: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    social: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };

  const priorityColors: Record<string, string> = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-amber-500/30 bg-amber-500/5',
    low: 'border-blue-500/30 bg-blue-500/5',
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Recommended For You</h3>
          <p className="text-gray-400 text-sm mt-1">Personalized based on your progress</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 border transition-all hover:scale-[1.02] cursor-pointer ${priorityColors[rec.priority] || priorityColors.medium}`}
            onClick={() => navigate('/pricing')}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                {typeIcons[rec.type] || typeIcons.continue}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">{rec.title}</h4>
                  {rec.priority === 'high' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 uppercase">Priority</span>
                  )}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Page
const DashboardPage: React.FC = () => {
  const { student, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [dashData, setDashData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchDashboard = useCallback(async () => {
    if (!student?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'get_dashboard', student_id: student.id },
      });
      if (!error && data) {
        setDashData(data);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [student?.id]);

  useEffect(() => {
    if (isAuthenticated && student?.id) {
      fetchDashboard();
    }
  }, [isAuthenticated, student?.id, fetchDashboard]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm onSuccess={() => {}} />;
  }

  // Calculate stats
  const attendance = dashData?.attendance || [];
  const skills = dashData?.skills || [];
  const goals = dashData?.goals || [];
  const achievements = dashData?.achievements || [];
  const progress = dashData?.progress || [];
  const recommendations = dashData?.recommendations || [];

  const topSkill = skills.length > 0 ? skills[0] : { dance_style: 'None', skill_level: 0 };
  const completedGoals = goals.filter((g: any) => g.status === 'completed').length;

  // Calculate streak
  const calcStreak = () => {
    if (attendance.length === 0) return 0;
    const weeks = new Set<number>();
    attendance.forEach((a: any) => {
      const d = new Date(a.class_date + 'T00:00:00');
      const weekNum = Math.floor(d.getTime() / (7 * 24 * 60 * 60 * 1000));
      weeks.add(weekNum);
    });
    const sorted = [...weeks].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i - 1] - sorted[i] === 1) streak++;
      else break;
    }
    return streak;
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'progress', label: 'Progress', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'skills', label: 'Skills', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
    { id: 'attendance', label: 'Attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'goals', label: 'Goals', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: 'achievements', label: 'Badges', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { id: 'recommendations', label: 'For You', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];


  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">MK</span>
                </div>
                <span className="hidden sm:block text-white font-bold">Student Portal</span>
              </button>
              <div className="hidden md:flex items-center gap-1 ml-4">
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeSection === s.id
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-white text-sm font-medium">{student?.first_name} {student?.last_name}</p>
                <p className="text-gray-500 text-xs capitalize">{student?.level} dancer</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {student?.first_name?.[0]}{student?.last_name?.[0]}
              </div>
              <button
                onClick={async () => { await logout(); navigate('/'); }}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                title="Sign Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-400 hover:text-white p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-md px-4 py-3">
            <div className="grid grid-cols-4 gap-2">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSection(s.id); setMobileMenuOpen(false); }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium transition-all ${
                    activeSection === s.id ? 'bg-white/10 text-white' : 'text-gray-500'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                  </svg>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading your data...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Welcome Banner */}
            {activeSection === 'overview' && (
              <>
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={HERO_IMG} alt="" className="w-full h-48 sm:h-56 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center px-8">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
                        Welcome back, {student?.first_name}!
                      </h1>
                      <p className="text-gray-300 text-sm sm:text-base max-w-lg">
                        You've attended <span className="text-amber-400 font-bold">{student?.total_classes_attended || attendance.length}</span> classes since joining.
                        Keep up the amazing work on your dance journey!
                      </p>
                    </div>
                  </div>
                </div>

                <OverviewCards
                  totalClasses={student?.total_classes_attended || attendance.length}
                  currentStreak={calcStreak()}
                  topStyle={topSkill.dance_style}
                  topLevel={topSkill.skill_level}
                  goalsCompleted={completedGoals}
                  totalGoals={goals.length}
                  badgesEarned={achievements.length}
                  memberSince={student?.member_since || '2025-01-01'}
                />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProgressChart data={progress} />
                  <SkillLevels skills={skills} />
                </div>

                <UpcomingBookings studentId={student?.id || ''} />

                <Recommendations recommendations={recommendations} />
              </>
            )}



            {activeSection === 'bookings' && (
              <UpcomingBookings studentId={student?.id || ''} />
            )}
            {activeSection === 'progress' && <ProgressChart data={progress} />}
            {activeSection === 'skills' && <SkillLevels skills={skills} />}
            {activeSection === 'attendance' && <AttendanceHistory records={attendance} />}
            {activeSection === 'goals' && (
              <GoalsTracker goals={goals} studentId={student?.id || ''} onRefresh={fetchDashboard} />
            )}
            {activeSection === 'achievements' && (
              <Achievements achievements={achievements} totalClasses={student?.total_classes_attended || attendance.length} />
            )}
            {activeSection === 'recommendations' && <Recommendations recommendations={recommendations} />}

          </div>
        )}
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default DashboardPage;
