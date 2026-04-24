import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

// ============ Types ============
interface AdminUser { email: string; name: string; role: string; }
interface Skill { id: string; dance_style: string; skill_level: number; classes_completed: number; current_rank: string; }
interface Student { id: string; first_name: string; last_name: string; email: string; phone?: string; level: string; member_since: string; total_classes_attended: number; skills: Skill[]; attendance_count: number; last_class: string | null; }
interface StudioClass { id: string; class_name: string; dance_style: string; instructor: string; day_of_week: string; start_time: string; duration_minutes: number; max_capacity: number; class_type?: string; level?: string; description?: string; is_active: boolean; }
interface Announcement { id: string; title: string; body: string; audience: string; sent_by: string; created_at: string; }

const ADMIN_TOKEN_KEY = 'mk_admin_token';
const DANCE_STYLES = ['Salsa On2', 'Bachata', 'Merengue', 'Cha Cha', 'Cumbia', 'Ladies Styling', 'Zumba'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ============ Admin Login ============
const AdminLogin: React.FC<{ onLogin: (admin: AdminUser, token: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { data, error: err } = await supabase.functions.invoke('admin-panel', {
      body: { action: 'admin_login', email, password },
    });
    setLoading(false);
    if (err || data?.error) { setError(data?.error || 'Login failed'); return; }
    localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
    onLogin(data.admin, data.token);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button onClick={() => navigate('/')} className="text-white/60 hover:text-white text-sm mb-6 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to site
        </button>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-amber-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Admin Panel</h1>
              <p className="text-amber-400 text-xs uppercase tracking-widest">MK Dance Studio</p>
            </div>
          </div>
          <p className="text-white/60 text-sm mb-6">Instructor access only. Staff credentials required.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-1 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="manuel@mkdance.com"/>
            </div>
            <div>
              <label className="text-white/80 text-sm mb-1 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-900/60 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400" placeholder="••••••••"/>
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-3 py-2">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-white/40 text-xs mb-2">Demo instructor accounts (password: admin123):</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['manuel', 'claribel', 'lizette', 'angel'].map(n => (
                <button key={n} type="button" onClick={() => { setEmail(`${n}@mkdance.com`); setPassword('admin123'); }} className="bg-white/5 hover:bg-white/10 text-white/80 py-1.5 rounded text-left px-2 capitalize">
                  {n}@mkdance.com
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ Overview Panel ============
const OverviewPanel: React.FC<{ data: any; onRefresh: () => void }> = ({ data }) => {
  if (!data) return <div className="text-white/60">Loading overview...</div>;
  const { stats, revenue_breakdown } = data;
  const cards = [
    { label: 'Total Students', value: stats.total_students, color: 'from-blue-500 to-cyan-500', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Classes This Week', value: stats.attendance_this_week, color: 'from-emerald-500 to-teal-500', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Total Revenue', value: `$${stats.total_revenue.toLocaleString()}`, color: 'from-amber-500 to-orange-500', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
    { label: 'Upcoming Bookings', value: stats.upcoming_bookings, color: 'from-purple-500 to-pink-500', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/70 hover:shadow-md transition">
            <div className={`w-10 h-10 bg-gradient-to-br ${c.color} rounded-xl flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon}/></svg>
            </div>
            <div className="text-2xl font-black text-slate-900">{c.value}</div>
            <div className="text-slate-500 text-sm">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200/70">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Breakdown by Package</h3>
        <div className="space-y-3">
          {Object.entries(revenue_breakdown || {}).map(([pkg, v]: any) => {
            const total = stats.total_revenue || 1;
            const pct = Math.round((v.revenue / total) * 100);
            return (
              <div key={pkg}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate-700 capitalize">{pkg.replace('_', ' ')} Package</span>
                  <span className="text-slate-600">{v.count} sold · <b className="text-emerald-600">${v.revenue.toLocaleString()}</b></span>
                </div>
                <div className="bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }}/>
                </div>
              </div>
            );
          })}
          {Object.keys(revenue_breakdown || {}).length === 0 && <p className="text-slate-500 text-sm">No revenue data yet.</p>}
        </div>
      </div>
    </div>
  );
};

// ============ Student Roster ============
const StudentRoster: React.FC<{ token: string; onLog: (s: Student) => void }> = ({ token, onLog }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.functions.invoke('admin-panel', { body: { action: 'get_roster', token } });
    setStudents(data?.students || []);
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return !q || s.first_name.toLowerCase().includes(q) || s.last_name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Student Roster</h3>
          <p className="text-sm text-slate-500">{filtered.length} student{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="flex-1 sm:w-72 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"/>
          <button onClick={load} className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700">Refresh</button>
        </div>
      </div>
      {loading ? <div className="p-8 text-center text-slate-500">Loading students...</div> : filtered.length === 0 ? (
        <div className="p-8 text-center text-slate-500">No students found.</div>
      ) : (
        <div className="divide-y divide-slate-100">
          {filtered.map(s => (
            <div key={s.id}>
              <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {s.first_name[0]}{s.last_name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{s.first_name} {s.last_name}</div>
                  <div className="text-xs text-slate-500 truncate">{s.email} · {s.attendance_count} classes · {s.last_class ? `Last: ${new Date(s.last_class).toLocaleDateString()}` : 'No classes yet'}</div>
                </div>
                <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700">
                  {expanded === s.id ? 'Hide' : 'Skills'}
                </button>
                <button onClick={() => onLog(s)} className="text-xs px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full font-semibold">
                  Log Class
                </button>
              </div>
              {expanded === s.id && (
                <div className="px-4 pb-4 pl-20 bg-slate-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {s.skills.length === 0 ? <div className="text-sm text-slate-500">No skills tracked yet.</div> :
                      s.skills.map(sk => (
                        <div key={sk.id} className="bg-white border border-slate-200 rounded-lg p-2.5">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-800">{sk.dance_style}</span>
                            <span className="text-slate-500">{sk.current_rank} · {sk.classes_completed} classes</span>
                          </div>
                          <div className="bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full" style={{ width: `${sk.skill_level}%` }}/>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============ Attendance Logger Modal ============
const AttendanceLogger: React.FC<{ student: Student | null; token: string; onClose: () => void; onSaved: () => void }> = ({ student, token, onClose, onSaved }) => {
  const [style, setStyle] = useState('Salsa On2');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [className, setClassName] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  if (!student) return null;

  const save = async () => {
    setSaving(true);
    const { data } = await supabase.functions.invoke('admin-panel', {
      body: { action: 'log_attendance', token, student_id: student.id, dance_style: style, class_date: date, class_name: className || `${style} Class`, notes }
    });
    setSaving(false);
    if (data?.error) { toast({ title: 'Error', description: data.error, variant: 'destructive' }); return; }
    toast({ title: 'Attendance logged!', description: `${student.first_name} +3% ${style} skill. Checking achievements...` });
    onSaved(); onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">
            {student.first_name[0]}{student.last_name[0]}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Log Class for {student.first_name}</h3>
            <p className="text-xs text-slate-500">Auto-updates skills & achievements</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Dance Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500">
              {DANCE_STYLES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Class Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Class Name (optional)</label>
            <input value={className} onChange={e => setClassName(e.target.value)} placeholder={`${style} Class`} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="e.g. Great progress on cross-body lead" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"/>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg text-sm font-semibold text-slate-700">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-bold">
            {saving ? 'Saving...' : 'Log Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ Schedule Manager ============
const ScheduleManager: React.FC<{ token: string }> = ({ token }) => {
  const [classes, setClasses] = useState<StudioClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<StudioClass | null>(null);
  const [showNew, setShowNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.functions.invoke('admin-panel', { body: { action: 'get_schedule_admin', token } });
    setClasses(data?.classes || []);
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const cancel = async (id: string) => {
    if (!confirm('Cancel this class? Students will no longer see it.')) return;
    await supabase.functions.invoke('admin-panel', { body: { action: 'cancel_class', token, class_id: id } });
    toast({ title: 'Class cancelled' });
    load();
  };

  const reactivate = async (id: string) => {
    await supabase.functions.invoke('admin-panel', { body: { action: 'reactivate_class', token, class_id: id } });
    toast({ title: 'Class reactivated' });
    load();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Class Schedule</h3>
          <p className="text-sm text-slate-500">{classes.filter(c => c.is_active).length} active · {classes.filter(c => !c.is_active).length} inactive</p>
        </div>
        <button onClick={() => setShowNew(true)} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">+ Add Class</button>
      </div>
      {loading ? <div className="p-8 text-center text-slate-500">Loading...</div> : (
        <div className="divide-y divide-slate-100">
          {classes.map(c => (
            <div key={c.id} className={`p-4 flex flex-wrap gap-3 items-center justify-between ${!c.is_active ? 'opacity-60 bg-slate-50' : ''}`}>
              <div className="flex-1 min-w-[200px]">
                <div className="font-semibold text-slate-900 flex items-center gap-2">
                  {c.class_name}
                  {!c.is_active && <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase font-bold">Cancelled</span>}
                </div>
                <div className="text-xs text-slate-500">{c.day_of_week} · {c.start_time} · {c.duration_minutes}min · {c.instructor} · Cap {c.max_capacity}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditing(c)} className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-semibold">Edit</button>
                {c.is_active ? (
                  <button onClick={() => cancel(c.id)} className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-full font-semibold">Cancel</button>
                ) : (
                  <button onClick={() => reactivate(c.id)} className="text-xs px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full font-semibold">Reactivate</button>
                )}
              </div>
            </div>
          ))}
          {classes.length === 0 && <div className="p-8 text-center text-slate-500">No classes yet.</div>}
        </div>
      )}
      {(editing || showNew) && (
        <ClassEditor
          cls={editing}
          token={token}
          onClose={() => { setEditing(null); setShowNew(false); }}
          onSaved={() => { setEditing(null); setShowNew(false); load(); }}
        />
      )}
    </div>
  );
};

const ClassEditor: React.FC<{ cls: StudioClass | null; token: string; onClose: () => void; onSaved: () => void }> = ({ cls, token, onClose, onSaved }) => {
  const [form, setForm] = useState({
    class_name: cls?.class_name || '',
    dance_style: cls?.dance_style || 'Salsa On2',
    instructor: cls?.instructor || 'Manuel',
    day_of_week: cls?.day_of_week || 'Monday',
    start_time: cls?.start_time || '19:00',
    duration_minutes: cls?.duration_minutes || 60,
    max_capacity: cls?.max_capacity || 15,
    class_type: cls?.class_type || 'group',
    level: cls?.level || 'All Levels',
    description: cls?.description || ''
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.class_name) { toast({ title: 'Class name required', variant: 'destructive' }); return; }
    setSaving(true);
    const body = cls
      ? { action: 'update_class', token, class_id: cls.id, updates: form }
      : { action: 'create_class', token, class_data: form };
    const { data } = await supabase.functions.invoke('admin-panel', { body });
    setSaving(false);
    if (data?.error) { toast({ title: 'Error', description: data.error, variant: 'destructive' }); return; }
    toast({ title: cls ? 'Class updated' : 'Class created' });
    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-slate-900 mb-4">{cls ? 'Edit Class' : 'Add New Class'}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Class Name</label>
            <input value={form.class_name} onChange={e => setForm({ ...form, class_name: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500" placeholder="Beginner Salsa"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Dance Style</label>
            <select value={form.dance_style} onChange={e => setForm({ ...form, dance_style: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              {DANCE_STYLES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Instructor</label>
            <select value={form.instructor} onChange={e => setForm({ ...form, instructor: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              {['Manuel', 'Claribel', 'Lizette', 'Angel'].map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Day</label>
            <select value={form.day_of_week} onChange={e => setForm({ ...form, day_of_week: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              {DAYS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Start Time</label>
            <input type="time" value={form.start_time} onChange={e => setForm({ ...form, start_time: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Duration (min)</label>
            <input type="number" value={form.duration_minutes} onChange={e => setForm({ ...form, duration_minutes: Number(e.target.value) })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Max Capacity</label>
            <input type="number" value={form.max_capacity} onChange={e => setForm({ ...form, max_capacity: Number(e.target.value) })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Level</label>
            <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Type</label>
            <select value={form.class_type} onChange={e => setForm({ ...form, class_type: e.target.value })} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
              {['group', 'private', 'workshop', 'social'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-700 mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"/>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg text-sm font-semibold text-slate-700">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-bold">
            {saving ? 'Saving...' : (cls ? 'Update' : 'Create')}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ Announcements Panel ============
const AnnouncementsPanel: React.FC<{ token: string }> = ({ token }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.functions.invoke('admin-panel', { body: { action: 'get_announcements', token } });
    setAnnouncements(data?.announcements || []);
    setLoading(false);
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const send = async () => {
    if (!title.trim() || !body.trim()) { toast({ title: 'Title and message required', variant: 'destructive' }); return; }
    setSending(true);
    const { data } = await supabase.functions.invoke('admin-panel', {
      body: { action: 'send_announcement', token, title, body, audience }
    });
    setSending(false);
    if (data?.error) { toast({ title: 'Error', description: data.error, variant: 'destructive' }); return; }
    toast({ title: 'Announcement sent!', description: data.message });
    setTitle(''); setBody('');
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await supabase.functions.invoke('admin-panel', { body: { action: 'delete_announcement', token, id } });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/70 p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Send Announcement to Students</h3>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Studio closed Thanksgiving)" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"/>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} placeholder="Message to all students..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"/>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <select value={audience} onChange={e => setAudience(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Students</option>
              <option value="beginners">Beginner Students</option>
              <option value="advanced">Advanced Students</option>
            </select>
            <button onClick={send} disabled={sending} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-bold">
              {sending ? 'Sending...' : 'Send Announcement'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Recent Announcements</h3>
        </div>
        {loading ? <div className="p-8 text-center text-slate-500">Loading...</div> : announcements.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No announcements yet. Send your first one above!</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {announcements.map(a => (
              <div key={a.id} className="p-4 flex gap-3 items-start">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900">{a.title}</div>
                  <div className="text-sm text-slate-600 mt-0.5 whitespace-pre-wrap">{a.body}</div>
                  <div className="text-xs text-slate-400 mt-1.5">
                    Sent by {a.sent_by} · {new Date(a.created_at).toLocaleString()} · Audience: {a.audience}
                  </div>
                </div>
                <button onClick={() => del(a.id)} className="text-xs text-red-600 hover:text-red-800 px-2 py-1">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============ Main Admin Page ============
type Tab = 'overview' | 'roster' | 'schedule' | 'announcements';

const AdminPage: React.FC = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [overview, setOverview] = useState<any>(null);
  const [logStudent, setLogStudent] = useState<Student | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (!t) { setLoadingSession(false); return; }
    supabase.functions.invoke('admin-panel', { body: { action: 'admin_verify', token: t } }).then(({ data }) => {
      if (data?.admin) { setAdmin(data.admin); setToken(t); }
      else localStorage.removeItem(ADMIN_TOKEN_KEY);
      setLoadingSession(false);
    });
  }, []);

  const loadOverview = useCallback(async () => {
    if (!token) return;
    const { data } = await supabase.functions.invoke('admin-panel', { body: { action: 'get_overview', token } });
    setOverview(data);
  }, [token]);

  useEffect(() => { if (token && tab === 'overview') loadOverview(); }, [token, tab, loadOverview]);

  const logout = async () => {
    if (token) await supabase.functions.invoke('admin-panel', { body: { action: 'admin_logout', token } });
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdmin(null); setToken(null);
  };

  if (loadingSession) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  if (!admin || !token) return <AdminLogin onLogin={(a, t) => { setAdmin(a); setToken(t); }}/>;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'roster', label: 'Student Roster', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857' },
    { id: 'schedule', label: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'announcements', label: 'Announcements', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-slate-900 text-white shadow-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-500 rounded-lg flex items-center justify-center font-black">MK</button>
            <div>
              <div className="font-bold">Admin Panel</div>
              <div className="text-xs text-amber-400 uppercase tracking-widest">MK Dance Studio</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold">{admin.name}</div>
              <div className="text-xs text-white/50">{admin.role}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center font-bold">{admin.name[0]}</div>
            <button onClick={logout} className="text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-lg">Sign Out</button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-1 border-t border-white/5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${tab === t.id ? 'border-amber-400 text-amber-400' : 'border-transparent text-white/60 hover:text-white'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon}/></svg>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {tab === 'overview' && <OverviewPanel data={overview} onRefresh={loadOverview}/>}
        {tab === 'roster' && <StudentRoster token={token} onLog={setLogStudent}/>}
        {tab === 'schedule' && <ScheduleManager token={token}/>}
        {tab === 'announcements' && <AnnouncementsPanel token={token}/>}
      </div>

      <AttendanceLogger
        student={logStudent}
        token={token}
        onClose={() => setLogStudent(null)}
        onSaved={loadOverview}
      />
    </div>
  );
};

export default AdminPage;
