import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  address: string;
  image_url: string;
  instructor: string | null;
  capacity: number | null;
  spots_remaining: number | null;
  price: number;
  is_free: boolean;
  is_featured: boolean;
}

const emptyEvent = {
  title: '',
  description: '',
  event_type: 'social',
  date: '',
  start_time: '',
  end_time: '',
  location: 'MK Dance Studio',
  address: '86 Monroe St, 3rd Floor, Newark, NJ 07105',
  image_url: '',
  instructor: '',
  capacity: 50,
  spots_remaining: 50,
  price: 0,
  is_free: false,
  is_featured: false,
};

const EventAdminPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState(emptyEvent);
  const [saving, setSaving] = useState(false);

  const authenticate = () => {
    if (adminKey === 'mk-dance-admin-2026') {
      setAuthenticated(true);
      fetchEvents();
      toast({ title: 'Admin access granted' });
    } else {
      toast({ title: 'Invalid admin key', variant: 'destructive' });
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'list', table: 'community_events' },
      });
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.date || !form.start_time || !form.end_time) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingEvent?.id) {
        await supabase.functions.invoke('community-admin', {
          body: {
            action: 'update',
            table: 'community_events',
            id: editingEvent.id,
            data: form,
            adminKey: 'mk-dance-admin-2026',
          },
        });
        toast({ title: 'Event updated successfully!' });
      } else {
        await supabase.functions.invoke('community-admin', {
          body: {
            action: 'create',
            table: 'community_events',
            data: form,
            adminKey: 'mk-dance-admin-2026',
          },
        });
        toast({ title: 'Event created successfully!' });
      }
      fetchEvents();
      setEditingEvent(null);
      setIsCreating(false);
      setForm(emptyEvent);
    } catch (err) {
      toast({ title: 'Error saving event', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await supabase.functions.invoke('community-admin', {
        body: {
          action: 'delete',
          table: 'community_events',
          id,
          adminKey: 'mk-dance-admin-2026',
        },
      });
      toast({ title: 'Event deleted' });
      fetchEvents();
    } catch (err) {
      toast({ title: 'Error deleting event', variant: 'destructive' });
    }
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description || '',
      event_type: event.event_type,
      date: event.date,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location || 'MK Dance Studio',
      address: event.address || '86 Monroe St, 3rd Floor, Newark, NJ 07105',
      image_url: event.image_url || '',
      instructor: event.instructor || '',
      capacity: event.capacity || 50,
      spots_remaining: event.spots_remaining || 50,
      price: event.price || 0,
      is_free: event.is_free || false,
      is_featured: event.is_featured || false,
    });
    setIsCreating(true);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
          title="Admin Panel"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Event Admin Panel</h2>
            <p className="text-gray-400 text-sm">Manage community events, workshops, and socials</p>
          </div>
          <button
            onClick={() => { setIsOpen(false); setAuthenticated(false); setAdminKey(''); }}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {!authenticated ? (
            /* Auth */
            <div className="max-w-sm mx-auto py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Access Required</h3>
              <p className="text-gray-500 text-sm mb-6">Enter the admin key to manage events.</p>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && authenticate()}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                placeholder="Enter admin key"
              />
              <button
                onClick={authenticate}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition-all"
              >
                Authenticate
              </button>
            </div>
          ) : isCreating ? (
            /* Create/Edit Form */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingEvent?.id ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button
                  onClick={() => { setIsCreating(false); setEditingEvent(null); setForm(emptyEvent); }}
                  className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      value={form.event_type}
                      onChange={(e) => setForm((p) => ({ ...p, event_type: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    >
                      <option value="social">Social Night</option>
                      <option value="workshop">Workshop</option>
                      <option value="community">Community Event</option>
                      <option value="competition">Competition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 h-20 resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                    <input
                      type="time"
                      value={form.start_time}
                      onChange={(e) => setForm((p) => ({ ...p, start_time: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                    <input
                      type="time"
                      value={form.end_time}
                      onChange={(e) => setForm((p) => ({ ...p, end_time: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                    <input
                      type="text"
                      value={form.instructor}
                      onChange={(e) => setForm((p) => ({ ...p, instructor: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm((p) => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      value={form.capacity}
                      onChange={(e) => setForm((p) => ({ ...p, capacity: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Spots Remaining</label>
                    <input
                      type="number"
                      value={form.spots_remaining}
                      onChange={(e) => setForm((p) => ({ ...p, spots_remaining: parseInt(e.target.value) || 0 }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_free}
                      onChange={(e) => setForm((p) => ({ ...p, is_free: e.target.checked }))}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Free Event</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) => setForm((p) => ({ ...p, is_featured: e.target.checked }))}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">Featured</span>
                  </label>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingEvent?.id ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </div>
          ) : (
            /* Event List */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">{events.length} Events</h3>
                <button
                  onClick={() => { setIsCreating(true); setForm(emptyEvent); }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Event
                </button>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      {event.image_url && (
                        <img src={event.image_url} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{event.title}</h4>
                        <p className="text-gray-400 text-sm">
                          {event.date} · {event.event_type} · {event.is_free ? 'Free' : `$${event.price}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => startEdit(event)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventAdminPanel;
