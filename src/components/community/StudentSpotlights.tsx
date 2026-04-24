import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Spotlight {
  id: string;
  name: string;
  photo_url: string;
  dance_style: string;
  months_dancing: number;
  story: string;
  quote: string;
  is_featured: boolean;
}

const StudentSpotlights: React.FC = () => {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchSpotlights();
  }, []);

  const fetchSpotlights = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('community-admin', {
        body: { action: 'list', table: 'student_spotlights' },
      });
      if (error) throw error;
      setSpotlights(data || []);
    } catch (err) {
      console.error('Error fetching spotlights:', err);
    } finally {
      setLoading(false);
    }
  };

  const featured = spotlights.filter((s) => s.is_featured);
  const others = spotlights.filter((s) => !s.is_featured);
  const activeSpotlight = featured[activeIndex] || spotlights[0];

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!spotlights.length) return null;

  return (
    <section id="student-spotlights" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-red-600 font-bold text-sm uppercase tracking-wider">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
            Student Spotlights
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Real stories from real students. See how MK Dance Studio has transformed lives through the power of dance.
          </p>
        </div>

        {/* Featured Spotlight */}
        {activeSpotlight && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 mb-12">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-80 lg:h-auto">
                <img
                  src={activeSpotlight.photo_url}
                  alt={activeSpotlight.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
                <div className="absolute bottom-4 left-4 lg:hidden">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured Student
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="hidden lg:inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  Featured Student
                </span>
                <h3 className="text-3xl font-black text-gray-900 mb-2">{activeSpotlight.name}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-gray-400 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {activeSpotlight.dance_style}
                  </span>
                  <span className="text-sm text-gray-400">
                    {activeSpotlight.months_dancing} months dancing
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{activeSpotlight.story}</p>

                {activeSpotlight.quote && (
                  <blockquote className="relative bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 border border-red-100">
                    <svg className="absolute top-3 left-4 w-8 h-8 text-red-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 italic font-medium pl-8 text-lg leading-relaxed">
                      "{activeSpotlight.quote}"
                    </p>
                  </blockquote>
                )}

                {/* Navigation dots for featured */}
                {featured.length > 1 && (
                  <div className="flex items-center gap-3 mt-8">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`transition-all duration-300 ${
                          i === activeIndex
                            ? 'w-8 h-3 bg-red-600 rounded-full'
                            : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other Spotlights Grid */}
        {others.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {others.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-56">
                  <img
                    src={student.photo_url}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <h4 className="text-white font-bold text-lg">{student.name}</h4>
                    <p className="text-white/70 text-sm">{student.dance_style} · {student.months_dancing}mo</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">{student.story}</p>
                  {student.quote && (
                    <p className="text-gray-500 text-sm italic border-l-2 border-red-300 pl-3">
                      "{student.quote.substring(0, 80)}..."
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentSpotlights;
