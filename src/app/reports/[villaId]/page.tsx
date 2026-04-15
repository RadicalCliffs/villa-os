'use client';

import { use } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, TrendingUp, TrendingDown, Percent, Calendar, Share2, Download, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  getVillaById,
  getReservationsForVilla,
  getExpensesForVilla,
  getReportsForVilla,
  villas,
} from '@/lib/seed-data';

function MetricCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BarChart({ data, maxValue }: { data: { label: string; value: number; color: string }[]; maxValue: number }) {
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="font-medium text-gray-900">{formatCurrency(item.value)}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${item.color}`}
              style={{ width: `${Math.max(5, (item.value / maxValue) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const sourceColors: Record<string, string> = {
  airbnb: 'bg-red-400',
  booking_com: 'bg-blue-500',
  direct: 'bg-emerald-500',
  agoda: 'bg-orange-400',
  vrbo: 'bg-purple-400',
};

const expenseCategoryColors: Record<string, string> = {
  maintenance: 'bg-orange-400',
  utilities: 'bg-blue-400',
  supplies: 'bg-green-400',
  repairs: 'bg-red-400',
  staff: 'bg-purple-400',
  other: 'bg-gray-400',
};

export default function OwnerReportPage({ params }: { params: Promise<{ villaId: string }> }) {
  const { villaId } = use(params);
  const villa = getVillaById(villaId);

  if (!villa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Villa not found</h1>
          <p className="text-gray-500 mb-4">Select a villa for report:</p>
          {villas.map(v => (
            <Link key={v.id} href={`/reports/${v.id}`} className="block text-emerald-600 hover:underline mb-1">
              {v.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const reports = getReportsForVilla(villaId);
  const latestReport = reports[0];
  const reservations = getReservationsForVilla(villaId);
  const villaExpenses = getExpensesForVilla(villaId);

  // Revenue by source
  const revenueBySource: Record<string, number> = {};
  for (const r of reservations) {
    if (r.status !== 'cancelled') {
      const src = r.source;
      revenueBySource[src] = (revenueBySource[src] || 0) + r.total_revenue;
    }
  }
  const maxRevenue = Math.max(...Object.values(revenueBySource), 1);

  // Expenses by category
  const expensesByCategory: Record<string, number> = {};
  for (const e of villaExpenses) {
    expensesByCategory[e.category] = (expensesByCategory[e.category] || 0) + e.amount_thb;
  }
  const maxExpense = Math.max(...Object.values(expensesByCategory), 1);

  // Monthly comparison (last 4 months from reports)
  const monthlyData = reports.slice(0, 4).reverse();
  const maxMonthlyRevenue = Math.max(...monthlyData.map(r => r.total_revenue), 1);

  const currentMonth = latestReport?.month || new Date().toISOString().slice(0, 7);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-green-600 text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8" />
              <h1 className="text-xl font-bold tracking-tight">VillaOS</h1>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-white/80 hover:text-white">Dashboard</Link>
              <Link href="/tasks" className="text-white/80 hover:text-white">Tasks</Link>
              <Link href={`/reports/${villaId}`} className="text-white hover:text-white">Reports</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mb-6 print:hidden">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        {/* Report Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{villa.name}</h2>
            <p className="text-gray-500 mt-1">Owner Report — {currentMonth}</p>
            <div className="flex gap-2 mt-2">
              {villas.map(v => (
                <Link key={v.id} href={`/reports/${v.id}`}>
                  <Badge variant={v.id === villaId ? 'emerald' : 'default'} className="cursor-pointer">
                    {v.name.replace('Villa ', '')}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" /> PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        {latestReport && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard icon={TrendingUp} label="Total Revenue" value={formatCurrency(latestReport.total_revenue)} color="bg-green-600" />
            <MetricCard icon={TrendingDown} label="Total Expenses" value={formatCurrency(latestReport.total_expenses)} color="bg-red-500" />
            <MetricCard icon={DollarSign} label="Net Income" value={formatCurrency(latestReport.net_income)} color="bg-emerald-600" />
            <MetricCard icon={Percent} label="Occupancy Rate" value={`${latestReport.occupancy_rate}%`} color="bg-blue-600" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue by Source */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Revenue by Source</h3>
            </CardHeader>
            <CardContent>
              <BarChart
                data={Object.entries(revenueBySource).map(([src, val]) => ({
                  label: src.replace('_', '.'),
                  value: val,
                  color: sourceColors[src] || 'bg-gray-400',
                }))}
                maxValue={maxRevenue}
              />
            </CardContent>
          </Card>

          {/* Expense Categories */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Expense Categories</h3>
            </CardHeader>
            <CardContent>
              {Object.keys(expensesByCategory).length > 0 ? (
                <BarChart
                  data={Object.entries(expensesByCategory).map(([cat, val]) => ({
                    label: cat.charAt(0).toUpperCase() + cat.slice(1),
                    value: val,
                    color: expenseCategoryColors[cat] || 'bg-gray-400',
                  }))}
                  maxValue={maxExpense}
                />
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No expenses recorded</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Comparison */}
        {monthlyData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Monthly Comparison</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {monthlyData.map(report => (
                  <div key={report.month} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-gray-900">{formatCurrency(report.total_revenue)}</span>
                      <div
                        className="w-full bg-emerald-500 rounded-t-lg min-h-[8px]"
                        style={{ height: `${(report.total_revenue / maxMonthlyRevenue) * 140}px` }}
                      />
                      <div
                        className="w-full bg-red-400 rounded-b-lg min-h-[4px]"
                        style={{ height: `${(report.total_expenses / maxMonthlyRevenue) * 140}px` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{report.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs justify-center">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" /> Revenue</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400" /> Expenses</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reservations List */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600" />
              Reservations
            </h3>
          </CardHeader>
          <CardContent>
            {reservations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-gray-500">
                      <th className="pb-2 font-medium">Guest</th>
                      <th className="pb-2 font-medium">Check-in</th>
                      <th className="pb-2 font-medium">Check-out</th>
                      <th className="pb-2 font-medium">Source</th>
                      <th className="pb-2 font-medium text-right">Revenue</th>
                      <th className="pb-2 font-medium text-right">Commission</th>
                      <th className="pb-2 font-medium text-right">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => {
                      const commission = r.total_revenue * r.commission_rate;
                      const net = r.total_revenue - commission;
                      return (
                        <tr key={r.id} className="border-b border-gray-50">
                          <td className="py-2 font-medium text-gray-900">{r.guest_name}</td>
                          <td className="py-2 text-gray-600">{formatDate(r.check_in)}</td>
                          <td className="py-2 text-gray-600">{formatDate(r.check_out)}</td>
                          <td className="py-2"><Badge variant="default">{r.source.replace('_', '.')}</Badge></td>
                          <td className="py-2 text-right text-gray-900">{formatCurrency(r.total_revenue)}</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(commission)}</td>
                          <td className="py-2 text-right font-medium text-emerald-700">{formatCurrency(net)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No reservations for this period</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
