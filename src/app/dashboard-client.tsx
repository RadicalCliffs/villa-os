'use client';

import { CalendarCheck, CalendarX, ClipboardList, DollarSign, BedDouble, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { NavHeader } from '@/components/nav-header';
import { RevenueComparison } from '@/components/revenue-comparison';
import {
  getVillaStatus as seedGetVillaStatus,
  getPendingTasksCount as seedGetPendingTasksCount,
  getNextReservation as seedGetNextReservation,
  getVillaById as seedGetVillaById,
  getStaffById as seedGetStaffById,
} from '@/lib/seed-data';

function StatCard({ icon: Icon, label, value, color, index }: { icon: React.ElementType; label: string; value: string | number; color: string; index: number }) {
  return (
    <Card className="glass-card group hover:scale-[1.02] transition-transform" style={{ animationDelay: `${index * 80}ms` }}>
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`p-3 rounded-lg ${color} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' }> = {
  occupied: { label: 'Occupied', variant: 'danger' },
  vacant: { label: 'Vacant', variant: 'success' },
  'checkout-today': { label: 'Checkout Today', variant: 'warning' },
  'checkin-today': { label: 'Check-in Today', variant: 'info' },
};

interface DashboardClientProps {
  villas: Array<Record<string, unknown>>;
  todayCheckIns: Array<Record<string, unknown>>;
  todayCheckOuts: Array<Record<string, unknown>>;
  pendingTasksCount: number;
  monthlyRevenue: number;
  urgentTasks: Array<Record<string, unknown>>;
  revenueData: Array<Record<string, unknown>>;
  hasDbData: boolean;
}

export function DashboardClient({
  villas,
  todayCheckIns,
  todayCheckOuts,
  pendingTasksCount,
  monthlyRevenue,
  urgentTasks,
  revenueData,
  hasDbData,
}: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={BedDouble} label="Total Villas" value={villas.length} color="bg-emerald-600" index={0} />
          <StatCard icon={CalendarCheck} label="Today Check-ins" value={todayCheckIns.length} color="bg-blue-600" index={1} />
          <StatCard icon={CalendarX} label="Today Check-outs" value={todayCheckOuts.length} color="bg-amber-600" index={2} />
          <StatCard icon={ClipboardList} label="Pending Tasks" value={pendingTasksCount} color="bg-purple-600" index={3} />
          <StatCard icon={DollarSign} label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} color="bg-green-600" index={4} />
        </div>

        {/* Villa Overview Grid */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Villa Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {villas.map((villa: Record<string, unknown>, index: number) => {
            const villaId = villa.id as string;
            const villaStatus = hasDbData ? 'vacant' : seedGetVillaStatus(villaId);
            const config = statusConfig[villaStatus] || statusConfig.vacant;
            const pending = hasDbData ? (villa.active_reservations as number) || 0 : seedGetPendingTasksCount(villaId);
            const next = hasDbData ? null : seedGetNextReservation(villaId);

            return (
              <Link key={villaId} href={`/villas/${villaId}`}>
                <Card
                  className="hover:shadow-md transition-all cursor-pointer h-full animate-stagger-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <CardContent className="py-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{villa.name as string}</h3>
                        <p className="text-sm text-gray-500">
                          {villa.bedrooms as number} BR | {formatCurrency(villa.nightly_rate as number)}/night
                        </p>
                      </div>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {next && <p>Next reservation: {formatDate(next.check_in)}</p>}
                      {!next && !hasDbData && <p className="text-gray-400">No upcoming reservations</p>}
                      {hasDbData && pending > 0 && (
                        <p className="text-blue-600 font-medium">{pending} active reservation{pending > 1 ? 's' : ''}</p>
                      )}
                    </div>
                    <div className="mt-3 flex items-center text-emerald-600 text-sm font-medium">
                      View details <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Revenue Comparison + Today Schedule + Urgent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Comparison */}
          {revenueData.length > 0 && (
            <div className="lg:col-span-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Comparison</h2>
              <Card>
                <CardContent className="py-4">
                  <RevenueComparison data={revenueData as Array<{ villa_id: string; total_revenue: number; total_expenses: number; net_income: number; occupancy_rate: number; villas: { id: string; name: string } | null }>} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Today Schedule */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Schedule</h2>
            <Card>
              <CardContent className="py-4 space-y-4">
                {todayCheckIns.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-1">
                      <CalendarCheck className="h-4 w-4" /> Check-ins
                    </h3>
                    {todayCheckIns.map((r: Record<string, unknown>) => {
                      const villaInfo = hasDbData
                        ? (r.villas as { name: string } | null)
                        : seedGetVillaById(r.villa_id as string);
                      return (
                        <div key={r.id as string} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name as string}</p>
                            <p className="text-sm text-gray-500">{villaInfo?.name}</p>
                          </div>
                          <Badge variant="info">{(r.source as string).replace('_', '.')}</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
                {todayCheckOuts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-1">
                      <CalendarX className="h-4 w-4" /> Check-outs
                    </h3>
                    {todayCheckOuts.map((r: Record<string, unknown>) => {
                      const villaInfo = hasDbData
                        ? (r.villas as { name: string } | null)
                        : seedGetVillaById(r.villa_id as string);
                      return (
                        <div key={r.id as string} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name as string}</p>
                            <p className="text-sm text-gray-500">{villaInfo?.name}</p>
                          </div>
                          <Badge variant="warning">{(r.source as string).replace('_', '.')}</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
                {todayCheckIns.length === 0 && todayCheckOuts.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No check-ins or check-outs today</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Urgent Tasks */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Urgent Tasks
            </h2>
            <Card>
              <CardContent className="py-4">
                {urgentTasks.length > 0 ? (
                  <div className="space-y-3">
                    {urgentTasks.map((task: Record<string, unknown>) => {
                      const villaInfo = hasDbData
                        ? (task.villas as { name: string } | null)
                        : seedGetVillaById(task.villa_id as string);
                      const assignedStaff = hasDbData
                        ? (task.staff as { name: string } | null)
                        : seedGetStaffById(task.assigned_to as string);
                      return (
                        <div key={task.id as string} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{task.type as string} — {villaInfo?.name}</p>
                            <p className="text-sm text-gray-500">{task.notes as string}</p>
                            {assignedStaff && (
                              <p className="text-xs text-gray-400 mt-1">Assigned: {assignedStaff.name}</p>
                            )}
                          </div>
                          <Badge variant="danger">Urgent</Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-4">No urgent tasks</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
