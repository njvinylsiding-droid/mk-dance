import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface Goal {
  id: string;
  title: string;
  description: string;
  target_date: string;
  category: string;
  status: string;
  progress: number;
}

interface GoalsTrackerProps {
  goals: Goal[];
  studentId: string;
  onRefresh: () => void;
}

const CATEGORIES = [
  { value: 'salsa', label: 'Salsa', color: 'bg-red-500/20 text-red-400' },
  { value: 'bachata', label: 'Bachata', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'merengue', label: 'Merengue', color: 'bg-amber-500/20 text-amber-400' },
  { value: 'general', label: 'General', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'performance', label: 'Performance', color: 'bg-pink-500/20 text-pink-400' },
  { value: 'social', label: 'Social', color: 'bg-green-500/20 text-green-400' },
];

const GoalsTracker: React.FC<GoalsTrackerProps> = ({ goals, studentId, onRefresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', target_date: '', category: 'general' });

  const getCategoryStyle = (cat: string) => {
    return CATEGORIES.find(c => c.value === cat)?.color || 'bg-gray-500/20 text-gray-400';
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORIES.find(c => c.value === cat)?.label || cat;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: 'Please enter a goal title', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await supabase.functions.invoke('student-portal', {
        body: { action: 'add_goal', student_id: studentId, ...form },
      });
      toast({ title: 'Goal added!', description: 'Stay focused and keep dancing!' });
      setForm({ title: '', description: '', target_date: '', category: 'general' });
      setShowForm(false);
      onRefresh();
    } catch {
      toast({ title: 'Error adding goal', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const updateGoalStatus = async (goalId: string, status: string, progress: number) => {
    try {
      await supabase.functions.invoke('student-portal', {
        body: { action: 'update_goal', goal_id: goalId, status, progress },
      });
      toast({ title: status === 'completed' ? 'Goal completed!' : 'Goal updated' });
      onRefresh();
    } catch {
      toast({ title: 'Error updating goal', variant: 'destructive' });
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      await supabase.functions.invoke('student-portal', {
        body: { action: 'delete_goal', goal_id: goalId },
      });
      toast({ title: 'Goal removed' });
      onRefresh();
    } catch {
      toast({ title: 'Error deleting goal', variant: 'destructive' });
    }
  };

  const inProgress = goals.filter(g => g.status === 'in_progress');
  const completed = goals.filter(g => g.status === 'completed');

  const formatDate = (d: string) => {
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = (d: string) => {
    if (!d) return false;
    return new Date(d) < new Date();
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">My Goals</h3>
          <p className="text-gray-400 text-sm mt-1">{inProgress.length} active · {completed.length} completed</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
          </svg>
          {showForm ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="text-gray-300 text-sm font-medium mb-1 block">Goal Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Master the cross body lead"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-300 text-sm font-medium mb-1 block">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what you want to achieve..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm font-medium mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value} className="bg-gray-900">{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-300 text-sm font-medium mb-1 block">Target Date</label>
              <input
                type="date"
                value={form.target_date}
                onChange={e => setForm({ ...form, target_date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Add Goal'}
          </button>
        </form>
      )}

      {/* Active Goals */}
      <div className="space-y-3">
        {inProgress.length === 0 && !showForm && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400 text-sm">No active goals. Set one to stay motivated!</p>
          </div>
        )}
        {inProgress.map(goal => (
          <div key={goal.id} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">{goal.title}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryStyle(goal.category)}`}>
                    {getCategoryLabel(goal.category)}
                  </span>
                </div>
                {goal.description && <p className="text-gray-400 text-xs">{goal.description}</p>}
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => updateGoalStatus(goal.id, 'completed', 100)}
                  className="p-1.5 hover:bg-green-500/20 rounded-lg text-gray-400 hover:text-green-400 transition-colors"
                  title="Mark complete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <span className="text-gray-400 text-xs font-medium w-10 text-right">{goal.progress}%</span>
            </div>
            {goal.target_date && (
              <p className={`text-xs mt-2 ${isOverdue(goal.target_date) ? 'text-red-400' : 'text-gray-500'}`}>
                {isOverdue(goal.target_date) ? 'Overdue' : 'Target'}: {formatDate(goal.target_date)}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Completed Goals */}
      {completed.length > 0 && (
        <div className="mt-6">
          <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Completed</h4>
          <div className="space-y-2">
            {completed.map(goal => (
              <div key={goal.id} className="flex items-center gap-3 bg-white/[0.02] rounded-lg p-3 border border-white/5">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-400 text-sm line-through flex-1">{goal.title}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getCategoryStyle(goal.category)}`}>
                  {getCategoryLabel(goal.category)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsTracker;
