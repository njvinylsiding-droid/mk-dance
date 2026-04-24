import React from 'react';

interface Skill {
  dance_style: string;
  skill_level: number;
  classes_completed: number;
  current_rank: string;
  last_class_date: string | null;
}

interface SkillLevelsProps {
  skills: Skill[];
}

const STYLE_COLORS: Record<string, { bar: string; bg: string; text: string }> = {
  'Salsa On2': { bar: 'bg-gradient-to-r from-red-500 to-red-400', bg: 'bg-red-500/10', text: 'text-red-400' },
  'Bachata': { bar: 'bg-gradient-to-r from-purple-500 to-violet-400', bg: 'bg-purple-500/10', text: 'text-purple-400' },
  'Merengue': { bar: 'bg-gradient-to-r from-amber-500 to-yellow-400', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  'Cha Cha': { bar: 'bg-gradient-to-r from-emerald-500 to-green-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  'Cumbia': { bar: 'bg-gradient-to-r from-blue-500 to-cyan-400', bg: 'bg-blue-500/10', text: 'text-blue-400' },
};

const getRankIcon = (rank: string) => {
  switch (rank) {
    case 'Advanced':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'Intermediate':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
  }
};

const SkillLevels: React.FC<SkillLevelsProps> = ({ skills }) => {
  const formatDate = (date: string | null) => {
    if (!date) return 'Never';
    return new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Skill Levels</h3>
          <p className="text-gray-400 text-sm mt-1">Your mastery across dance styles</p>
        </div>
      </div>

      <div className="space-y-5">
        {skills.map((skill) => {
          const colors = STYLE_COLORS[skill.dance_style] || { bar: 'bg-gray-500', bg: 'bg-gray-500/10', text: 'text-gray-400' };
          const isActive = skill.classes_completed > 0;

          return (
            <div key={skill.dance_style} className={`${isActive ? '' : 'opacity-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text}`}>
                    {getRankIcon(skill.current_rank)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{skill.dance_style}</p>
                    <p className="text-gray-500 text-xs">{skill.current_rank} · {skill.classes_completed} classes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${colors.text}`}>{skill.skill_level}%</p>
                  <p className="text-gray-500 text-xs">Last: {formatDate(skill.last_class_date)}</p>
                </div>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.skill_level}%` }}
                />
              </div>
              {/* Level markers */}
              <div className="flex justify-between mt-1 px-0.5">
                {['Beginner', 'Beginner+', 'Intermediate', 'Advanced', 'Master'].map((level, i) => (
                  <span key={level} className={`text-[9px] ${skill.skill_level >= (i * 25) ? 'text-gray-400' : 'text-gray-700'}`}>
                    {level}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillLevels;
