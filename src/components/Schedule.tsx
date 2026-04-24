import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface StudioClass {
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
  booking_date: string;
  current_bookings: number;
  spots_left: number;
}

interface StudentBooking {
  class_id: string;
  booking_date: string;
  id: string;
  confirmation_code: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatWeekRange(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${monday.toLocaleDateString('en-US', opts)} - ${sunday.toLocaleDateString('en-US', opts)}, ${sunday.getFullYear()}`;
}

const Schedule: React.FC = () => {
  const { student, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return days.includes(today) ? today : 'Monday';
  });
  const [weekOffset, setWeekOffset] = useState(0);
  const [classes, setClasses] = useState<StudioClass[]>([]);
  const [studentBookings, setStudentBookings] = useState<StudentBooking[]>([]);
  const [weekDates, setWeekDates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ class: StudioClass; action: 'book' | 'cancel'; bookingId?: string } | null>(null);
  const [successModal, setSuccessModal] = useState<{ message: string; code?: string } | null>(null);

  const currentMonday = getMonday(new Date());
  currentMonday.setDate(currentMonday.getDate() + weekOffset * 7);
  const weekStart = currentMonday.toISOString().split('T')[0];

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'get_schedule', week_start: weekStart },
      });
      if (!error && data) {
        setClasses(data.classes || []);
        setWeekDates(data.week_dates || {});
      }
    } catch (err) {
      console.error('Failed to fetch schedule:', err);
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  const fetchStudentBookings = useCallback(async () => {
    if (!student?.id || !weekDates || Object.keys(weekDates).length === 0) return;
    try {
      const { data, error } = await supabase.functions.invoke('student-portal', {
        body: { action: 'check_student_bookings', student_id: student.id, week_dates: Object.values(weekDates) },
      });
      if (!error && data) {
        setStudentBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch student bookings:', err);
    }
  }, [student?.id, weekDates]);

  useEffect(() => { fetchSchedule(); }, [fetchSchedule]);
  useEffect(() => { fetchStudentBookings(); }, [fetchStudentBookings]);

  const handleBook = async (cls: StudioClass) => {
    if (!isAuthenticated) {
      navigate('/dashboard');
      return;
    }
    setConfirmModal({ class: cls, action: 'book' });
  };

  const handleCancel = (cls: StudioClass) => {
    const booking = studentBookings.find(b => b.class_id === cls.id && b.booking_date === cls.booking_date);
    if (booking) {
      setConfirmModal({ class: cls, action: 'cancel', bookingId: booking.id });
    }
  };

  const confirmAction = async () => {
    if (!confirmModal || !student?.id) return;
    const cls = confirmModal.class;
    setBookingInProgress(cls.id);
    setConfirmModal(null);

    try {
      if (confirmModal.action === 'book') {
        const { data, error } = await supabase.functions.invoke('student-portal', {
          body: { action: 'book_class', student_id: student.id, class_id: cls.id, booking_date: cls.booking_date },
        });
        if (error || data?.error) {
          setSuccessModal({ message: data?.error || 'Failed to book. Please try again.' });
        } else {
          setSuccessModal({ message: data.message, code: data.booking?.confirmation_code });
          await fetchSchedule();
          await fetchStudentBookings();
        }
      } else {
        const { data, error } = await supabase.functions.invoke('student-portal', {
          body: { action: 'cancel_booking', booking_id: confirmModal.bookingId, student_id: student.id },
        });
        if (error || data?.error) {
          setSuccessModal({ message: data?.error || 'Failed to cancel. Please try again.' });
        } else {
          setSuccessModal({ message: 'Booking cancelled successfully. The spot has been freed up.' });
          await fetchSchedule();
          await fetchStudentBookings();
        }
      }
    } catch {
      setSuccessModal({ message: 'Something went wrong. Please try again.' });
    } finally {
      setBookingInProgress(null);
    }
  };

  const dayClasses = classes.filter(c => c.day_of_week === activeDay);
  const isBooked = (classId: string, date: string) => studentBookings.some(b => b.class_id === classId && b.booking_date === date);

  const getCapacityColor = (current: number, max: number) => {
    const pct = current / max;
    if (pct >= 1) return 'text-red-500 bg-red-50';
    if (pct >= 0.8) return 'text-amber-600 bg-amber-50';
    if (pct >= 0.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  const getCapacityBarColor = (current: number, max: number) => {
    const pct = current / max;
    if (pct >= 1) return 'bg-red-500';
    if (pct >= 0.8) return 'bg-amber-500';
    if (pct >= 0.5) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const isThisWeek = weekOffset === 0;
  const isPastWeek = weekOffset < 0;

  return (
    <section id="schedule" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-red-600 font-bold text-sm uppercase tracking-[0.2em] mb-3">Class Schedule & Booking</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Perfect Class</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Reserve your spot in upcoming classes with one click. Real-time availability so you never miss out.
          </p>
        </div>

        {/* Week Navigator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setWeekOffset(w => w - 1)}
            disabled={isPastWeek}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center min-w-[260px]">
            <div className="flex items-center justify-center gap-2">
              {isThisWeek && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded-full">This Week</span>
              )}
              <span className="text-gray-900 font-bold text-lg">{formatWeekRange(currentMonday)}</span>
            </div>
          </div>
          <button
            onClick={() => setWeekOffset(w => w + 1)}
            disabled={weekOffset >= 3}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="ml-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Today
            </button>
          )}
        </div>

        {/* Auth Banner */}
        {!isAuthenticated && (
          <div className="mb-8 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold">Sign in to book classes instantly</p>
                <p className="text-white/80 text-sm">Create a free student account to reserve your spot with one click</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 bg-white text-red-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              Sign In / Sign Up
            </button>
          </div>
        )}

        {/* Day Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {days.map(day => {
            const dateStr = weekDates[day];
            const dayDate = dateStr ? formatDate(dateStr) : '';
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all flex flex-col items-center gap-0.5 ${
                  activeDay === day
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                {dayDate && <span className={`text-[10px] font-medium ${activeDay === day ? 'text-white/70' : 'text-gray-400'}`}>{dayDate}</span>}
              </button>
            );
          })}
        </div>

        {/* Schedule Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Loading schedule...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {dayClasses.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 font-medium">No classes scheduled for {activeDay}</p>
                <p className="text-gray-400 text-sm mt-1">Check other days or contact us for private lessons</p>
              </div>
            ) : (
              dayClasses.map((cls) => {
                const booked = isBooked(cls.id, cls.booking_date);
                const isFull = cls.spots_left <= 0;
                const isPrivate = cls.class_type === 'Private';
                const isBooking = bookingInProgress === cls.id;
                const capacityPct = cls.max_capacity > 0 ? (cls.current_bookings / cls.max_capacity) * 100 : 0;

                return (
                  <div
                    key={cls.id}
                    className={`rounded-2xl border transition-all ${
                      booked
                        ? 'border-emerald-200 bg-emerald-50/50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Time & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                booked ? 'bg-emerald-500' : isFull ? 'bg-red-400' : 'bg-red-500'
                              }`} />
                              <span className="font-black text-gray-900 text-lg">{cls.start_time}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{cls.class_name}</h3>
                            {booked && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                Booked
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {cls.instructor}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {cls.duration_minutes} min
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                              cls.class_type === 'Private' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {cls.class_type}
                            </span>
                            {cls.level && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {cls.level}
                              </span>
                            )}
                            {cls.dance_style && cls.dance_style !== 'Various' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                                {cls.dance_style}
                              </span>
                            )}
                          </div>

                          {cls.description && (
                            <p className="text-gray-400 text-sm mt-2 line-clamp-1">{cls.description}</p>
                          )}
                        </div>

                        {/* Capacity & Book Button */}
                        <div className="flex items-center gap-4 lg:flex-shrink-0">
                          {!isPrivate && (
                            <div className="min-w-[120px]">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getCapacityColor(cls.current_bookings, cls.max_capacity)}`}>
                                  {cls.current_bookings}/{cls.max_capacity} spots
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${getCapacityBarColor(cls.current_bookings, cls.max_capacity)}`}
                                  style={{ width: `${Math.min(capacityPct, 100)}%` }}
                                />
                              </div>
                              {cls.spots_left > 0 && cls.spots_left <= 3 && (
                                <p className="text-amber-600 text-[10px] font-bold mt-1 flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                  </svg>
                                  Only {cls.spots_left} left!
                                </p>
                              )}
                            </div>
                          )}

                          {isPrivate ? (
                            <a
                              href="/#book-trial"
                              className="px-5 py-2.5 bg-amber-100 text-amber-700 rounded-xl font-bold text-sm hover:bg-amber-200 transition-colors"
                            >
                              Contact Us
                            </a>
                          ) : booked ? (
                            <button
                              onClick={() => handleCancel(cls)}
                              disabled={isBooking}
                              className="px-5 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 min-w-[110px]"
                            >
                              {isBooking ? (
                                <svg className="animate-spin w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                              ) : 'Cancel'}
                            </button>
                          ) : isFull ? (
                            <span className="px-5 py-2.5 bg-gray-100 text-gray-400 rounded-xl font-bold text-sm cursor-not-allowed min-w-[110px] text-center">
                              Class Full
                            </span>
                          ) : (
                            <button
                              onClick={() => handleBook(cls)}
                              disabled={isBooking || isPastWeek}
                              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 min-w-[110px]"
                            >
                              {isBooking ? (
                                <svg className="animate-spin w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                              ) : 'Book Now'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Filling Up</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Almost Full</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Full</span>
          </div>
        </div>

        {/* Private Lessons Note */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-amber-50 border border-amber-200 rounded-xl">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-amber-800 text-sm">
            <strong>Private lessons</strong> are available by appointment throughout the week. Contact us to schedule your preferred time with any of our instructors.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setConfirmModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              confirmModal.action === 'book' ? 'bg-red-100' : 'bg-amber-100'
            }`}>
              {confirmModal.action === 'book' ? (
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              {confirmModal.action === 'book' ? 'Confirm Booking' : 'Cancel Booking'}
            </h3>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="font-bold text-gray-900">{confirmModal.class.class_name}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                <span>{confirmModal.class.day_of_week}, {formatDate(confirmModal.class.booking_date)}</span>
                <span>{confirmModal.class.start_time}</span>
                <span>{confirmModal.class.instructor}</span>
              </div>
            </div>

            {confirmModal.action === 'book' ? (
              <p className="text-gray-500 text-sm text-center mb-6">
                You're about to reserve a spot in this class. You can cancel anytime before the class starts.
              </p>
            ) : (
              <p className="text-gray-500 text-sm text-center mb-6">
                Are you sure you want to cancel this booking? Your spot will be released for other students.
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm text-white transition-all ${
                  confirmModal.action === 'book'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/20'
                    : 'bg-amber-500 hover:bg-amber-600'
                }`}
              >
                {confirmModal.action === 'book' ? 'Confirm Booking' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSuccessModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              successModal.code ? 'bg-emerald-100' : 'bg-gray-100'
            }`}>
              {successModal.code ? (
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <p className="text-gray-700 font-medium mb-2">{successModal.message}</p>

            {successModal.code && (
              <div className="bg-gray-50 rounded-xl p-3 mb-4 inline-block">
                <p className="text-xs text-gray-400 mb-1">Confirmation Code</p>
                <p className="text-lg font-mono font-bold text-gray-900 tracking-wider">{successModal.code}</p>
              </div>
            )}

            <button
              onClick={() => setSuccessModal(null)}
              className="w-full mt-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Schedule;
