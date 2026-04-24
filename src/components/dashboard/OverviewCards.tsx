import React from 'react';

interface OverviewCardsProps {
  totalClasses: number;
  currentStreak: number;
  topStyle: string;
  topLevel: number;
  goalsCompleted: number;
  totalGoals: number;
  badgesEarned: number;
  memberSince: string;
}

const OverviewCards: React.FC<OverviewCardsProps> = ({
  totalClasses, currentStreak, topStyle, topLevel, goalsCompleted, totalGoals, badgesEarned, memberSince
}) => {
  const memberMonths = Math.max(1, Math.round((Date.now() - new Date(memberSince).getTime()) / (30 * 24 * 60 * 60 * 1000)));

  const cards = [
    {
      label: 'Total Classes',
      value: totalClasses,
      sub: `${(totalClasses / memberMonths).toFixed(1)} per month`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-red-500 to-red-700',
      bgGlow: 'bg-red-500/10',
    },
    {
      label: 'Week Streak',
      value: `${currentStreak}`,
      sub: currentStreak >= 4 ? 'On fire!' : 'Keep it going!',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      color: 'from-orange-500 to-amber-600',
      bgGlow: 'bg-orange-500/10',
    },
    {
      label: 'Top Style',
      value: topStyle,
      sub: `${topLevel}% mastery`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      color: 'from-purple-500 to-violet-700',
      bgGlow: 'bg-purple-500/10',
      isText: true,
    },
    {
      label: 'Goals Progress',
      value: `${goalsCompleted}/${totalGoals}`,
      sub: totalGoals > 0 ? `${Math.round((goalsCompleted / totalGoals) * 100)}% complete` : 'Set your first goal!',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'from-emerald-500 to-green-700',
      bgGlow: 'bg-emerald-500/10',
    },
    {
      label: 'Badges Earned',
      value: badgesEarned,
      sub: 'Keep collecting!',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: 'from-amber-500 to-yellow-600',
      bgGlow: 'bg-amber-500/10',
    },
    {
      label: 'Member For',
      value: `${memberMonths}`,
      sub: memberMonths === 1 ? 'month' : 'months',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-600',
      bgGlow: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="relative bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all group overflow-hidden"
        >
          <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${card.bgGlow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
            {card.icon}
          </div>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{card.label}</p>
          <p className={`font-bold text-white ${card.isText ? 'text-lg' : 'text-2xl'}`}>{card.value}</p>
          <p className="text-gray-500 text-xs mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
