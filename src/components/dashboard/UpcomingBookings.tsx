import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  booking_date: string;
  status: string;
  confirmation_code: string;
  booked_at: string;
  class_id: string;
  current_bookings: number;
  studio_classes: {
    id: string;
    class_name: string;
    day_of_week: string;
    start_time: string;
    instructor: string;
    duration_minutes: number;
    class_type: string;
    max_capacity: number;
    dance_style: string;
    level: string;
    description: string;
  };
}

interface Props {
  studentId: string;
  onBookingChange?: () => void;
}

const UpcomingBookings: React.FC<Props> = ({ studentId, onBookingChange }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'get_my_bookings', student_id: studentId },
      });
      if (!error && data) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancel = async (booking: Booking) => {
    setCancellingId(booking.id);
    setConfirmCancel(null);
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'cancel_booking', booking_id: booking.id, student_id: studentId },
      });
      if (!error && !data?.error) {
        await fetchBookings();
        onBookingChange?.();
      }
    } catch (err) {
      console.error('Cancel error:', err);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + 'T00:00:00');
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `In ${diff} days`;
  };

  const getStyleColor = (style: string) => {
    const map: Record<string, string> = {
      'Salsa On2': 'from-red-500 to-rose-600',
      'Bachata': 'from-purple-500 to-violet-600',
      'Merengue': 'from-amber-500 to-orange-600',
      'Cha Cha': 'from-emerald-500 to-teal-600',
      'Cumbia': 'from-blue-500 to-indigo-600',
      'Various': 'from-pink-500 to-red-500',
    };
    return map[style] || 'from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Upcoming Bookings</h3>
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Upcoming Bookings</h3>
          <p className="text-gray-400 text-sm mt-1">
            {bookings.length === 0 ? 'No upcoming bookings' : `${bookings.length} class${bookings.length !== 1 ? 'es' : ''} booked`}
          </p>
        </div>
        <a
          href="/#schedule"
          className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Book More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.02] rounded-xl border border-white/5">
          <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-400 font-medium mb-2">No upcoming classes booked</p>
          <p className="text-gray-500 text-sm mb-4">Head to the schedule to reserve your spot</p>
          <a
            href="/#schedule"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-500 hover:to-red-600 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Browse Classes
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const cls = booking.studio_classes;
            if (!cls) return null;
            const daysUntil = getDaysUntil(booking.booking_date);
            const isToday = daysUntil === 'Today';
            const isTomorrow = daysUntil === 'Tomorrow';
            const isCancelling = cancellingId === booking.id;

            return (
              <div
                key={booking.id}
                className={`relative rounded-xl overflow-hidden transition-all ${
                  isToday ? 'ring-2 ring-red-500/30' : ''
                }`}
              >
                {/* Gradient accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getStyleColor(cls.dance_style)}`} />

                <div className="bg-white/[0.04] hover:bg-white/[0.06] transition-colors p-4 pl-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h4 className="text-white font-bold">{cls.class_name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isToday ? 'bg-red-500/20 text-red-400' :
                          isTomorrow ? 'bg-amber-500/20 text-amber-400' :
                          'bg-white/10 text-gray-400'
                        }`}>
                          {daysUntil}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(booking.booking_date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {cls.start_time} · {cls.duration_minutes}min
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {cls.instructor}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                          {booking.confirmation_code}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {booking.current_bookings}/{cls.max_capacity} enrolled
                        </span>
                        {cls.dance_style && cls.dance_style !== 'Various' && (
                          <span className="text-[10px] font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                            {cls.dance_style}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setConfirmCancel(booking)}
                      disabled={isCancelling}
                      className="flex-shrink-0 p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                      title="Cancel booking"
                    >
                      {isCancelling ? (
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {confirmCancel && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmCancel(null)}>
          <div className="bg-gray-900 rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h4 className="text-white font-bold text-center mb-2">Cancel Booking?</h4>
            <div className="bg-white/5 rounded-xl p-3 mb-4">
              <p className="text-white font-medium text-sm">{confirmCancel.studio_classes?.class_name}</p>
              <p className="text-gray-400 text-xs mt-1">
                {formatDate(confirmCancel.booking_date)} at {confirmCancel.studio_classes?.start_time}
              </p>
            </div>
            <p className="text-gray-400 text-sm text-center mb-5">
              Your spot will be released for other students.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmCancel(null)}
                className="flex-1 px-4 py-2.5 border border-white/10 rounded-xl text-gray-300 font-medium text-sm hover:bg-white/5 transition-colors"
              >
                Keep It
              </button>
              <button
                onClick={() => handleCancel(confirmCancel)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-sm transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingBookings;
