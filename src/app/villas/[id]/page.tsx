import { getVillaById } from '@/app/actions/villas';
import { getReservationsForVilla } from '@/app/actions/reservations';
import { getExpensesForVilla } from '@/app/actions/expenses';
import { getReportsForVilla } from '@/app/actions/reports';
import { getTasks } from '@/app/actions/tasks';
import { VillaDetailClient } from './villa-detail-client';
import {
  getVillaById as seedGetVillaById,
  getReservationsForVilla as seedGetReservations,
  getTasksForVilla as seedGetTasks,
  getExpensesForVilla as seedGetExpenses,
  getReportsForVilla as seedGetReports,
  villas as seedVillas,
} from '@/lib/seed-data';

export default async function VillaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dbVilla = await getVillaById(id);
  const hasDbData = !!dbVilla;

  const villa = dbVilla || seedGetVillaById(id);
  if (!villa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Villa not found</h1>
          <p className="text-gray-500 mb-4">Try one of the sample villas:</p>
          {seedVillas.map((v) => (
            <a key={v.id} href={`/villas/${v.id}`} className="block text-emerald-600 hover:underline mb-1">
              {v.name}
            </a>
          ))}
          <a href="/" className="mt-4 inline-block text-emerald-600 hover:underline">Back to Dashboard</a>
        </div>
      </div>
    );
  }

  const [reservations, tasks, expenses, reports] = hasDbData
    ? await Promise.all([
        getReservationsForVilla(id),
        getTasks({ villa_id: id }),
        getExpensesForVilla(id),
        getReportsForVilla(id),
      ])
    : [
        seedGetReservations(id),
        seedGetTasks(id),
        seedGetExpenses(id),
        seedGetReports(id),
      ];

  return (
    <VillaDetailClient
      villa={villa}
      villaId={id}
      reservations={reservations}
      tasks={tasks}
      expenses={expenses}
      reports={reports}
      hasDbData={hasDbData}
    />
  );
}
