'use client';

import { formatCurrency } from '@/lib/utils';

interface VillaRevenue {
  villa_id: string;
  total_revenue: number;
  total_expenses: number;
  net_income: number;
  occupancy_rate: number;
  villas: { id: string; name: string } | null;
}

interface RevenueComparisonProps {
  data: VillaRevenue[];
}

export function RevenueComparison({ data }: RevenueComparisonProps) {
  const maxRevenue = Math.max(...data.map((d) => d.total_revenue), 1);

  const sorted = [...data].sort((a, b) => b.total_revenue - a.total_revenue);

  return (
    <div className="space-y-4">
      {sorted.map((item) => {
        const revenueWidth = (item.total_revenue / maxRevenue) * 100;
        const expenseWidth = (item.total_expenses / maxRevenue) * 100;
        const villaName = item.villas?.name || 'Unknown Villa';

        return (
          <div key={item.villa_id}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">{villaName}</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-green-700">{formatCurrency(item.total_revenue)}</span>
                <span className="text-gray-400">|</span>
                <span className="text-emerald-700 font-semibold">{formatCurrency(item.net_income)}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{item.occupancy_rate}%</span>
              </div>
            </div>
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${revenueWidth}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-red-400/40 rounded-full transition-all duration-700"
                style={{ width: `${expenseWidth}%` }}
              />
            </div>
          </div>
        );
      })}

      <div className="flex gap-4 mt-2 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-emerald-500" /> Revenue
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-400/40" /> Expenses
        </span>
      </div>
    </div>
  );
}
