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

const typeColors: Record<string, { bg: string; text: string; dot: string }> = {
  social: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  workshop: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  competition: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  community: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
};

const EventsCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'list', table: 'community_events' },
      });
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(
    (e) => filterType === 'all' || e.event_type === filterType
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter((e) => e.date === dateStr);
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const handleRSVP = (event: Event) => {
    toast({
      title: 'RSVP Confirmed!',
      description: `You're registered for ${event.title}. We'll send you a reminder!`,
    });
    setSelectedEvent(null);
  };

  return (
    <section id="events-calendar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-bold text-sm uppercase tracking-wider">What's Happening</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
            Events & Social Nights
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From Friday night socials to intensive workshops — there's always something happening at MK.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Events' },
              { key: 'social', label: 'Social Nights' },
              { key: 'workshop', label: 'Workshops' },
              { key: 'community', label: 'Community' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === f.key
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              <svg className="w-4 h-4 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          /* List View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const colors = typeColors[event.event_type] || typeColors.social;
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`group bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                    event.is_featured ? 'border-amber-400 shadow-lg' : 'border-gray-100 shadow-md'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {event.is_featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-full capitalize`}>
                        {event.event_type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTime(event.start_time)}
                        </span>
                        {event.instructor && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {event.instructor}
                          </span>
                        )}
                      </div>
                      <span className={`font-bold text-sm ${event.is_free ? 'text-green-600' : 'text-gray-900'}`}>
                        {event.is_free ? 'FREE' : `$${event.price}`}
                      </span>
                    </div>

                    {event.spots_remaining !== null && event.capacity !== null && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{event.spots_remaining} spots left</span>
                          <span>{Math.round(((event.capacity - event.spots_remaining) / event.capacity) * 100)}% full</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              event.spots_remaining < 10 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{
                              width: `${((event.capacity - event.spots_remaining) / event.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Calendar View */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Month Navigation */}
            <div className="flex items-center justify-between p-6 bg-gray-50 border-b border-gray-200">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[100px] p-2 border-b border-r border-gray-100 bg-gray-50/50" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const today = new Date();
                const isToday =
                  day === today.getDate() &&
                  currentMonth.getMonth() === today.getMonth() &&
                  currentMonth.getFullYear() === today.getFullYear();

                return (
                  <div
                    key={day}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-100 transition-colors ${
                      dayEvents.length > 0 ? 'bg-red-50/30 hover:bg-red-50/60' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${
                        isToday
                          ? 'bg-red-600 text-white'
                          : dayEvents.length > 0
                          ? 'text-gray-900 font-bold'
                          : 'text-gray-400'
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((ev) => {
                        const colors = typeColors[ev.event_type] || typeColors.social;
                        return (
                          <button
                            key={ev.id}
                            onClick={() => setSelectedEvent(ev)}
                            className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium truncate ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
                          >
                            {ev.title}
                          </button>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <span className="text-[10px] text-gray-400 pl-1">+{dayEvents.length - 2} more</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-64">
                <img src={selectedEvent.image_url} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${typeColors[selectedEvent.event_type]?.bg || 'bg-gray-100'} ${typeColors[selectedEvent.event_type]?.text || 'text-gray-700'} text-xs font-bold px-3 py-1 rounded-full capitalize`}>
                      {selectedEvent.event_type}
                    </span>
                    {selectedEvent.is_free && (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-white">{selectedEvent.title}</h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">{selectedEvent.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Date
                    </div>
                    <p className="font-bold text-gray-900">{formatDate(selectedEvent.date)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Time
                    </div>
                    <p className="font-bold text-gray-900">
                      {formatTime(selectedEvent.start_time)} - {formatTime(selectedEvent.end_time)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location
                    </div>
                    <p className="font-bold text-gray-900">{selectedEvent.location}</p>
                    <p className="text-gray-400 text-xs">{selectedEvent.address}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Price
                    </div>
                    <p className="font-bold text-gray-900">
                      {selectedEvent.is_free ? 'Free!' : `$${selectedEvent.price}`}
                    </p>
                  </div>
                </div>

                {selectedEvent.instructor && (
                  <div className="flex items-center gap-3 mb-6 bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-medium">Led by</p>
                      <p className="font-bold text-gray-900">{selectedEvent.instructor}</p>
                    </div>
                  </div>
                )}

                {selectedEvent.spots_remaining !== null && selectedEvent.capacity !== null && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">{selectedEvent.spots_remaining} of {selectedEvent.capacity} spots remaining</span>
                      <span className={`font-bold ${selectedEvent.spots_remaining < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedEvent.spots_remaining < 10 ? 'Almost Full!' : 'Available'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${selectedEvent.spots_remaining < 10 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${((selectedEvent.capacity - selectedEvent.spots_remaining) / selectedEvent.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleRSVP(selectedEvent)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] shadow-xl shadow-red-600/20"
                >
                  {selectedEvent.is_free ? 'RSVP — Free Event' : `Register — $${selectedEvent.price}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsCalendar;
