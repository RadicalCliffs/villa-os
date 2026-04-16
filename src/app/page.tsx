import { CalendarCheck, CalendarX, ClipboardList, DollarSign, BedDouble, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { getVillas } from '@/app/actions/villas';
import { getTodayReservations } from '@/app/actions/reservations';
import { getTasks } from '@/app/actions/tasks';
import { getAllVillaRevenues } from '@/app/actions/reports';
import {
  villas as seedVillas,
  getTodayCheckIns,
  getTodayCheckOuts,
  getVillaStatus as seedGetVillaStatus,
  getPendingTasksCount as seedGetPendingTasksCount,
  getNextReservation as seedGetNextReservation,
  getMonthlyRevenue as seedGetMonthlyRevenue,
  getUrgentTasks as seedGetUrgentTasks,
  getVillaById as seedGetVillaById,
  getStaffById as seedGetStaffById,
  tasks as seedTasks,
} from '@/lib/seed-data';
import { DashboardClient } from './dashboard-client';

export default async function DashboardPage() {
  // Try fetching from Supabase
  const dbVillas = await getVillas();
  const { checkIns: dbCheckIns, checkOuts: dbCheckOuts } = await getTodayReservations();
  const dbTasks = await getTasks();
  const dbRevenues = await getAllVillaRevenues();

  // Use DB data if available, otherwise fall back to seed
  const hasDbData = dbVillas.length > 0;

  const villasData = hasDbData ? dbVillas : seedVillas;
  const todayCheckIns = hasDbData ? dbCheckIns : getTodayCheckIns();
  const todayCheckOuts = hasDbData ? dbCheckOuts : getTodayCheckOuts();
  const allTasks = hasDbData ? dbTasks : seedTasks;
  const pendingTasks = allTasks.filter((t: { status: string }) => t.status === 'pending' || t.status === 'in_progress');
  const urgentTasks = allTasks.filter((t: { status: string; priority: string }) => t.priority === 'urgent' && t.status !== 'completed');

  const monthlyRevenue = hasDbData
    ? dbRevenues.reduce((sum: number, r: { total_revenue: number }) => sum + Number(r.total_revenue), 0)
    : seedGetMonthlyRevenue();

  return (
    <DashboardClient
      villas={villasData}
      todayCheckIns={todayCheckIns}
      todayCheckOuts={todayCheckOuts}
      pendingTasksCount={pendingTasks.length}
      monthlyRevenue={monthlyRevenue}
      urgentTasks={urgentTasks}
      revenueData={dbRevenues}
      hasDbData={hasDbData}
    />
  );
}
