'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, TrendingDown, Percent, Calendar, Share2, Download, DollarSign, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/nav-header';
import { OccupancyHeatmap } from '@/components/occupancy-heatmap';
import { useToast } from '@/components/ui/toast';
import { formatCurrency, formatDate } from '@/lib/utils';

function MetricCard({ icon: Icon, label, value, color, gradient }: { icon: React.ElementType; label: string; value: string; color: string; gradient?: string }) {
  return (
    <Card className={`glass-card card-hover ${gradient || ''}`}>
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`p-3 rounded-xl ${color} shadow-lg`}>
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
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full ${item.color} transition-all duration-700`}
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

interface ReportsClientProps {
  villa: Record<string, unknown>;
  villaId: string;
  reports: Array<Record<string, unknown>>;
  reservations: Array<Record<string, unknown>>;
  expenses: Array<Record<string, unknown>>;
  allVillas: Array<Record<string, unknown>>;
}

export function ReportsClient({ villa, villaId, reports, reservations, expenses, allVillas }: ReportsClientProps) {
  const { toast } = useToast();
  const latestReport = reports[0];

  const revenueBySource: Record<string, number> = {};
  for (const r of reservations) {
    if ((r.status as string) !== 'cancelled') {
      const src = r.source as string;
      revenueBySource[src] = (revenueBySource[src] || 0) + Number(r.total_revenue);
    }
  }
  const maxRevenue = Math.max(...Object.values(revenueBySource), 1);

  const expensesByCategory: Record<string, number> = {};
  for (const e of expenses) {
    const cat = e.category as string;
    expensesByCategory[cat] = (expensesByCategory[cat] || 0) + Number(e.amount_thb);
  }
  const maxExpense = Math.max(...Object.values(expensesByCategory), 1);

  const monthlyData = reports.slice(0, 4).reverse();
  const maxMonthlyRevenue = Math.max(...monthlyData.map((r) => Number(r.total_revenue)), 1);

  const currentMonth = (latestReport?.month as string) || new Date().toISOString().slice(0, 7);

  function handlePrint() {
    window.print();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    toast('Link copied to clipboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Professional Header with Villa Image */}
      <div className="relative h-48 md:h-56 overflow-hidden print:hidden">
        <Image
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=400&fit=crop&q=85"
          alt="Luxury villa"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-800/70 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link href="/" className="inline-flex items-center text-sm text-white/70 hover:text-white mb-3">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{villa.name as string}</h2>
            <p className="text-white/70 mt-1">Owner Report — {currentMonth}</p>
            <div className="flex gap-2 mt-3">
              {allVillas.map((v) => (
                <Link key={v.id as string} href={`/reports/${v.id}`}>
                  <Badge variant={(v.id as string) === villaId ? 'emerald' : 'default'} className="cursor-pointer">
                    {(v.name as string).replace('Villa ', '')}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-none print:px-8">
        {/* Print-only back link */}
        <Link href="/" className="hidden print:hidden inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        {/* Print header */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold">VillaOS Owner Report</h1>
          <p className="text-gray-600">{villa.name as string} — {currentMonth}</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mb-6 print:hidden">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleCopyLink}>
            <Share2 className="h-4 w-4" /> Copy Link
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> PDF
          </Button>
          <a href={`/api/ical/${villaId}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" /> iCal
            </Button>
          </a>
        </div>

        {/* Key Metrics */}
        {latestReport && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard icon={TrendingUp} label="Total Revenue" value={formatCurrency(latestReport.total_revenue as number)} color="bg-green-600" />
            <MetricCard icon={TrendingDown} label="Total Expenses" value={formatCurrency(latestReport.total_expenses as number)} color="bg-red-500" />
            <MetricCard icon={DollarSign} label="Net Income" value={formatCurrency(latestReport.net_income as number)} color="bg-emerald-600" />
            <MetricCard icon={Percent} label="Occupancy Rate" value={`${latestReport.occupancy_rate}%`} color="bg-blue-600" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader><h3 className="font-semibold text-gray-900">Revenue by Source</h3></CardHeader>
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

          <Card className="card-hover">
            <CardHeader><h3 className="font-semibold text-gray-900">Expense Categories</h3></CardHeader>
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
          <Card className="mb-8 card-hover">
            <CardHeader><h3 className="font-semibold text-gray-900">Monthly Comparison</h3></CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {monthlyData.map((report) => (
                  <div key={report.month as string} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-gray-900">{formatCurrency(report.total_revenue as number)}</span>
                      <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg min-h-[8px]" style={{ height: `${(Number(report.total_revenue) / maxMonthlyRevenue) * 140}px` }} />
                      <div className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded-b-lg min-h-[4px]" style={{ height: `${(Number(report.total_expenses) / maxMonthlyRevenue) * 140}px` }} />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{report.month as string}</span>
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

        {/* Occupancy Heatmap */}
        <Card className="mb-8 print:break-before-page">
          <CardHeader><h3 className="font-semibold text-gray-900">Occupancy Heatmap</h3></CardHeader>
          <CardContent>
            <OccupancyHeatmap
              reservations={reservations as Array<{ check_in: string; check_out: string; total_revenue: number; status: string }>}
              nightlyRate={villa.nightly_rate as number}
            />
          </CardContent>
        </Card>

        {/* Reservations Table */}
        <Card className="print:break-before-page">
          <CardHeader>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-600" /> Reservations
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
                    {reservations.map((r) => {
                      const commission = Number(r.total_revenue) * Number(r.commission_rate || 0);
                      const net = Number(r.total_revenue) - commission;
                      return (
                        <tr key={r.id as string} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="py-2 font-medium text-gray-900">{r.guest_name as string}</td>
                          <td className="py-2 text-gray-600">{formatDate(r.check_in as string)}</td>
                          <td className="py-2 text-gray-600">{formatDate(r.check_out as string)}</td>
                          <td className="py-2"><Badge variant="default">{(r.source as string).replace('_', '.')}</Badge></td>
                          <td className="py-2 text-right text-gray-900">{formatCurrency(r.total_revenue as number)}</td>
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
