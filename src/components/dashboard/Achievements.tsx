import React, { useState } from 'react';

interface Achievement {
  id: string;
  badge_id: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  badge_color: string;
  earned_at: string;
}

interface AchievementsProps {
  achievements: Achievement[];
  totalClasses: number;
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  footprints: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  trophy: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8m-4-4v4m-4.5-9.5L6 4h12l-1.5 7.5M6 4H4l1 6m14-6h2l-1 6M9 11.5a3 3 0 006 0" />
    </svg>
  ),
  graduation: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  compass: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l3 3m0 0l3 3m-3-3l3-3m-3 3l-3 3" />
    </svg>
  ),
  users: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  flame: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

const COLOR_CLASSES: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  green: { bg: 'bg-green-500/15', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/20' },
  blue: { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  red: { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-400', glow: 'shadow-red-500/20' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  pink: { bg: 'bg-pink-500/15', border: 'border-pink-500/30', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
  orange: { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
};

// Locked badges the student hasn't earned yet
const ALL_BADGES = [
  { badge_id: 'first_class', badge_name: 'First Steps', badge_description: 'Attend your first class', badge_icon: 'footprints', badge_color: 'green' },
  { badge_id: 'ten_classes', badge_name: 'Dedicated Dancer', badge_description: 'Complete 10 classes', badge_icon: 'star', badge_color: 'blue' },
  { badge_id: 'twenty_five_classes', badge_name: 'Quarter Century', badge_description: 'Complete 25 classes', badge_icon: 'trophy', badge_color: 'amber' },
  { badge_id: 'fifty_classes', badge_name: 'Half Century', badge_description: 'Complete 50 classes', badge_icon: 'trophy', badge_color: 'red' },
  { badge_id: 'hundred_classes', badge_name: 'Centurion', badge_description: 'Complete 100 classes', badge_icon: 'star', badge_color: 'purple' },
  { badge_id: 'salsa_beginner', badge_name: 'Salsa Beginner Graduate', badge_description: 'Complete all beginner salsa classes', badge_icon: 'graduation', badge_color: 'red' },
  { badge_id: 'bachata_beginner', badge_name: 'Bachata Beginner Graduate', badge_description: 'Complete all beginner bachata classes', badge_icon: 'graduation', badge_color: 'blue' },
  { badge_id: 'multi_style', badge_name: 'Multi-Style Explorer', badge_description: 'Try 3+ dance styles', badge_icon: 'compass', badge_color: 'purple' },
  { badge_id: 'social_butterfly', badge_name: 'Social Butterfly', badge_description: 'Attend a social dance night', badge_icon: 'users', badge_color: 'pink' },
  { badge_id: 'streak_4', badge_name: '4-Week Streak', badge_description: 'Attend 4 weeks in a row', badge_icon: 'flame', badge_color: 'orange' },
  { badge_id: 'streak_8', badge_name: '8-Week Streak', badge_description: 'Attend 8 weeks in a row', badge_icon: 'flame', badge_color: 'red' },
  { badge_id: 'welcome', badge_name: 'Welcome to MK!', badge_description: 'Created your account', badge_icon: 'sparkles', badge_color: 'amber' },
];

const Achievements: React.FC<AchievementsProps> = ({ achievements, totalClasses }) => {
  const [showAll, setShowAll] = useState(false);
  const earnedIds = new Set(achievements.map(a => a.badge_id));

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const displayBadges = showAll ? ALL_BADGES : ALL_BADGES.filter(b => earnedIds.has(b.badge_id));

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Achievements</h3>
          <p className="text-gray-400 text-sm mt-1">{achievements.length} of {ALL_BADGES.length} badges earned</p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {showAll ? 'Show Earned' : 'Show All'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all"
            style={{ width: `${(achievements.length / ALL_BADGES.length) * 100}%` }}
          />
        </div>
        <p className="text-gray-500 text-xs mt-1">{Math.round((achievements.length / ALL_BADGES.length) * 100)}% complete</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayBadges.map(badge => {
          const earned = earnedIds.has(badge.badge_id);
          const earnedData = achievements.find(a => a.badge_id === badge.badge_id);
          const colors = COLOR_CLASSES[badge.badge_color] || COLOR_CLASSES.amber;

          return (
            <div
              key={badge.badge_id}
              className={`relative rounded-xl p-4 text-center transition-all ${
                earned
                  ? `${colors.bg} border ${colors.border} hover:shadow-lg ${colors.glow}`
                  : 'bg-white/[0.02] border border-white/5 opacity-40'
              }`}
            >
              <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-2 ${
                earned ? `${colors.bg} ${colors.text}` : 'bg-white/5 text-gray-600'
              }`}>
                {BADGE_ICONS[badge.badge_icon] || BADGE_ICONS.star}
              </div>
              <p className={`font-semibold text-xs ${earned ? 'text-white' : 'text-gray-500'}`}>{badge.badge_name}</p>
              <p className="text-gray-500 text-[10px] mt-0.5">{badge.badge_description}</p>
              {earned && earnedData && (
                <p className={`text-[10px] mt-1 ${colors.text}`}>{formatDate(earnedData.earned_at)}</p>
              )}
              {!earned && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
