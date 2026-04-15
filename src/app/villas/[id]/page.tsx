'use client';

import { use } from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, BedDouble, Users, MapPin, Calendar, DollarSign, ClipboardList, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate, getDaysBetween } from '@/lib/utils';
import {
  getVillaById,
  getReservationsForVilla,
  getTasksForVilla,
  getExpensesForVilla,
  getReportsForVilla,
  getStaffById,
  villas,
} from '@/lib/seed-data';

const sourceColors: Record<string, 'danger' | 'info' | 'success' | 'warning' | 'default'> = {
  airbnb: 'danger',
  booking_com: 'info',
  direct: 'success',
  agoda: 'warning',
  vrbo: 'default',
};

function CalendarGrid({ villaId }: { villaId: string }) {
  const reservations = getReservationsForVilla(villaId);
  const today = new Date();
  const days: { date: Date; status: 'occupied' | 'vacant' | 'checkout' }[] = [];

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    let status: 'occupied' | 'vacant' | 'checkout' = 'vacant';
    for (const r of reservations) {
      if (r.status === 'cancelled') continue;
      if (dateStr === r.check_out) {
        status = 'checkout';
        break;
      }
      if (dateStr >= r.check_in && dateStr < r.check_out) {
        status = 'occupied';
        break;
      }
    }
    days.push({ date: d, status });
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
        <div key={d} className="text-xs font-medium text-gray-500 text-center py-1">{d}</div>
      ))}
      {/* Offset for first day */}
      {Array.from({ length: days[0].date.getDay() }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}
      {days.map(({ date, status }, i) => {
        const isToday = date.toDateString() === today.toDateString();
        return (
          <div
            key={i}
            className={`text-xs text-center py-1.5 rounded ${
              status === 'occupied' ? 'bg-red-100 text-red-800' :
              status === 'checkout' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-50 text-green-700'
            } ${isToday ? 'ring-2 ring-emerald-500 font-bold' : ''}`}
          >
            {date.getDate()}
          </div>
        );
      })}
    </div>
  );
}

export default function VillaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const villa = getVillaById(id);

  if (!villa) {
    const fallbackVilla = villas[0];
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Villa not found</h1>
          <p className="text-gray-500 mb-4">Try one of the sample villas:</p>
          {villas.map(v => (
            <Link key={v.id} href={`/villas/${v.id}`} className="block text-emerald-600 hover:underline mb-1">
              {v.name}
            </Link>
          ))}
          <Link href="/" className="mt-4 inline-block text-emerald-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
    void fallbackVilla;
  }

  const reservations = getReservationsForVilla(id);
  const villaTasksList = getTasksForVilla(id);
  const villaExpenses = getExpensesForVilla(id);
  const reports = getReportsForVilla(id);
  const latestReport = reports[0];

  const totalExpensesThisMonth = villaExpenses.reduce((sum, e) => sum + e.amount_thb, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8" />
              <h1 className="text-xl font-bold tracking-tight">VillaOS</h1>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-white/80 hover:text-white">Dashboard</Link>
              <Link href="/tasks" className="text-white/80 hover:text-white">Tasks</Link>
              <Link href={`/reports/${id}`} className="text-white/80 hover:text-white">Reports</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        {/* Villa Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{villa.name}</h2>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {villa.address}</span>
            <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {villa.bedrooms} Bedrooms</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Max {villa.max_guests} Guests</span>
            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {formatCurrency(villa.nightly_rate)}/night</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {villa.amenities.map(a => (
              <Badge key={a} variant="emerald">{a}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar + Financial Summary */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" /> 30-Day Calendar
                </h3>
              </CardHeader>
              <CardContent>
                <CalendarGrid villaId={id} />
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Occupied</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" /> Checkout</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-50 border border-green-200" /> Vacant</span>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" /> Financial Summary
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {latestReport ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Revenue ({latestReport.month})</span>
                      <span className="font-semibold text-green-700">{formatCurrency(latestReport.total_revenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Expenses</span>
                      <span className="font-semibold text-red-600">{formatCurrency(latestReport.total_expenses)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Net Income</span>
                      <span className="font-bold text-emerald-700">{formatCurrency(latestReport.net_income)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy</span>
                      <span className="font-semibold">{latestReport.occupancy_rate}%</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No report data available</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button className="w-full flex items-center gap-2" size="md">
                <Plus className="h-4 w-4" /> Add Reservation
              </Button>
              <Button variant="outline" className="w-full flex items-center gap-2" size="md">
                <ClipboardList className="h-4 w-4" /> Create Task
              </Button>
            </div>
          </div>

          {/* Reservations */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Reservations</h3>
              </CardHeader>
              <CardContent>
                {reservations.length > 0 ? (
                  <div className="space-y-4">
                    {reservations
                      .sort((a, b) => a.check_in.localeCompare(b.check_in))
                      .map(r => (
                        <div key={r.id} className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(r.check_in)} — {formatDate(r.check_out)} ({getDaysBetween(r.check_in, r.check_out)} nights)
                            </p>
                            {r.notes && <p className="text-xs text-gray-400 mt-1">{r.notes}</p>}
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={sourceColors[r.source] || 'default'}>{r.source.replace('_', '.')}</Badge>
                            <p className="text-sm font-semibold text-gray-900">{formatCurrency(r.total_revenue)}</p>
                            <Badge variant={r.status === 'confirmed' ? 'info' : r.status === 'checked_in' ? 'success' : r.status === 'checked_out' ? 'default' : 'danger'}>
                              {r.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No reservations</p>
                )}
              </CardContent>
            </Card>

            {/* Task History */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-emerald-600" /> Task History
                </h3>
              </CardHeader>
              <CardContent>
                {villaTasksList.length > 0 ? (
                  <div className="space-y-3">
                    {villaTasksList.map(task => {
                      const assignedStaff = getStaffById(task.assigned_to);
                      return (
                        <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{task.type}</p>
                            <p className="text-sm text-gray-500">{task.notes}</p>
                            {assignedStaff && <p className="text-xs text-gray-400">Assigned: {assignedStaff.name}</p>}
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'}>
                              {task.status.replace('_', ' ')}
                            </Badge>
                            <p className="text-xs text-gray-500">{formatDate(task.scheduled_date)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
