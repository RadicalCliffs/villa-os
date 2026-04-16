'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';

interface HeatmapDay {
  date: string;
  revenue: number;
  occupied: boolean;
}

interface OccupancyHeatmapProps {
  reservations: Array<{
    check_in: string;
    check_out: string;
    total_revenue: number;
    status: string;
  }>;
  nightlyRate: number;
}

export function OccupancyHeatmap({ reservations, nightlyRate }: OccupancyHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const days = useMemo(() => {
    const result: HeatmapDay[] = [];
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    for (let i = 0; i < 365; i++) {
      const d = new Date(startOfYear);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      let revenue = 0;
      let occupied = false;

      for (const r of reservations) {
        if (r.status === 'cancelled') continue;
        if (dateStr >= r.check_in && dateStr < r.check_out) {
          occupied = true;
          const nights = Math.max(1, Math.ceil(
            (new Date(r.check_out).getTime() - new Date(r.check_in).getTime()) / (1000 * 60 * 60 * 24)
          ));
          revenue = r.total_revenue / nights;
          break;
        }
      }

      result.push({ date: dateStr, revenue, occupied });
    }
    return result;
  }, [reservations]);

  const maxRevenue = Math.max(...days.map((d) => d.revenue), nightlyRate);

  // Group into weeks
  const startDay = new Date(days[0]?.date || '').getDay();
  const weeks: (HeatmapDay | null)[][] = [];
  let currentWeek: (HeatmapDay | null)[] = Array(startDay).fill(null);

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  function getColor(day: HeatmapDay | null): string {
    if (!day) return 'bg-transparent';
    if (!day.occupied) return 'bg-gray-100';
    const intensity = Math.min(day.revenue / maxRevenue, 1);
    if (intensity < 0.25) return 'bg-emerald-100';
    if (intensity < 0.5) return 'bg-emerald-300';
    if (intensity < 0.75) return 'bg-emerald-500';
    return 'bg-emerald-700';
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div>
      {/* Month labels */}
      <div className="flex text-xs text-gray-400 mb-1 ml-8">
        {months.map((m, i) => (
          <span key={i} style={{ width: `${100 / 12}%` }}>{m}</span>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-[2px] overflow-x-auto">
        {/* Day labels */}
        <div className="flex flex-col gap-[2px] text-xs text-gray-400 mr-1 shrink-0">
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
            <div key={i} className="h-[12px] flex items-center">{d}</div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`w-[12px] h-[12px] rounded-sm ${getColor(day)} ${
                  day ? 'cursor-pointer hover:ring-1 hover:ring-emerald-400' : ''
                }`}
                onMouseEnter={() => day && setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-medium">{hoveredDay.date}</span>
          {hoveredDay.occupied ? (
            <span> — {formatCurrency(hoveredDay.revenue)}/night</span>
          ) : (
            <span> — Vacant</span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-gray-100" />
        <div className="w-3 h-3 rounded-sm bg-emerald-100" />
        <div className="w-3 h-3 rounded-sm bg-emerald-300" />
        <div className="w-3 h-3 rounded-sm bg-emerald-500" />
        <div className="w-3 h-3 rounded-sm bg-emerald-700" />
        <span>More</span>
      </div>
    </div>
  );
}
