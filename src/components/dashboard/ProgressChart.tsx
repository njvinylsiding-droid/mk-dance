import React, { useState } from 'react';

interface ProgressPoint {
  dance_style: string;
  skill_level: number;
  recorded_at: string;
}

interface ProgressChartProps {
  data: ProgressPoint[];
}

const STYLE_COLORS: Record<string, string> = {
  'Salsa On2': '#ef4444',
  'Bachata': '#8b5cf6',
  'Merengue': '#f59e0b',
  'Cha Cha': '#10b981',
  'Cumbia': '#3b82f6',
};

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);
  const [activeStyles, setActiveStyles] = useState<Set<string>>(new Set(Object.keys(STYLE_COLORS)));

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-8 text-center">
        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        <p className="text-gray-400">No progress data yet. Attend classes to start tracking!</p>
      </div>
    );
  }

  // Group by style
  const styleGroups: Record<string, { date: string; level: number }[]> = {};
  data.forEach(p => {
    if (!styleGroups[p.dance_style]) styleGroups[p.dance_style] = [];
    styleGroups[p.dance_style].push({ date: p.recorded_at, level: p.skill_level });
  });

  // Chart dimensions
  const width = 700;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Get all unique dates sorted
  const allDates = [...new Set(data.map(d => d.recorded_at))].sort();
  const dateLabels = allDates.map(d => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  });

  const toggleStyle = (style: string) => {
    setActiveStyles(prev => {
      const next = new Set(prev);
      if (next.has(style)) {
        if (next.size > 1) next.delete(style);
      } else {
        next.add(style);
      }
      return next;
    });
  };

  return (
    <div className="bg-gray-900/50 rounded-2xl border border-white/10 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Progress Over Time</h3>
          <p className="text-gray-400 text-sm mt-1">Your skill development journey</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(STYLE_COLORS).map(([style, color]) => {
            const hasData = styleGroups[style]?.length > 0;
            if (!hasData) return null;
            const isActive = activeStyles.has(style);
            return (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: isActive ? color : '#4b5563' }} />
                {style}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px]" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(val => {
            const y = padding.top + chartH - (val / 100) * chartH;
            return (
              <g key={val}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                <text x={padding.left - 10} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize={11}>{val}%</text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {allDates.map((_, i) => {
            const x = padding.left + (i / (allDates.length - 1 || 1)) * chartW;
            return (
              <text key={i} x={x} y={height - 8} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={10}>
                {dateLabels[i]}
              </text>
            );
          })}

          {/* Lines for each style */}
          {Object.entries(styleGroups).map(([style, points]) => {
            if (!activeStyles.has(style)) return null;
            const color = STYLE_COLORS[style] || '#888';

            const pathPoints = points.map(p => {
              const dateIdx = allDates.indexOf(p.date);
              const x = padding.left + (dateIdx / (allDates.length - 1 || 1)) * chartW;
              const y = padding.top + chartH - (p.level / 100) * chartH;
              return { x, y, level: p.level, date: p.date };
            });

            const pathD = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

            // Gradient fill
            const fillD = pathD + ` L ${pathPoints[pathPoints.length - 1].x} ${padding.top + chartH} L ${pathPoints[0].x} ${padding.top + chartH} Z`;

            return (
              <g key={style}>
                <defs>
                  <linearGradient id={`grad-${style.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path d={fillD} fill={`url(#grad-${style.replace(/\s/g, '')})`} />
                <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                {pathPoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={color}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint({ x: p.x, y: p.y, label: `${style}: ${p.level}%`, value: p.level })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </g>
            );
          })}

          {/* Tooltip */}
          {hoveredPoint && (
            <g>
              <rect
                x={hoveredPoint.x - 50}
                y={hoveredPoint.y - 35}
                width={100}
                height={24}
                rx={6}
                fill="rgba(0,0,0,0.85)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
              <text x={hoveredPoint.x} y={hoveredPoint.y - 19} textAnchor="middle" fill="white" fontSize={11} fontWeight="bold">
                {hoveredPoint.label}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default ProgressChart;
