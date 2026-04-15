'use client';

import { Home, CalendarCheck, CalendarX, ClipboardList, DollarSign, BedDouble, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  villas,
  getTodayCheckIns,
  getTodayCheckOuts,
  getVillaStatus,
  getPendingTasksCount,
  getNextReservation,
  getMonthlyRevenue,
  getUrgentTasks,
  getVillaById,
  getStaffById,
  tasks,
} from '@/lib/seed-data';

function NavHeader() {
  return (
    <header className="bg-gradient-to-r from-emerald-800 to-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8" />
            <h1 className="text-xl font-bold tracking-tight">VillaOS</h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-white hover:text-white">Dashboard</Link>
            <Link href="/tasks" className="text-white/80 hover:text-white">Tasks</Link>
            <Link href="/reports/v1" className="text-white/80 hover:text-white">Reports</Link>
            <Link href="/login" className="text-white/80 hover:text-white">Login</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`p-3 rounded-lg ${color}`}>
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
  'occupied': { label: 'Occupied', variant: 'danger' },
  'vacant': { label: 'Vacant', variant: 'success' },
  'checkout-today': { label: 'Checkout Today', variant: 'warning' },
  'checkin-today': { label: 'Check-in Today', variant: 'info' },
};

export default function DashboardPage() {
  const todayCheckIns = getTodayCheckIns();
  const todayCheckOuts = getTodayCheckOuts();
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
  const monthlyRevenue = getMonthlyRevenue();
  const urgentTasks = getUrgentTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard icon={BedDouble} label="Total Villas" value={villas.length} color="bg-emerald-600" />
          <StatCard icon={CalendarCheck} label="Today Check-ins" value={todayCheckIns.length} color="bg-blue-600" />
          <StatCard icon={CalendarX} label="Today Check-outs" value={todayCheckOuts.length} color="bg-amber-600" />
          <StatCard icon={ClipboardList} label="Pending Tasks" value={pendingTasks.length} color="bg-purple-600" />
          <StatCard icon={DollarSign} label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} color="bg-green-600" />
        </div>

        {/* Villa Overview Grid */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Villa Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {villas.map((villa) => {
            const villaStatus = getVillaStatus(villa.id);
            const config = statusConfig[villaStatus];
            const pending = getPendingTasksCount(villa.id);
            const next = getNextReservation(villa.id);

            return (
              <Link key={villa.id} href={`/villas/${villa.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="py-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{villa.name}</h3>
                        <p className="text-sm text-gray-500">{villa.bedrooms} BR | {formatCurrency(villa.nightly_rate)}/night</p>
                      </div>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      {next && (
                        <p>Next reservation: {formatDate(next.check_in)}</p>
                      )}
                      {!next && <p className="text-gray-400">No upcoming reservations</p>}
                      {pending > 0 && (
                        <p className="text-amber-600 font-medium">{pending} pending task{pending > 1 ? 's' : ''}</p>
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

        {/* Today Schedule and Urgent Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    {todayCheckIns.map(r => {
                      const villa = getVillaById(r.villa_id);
                      return (
                        <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name}</p>
                            <p className="text-sm text-gray-500">{villa?.name}</p>
                          </div>
                          <Badge variant="info">{r.source.replace('_', '.')}</Badge>
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
                    {todayCheckOuts.map(r => {
                      const villa = getVillaById(r.villa_id);
                      return (
                        <div key={r.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name}</p>
                            <p className="text-sm text-gray-500">{villa?.name}</p>
                          </div>
                          <Badge variant="warning">{r.source.replace('_', '.')}</Badge>
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
                    {urgentTasks.map(task => {
                      const villa = getVillaById(task.villa_id);
                      const assignedStaff = getStaffById(task.assigned_to);
                      return (
                        <div key={task.id} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{task.type} — {villa?.name}</p>
                            <p className="text-sm text-gray-500">{task.notes}</p>
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
