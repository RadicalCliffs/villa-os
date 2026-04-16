import { getVillaById, getVillas } from '@/app/actions/villas';
import { getReservationsForVilla } from '@/app/actions/reservations';
import { getExpensesForVilla } from '@/app/actions/expenses';
import { getReportsForVilla } from '@/app/actions/reports';
import { ReportsClient } from './reports-client';
import {
  getVillaById as seedGetVillaById,
  getReservationsForVilla as seedGetReservations,
  getExpensesForVilla as seedGetExpenses,
  getReportsForVilla as seedGetReports,
  villas as seedVillas,
} from '@/lib/seed-data';

export default async function OwnerReportPage({ params }: { params: Promise<{ villaId: string }> }) {
  const { villaId } = await params;

  const dbVilla = await getVillaById(villaId);
  const hasDbData = !!dbVilla;

  const villa = dbVilla || seedGetVillaById(villaId);
  const allVillas = hasDbData ? await getVillas() : seedVillas;

  if (!villa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Villa not found</h1>
          <p className="text-gray-500 mb-4">Select a villa for report:</p>
          {allVillas.map((v) => (
            <a key={v.id as string} href={`/reports/${v.id}`} className="block text-emerald-600 hover:underline mb-1">
              {v.name as string}
            </a>
          ))}
        </div>
      </div>
    );
  }

  const [reports, reservations, expenses] = hasDbData
    ? await Promise.all([
        getReportsForVilla(villaId),
        getReservationsForVilla(villaId),
        getExpensesForVilla(villaId),
      ])
    : [
        seedGetReports(villaId),
        seedGetReservations(villaId),
        seedGetExpenses(villaId),
      ];

  return (
    <ReportsClient
      villa={villa}
      villaId={villaId}
      reports={reports}
      reservations={reservations}
      expenses={expenses}
      allVillas={allVillas}
    />
  );
}
