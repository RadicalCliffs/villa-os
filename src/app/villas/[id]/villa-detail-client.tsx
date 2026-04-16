'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BedDouble, Users, MapPin, Calendar, DollarSign, ClipboardList, Plus, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/nav-header';
import { ExpenseForm } from '@/components/expense-form';
import { useToast } from '@/components/ui/toast';
import { formatCurrency, formatDate, getDaysBetween } from '@/lib/utils';
import { getStaffById as seedGetStaffById } from '@/lib/seed-data';

const villaExteriors = [
  '/images/villas/c1753934-339d-4887-b416-14949416ccb0.png',
  '/images/villas/c1d55643-48c1-476f-a893-9307067311e3.png',
  '/images/villas/c2e5fe21-06ee-4f22-8914-2b960693aa79.png',
  '/images/villas/c43e7982-27af-4532-8773-d119818943a5.png',
  '/images/villas/c5aae25e-ba0d-4c12-a051-63ab4bb04de8.png',
];

const villaGalleryImages = [
  '/images/interiors/living-ocean-view.png',
  '/images/interiors/workspace-ocean-view.png',
  '/images/interiors/dining-ocean-palms.png',
  '/images/interiors/living-room-pool-view.png',
];

const sourceColors: Record<string, 'danger' | 'info' | 'success' | 'warning' | 'default'> = {
  airbnb: 'danger',
  booking_com: 'info',
  direct: 'success',
  agoda: 'warning',
  vrbo: 'default',
};

function CalendarGrid({ reservations }: { reservations: Array<Record<string, unknown>> }) {
  const today = new Date();
  const days: { date: Date; status: 'occupied' | 'vacant' | 'checkout' }[] = [];

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    let status: 'occupied' | 'vacant' | 'checkout' = 'vacant';
    for (const r of reservations) {
      if ((r.status as string) === 'cancelled') continue;
      if (dateStr === (r.check_out as string)) { status = 'checkout'; break; }
      if (dateStr >= (r.check_in as string) && dateStr < (r.check_out as string)) { status = 'occupied'; break; }
    }
    days.push({ date: d, status });
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
        <div key={d} className="text-xs font-medium text-gray-500 text-center py-1">{d}</div>
      ))}
      {Array.from({ length: days[0].date.getDay() }).map((_, i) => <div key={`empty-${i}`} />)}
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

interface VillaDetailClientProps {
  villa: Record<string, unknown>;
  villaId: string;
  reservations: Array<Record<string, unknown>>;
  tasks: Array<Record<string, unknown>>;
  expenses: Array<Record<string, unknown>>;
  reports: Array<Record<string, unknown>>;
  hasDbData: boolean;
}

export function VillaDetailClient({ villa, villaId, reservations, tasks, expenses, reports, hasDbData }: VillaDetailClientProps) {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const { toast } = useToast();
  const latestReport = reports[0];
  const amenities = (villa.amenities as string[]) || [];

  // Determine villa index from ID for unique image selection
  const villaIndex = parseInt(villaId.slice(-1), 10) - 1;
  const heroImage = villaExteriors[villaIndex % villaExteriors.length];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Villa Hero Header with Image */}
      <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
        <Image
          src={heroImage}
          alt={villa.name as string}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm text-white/80 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Link>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{villa.name as string}</h2>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {villa.address as string}</span>
              <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" /> {villa.bedrooms as number} Bedrooms</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Max {villa.max_guests as number} Guests</span>
              <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {formatCurrency(villa.nightly_rate as number)}/night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden shadow-lg">
          {villaGalleryImages.map((img, i) => (
            <div key={i} className="relative h-28 sm:h-36">
              <Image
                src={img}
                alt={`Villa interior ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.map((a) => <Badge key={a} variant="emerald">{a}</Badge>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar + Financial Summary + Quick Actions */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-600" /> 30-Day Calendar
                </h3>
              </CardHeader>
              <CardContent>
                <CalendarGrid reservations={reservations} />
                <div className="flex gap-4 mt-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Occupied</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" /> Checkout</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-50 border border-green-200" /> Vacant</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" /> Financial Summary
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {latestReport ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Revenue ({latestReport.month as string})</span>
                      <span className="font-semibold text-green-700">{formatCurrency(latestReport.total_revenue as number)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Expenses</span>
                      <span className="font-semibold text-red-600">{formatCurrency(latestReport.total_expenses as number)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Net Income</span>
                      <span className="font-bold text-emerald-700">{formatCurrency(latestReport.net_income as number)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Occupancy</span>
                      <span className="font-semibold">{latestReport.occupancy_rate as number}%</span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No report data available</p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <a
                href={`/api/ical/${villaId}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Download className="h-4 w-4" /> Download iCal
              </a>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                size="md"
                onClick={() => setShowExpenseForm(true)}
              >
                <DollarSign className="h-4 w-4" /> Add Expense
              </Button>
              <Link href={`/reports/${villaId}`}>
                <Button variant="outline" className="w-full flex items-center gap-2" size="md">
                  <ClipboardList className="h-4 w-4" /> View Reports
                </Button>
              </Link>
            </div>
          </div>

          {/* Reservations + Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <h3 className="font-semibold text-gray-900">Reservations</h3>
              </CardHeader>
              <CardContent>
                {reservations.length > 0 ? (
                  <div className="space-y-4">
                    {[...reservations]
                      .sort((a, b) => (a.check_in as string).localeCompare(b.check_in as string))
                      .map((r) => (
                        <div key={r.id as string} className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{r.guest_name as string}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(r.check_in as string)} — {formatDate(r.check_out as string)} ({getDaysBetween(r.check_in as string, r.check_out as string)} nights)
                            </p>
                            {r.notes ? <p className="text-xs text-gray-400 mt-1">{String(r.notes)}</p> : null}
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={sourceColors[r.source as string] || 'default'}>{(r.source as string).replace('_', '.')}</Badge>
                            <p className="text-sm font-semibold text-gray-900">{formatCurrency(r.total_revenue as number)}</p>
                            <Badge variant={(r.status as string) === 'confirmed' ? 'info' : (r.status as string) === 'checked_in' ? 'success' : (r.status as string) === 'checked_out' ? 'default' : 'danger'}>
                              {(r.status as string).replace('_', ' ')}
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

            <Card className="card-hover">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-emerald-600" /> Task History
                </h3>
              </CardHeader>
              <CardContent>
                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.map((task) => {
                      const staffInfo = hasDbData
                        ? (task.staff as { name: string } | null)
                        : seedGetStaffById(task.assigned_to as string);
                      return (
                        <div key={task.id as string} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{task.type as string}</p>
                            <p className="text-sm text-gray-500">{task.notes as string}</p>
                            {staffInfo && <p className="text-xs text-gray-400">Assigned: {staffInfo.name}</p>}
                          </div>
                          <div className="text-right space-y-1">
                            <Badge variant={(task.status as string) === 'completed' ? 'success' : (task.status as string) === 'in_progress' ? 'warning' : 'default'}>
                              {(task.status as string).replace('_', ' ')}
                            </Badge>
                            <p className="text-xs text-gray-500">{formatDate(task.scheduled_date as string)}</p>
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

      {showExpenseForm && (
        <ExpenseForm
          villaId={villaId}
          villaName={villa.name as string}
          onClose={() => setShowExpenseForm(false)}
        />
      )}
    </div>
  );
}
