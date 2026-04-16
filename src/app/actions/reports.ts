'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export async function getReportsForVilla(villaId: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('owner_reports')
    .select('*')
    .eq('villa_id', villaId)
    .order('month', { ascending: false });

  if (error) {
    console.error('getReportsForVilla error:', error);
    return [];
  }
  return data || [];
}

export async function getAllVillaRevenues() {
  const supabase = await createServerSupabase();

  // Get the latest month's reports for all villas
  const { data, error } = await supabase
    .from('owner_reports')
    .select('*, villas(id, name)')
    .order('month', { ascending: false });

  if (error) {
    console.error('getAllVillaRevenues error:', error);
    return [];
  }

  // Group by villa and take latest month
  const latestByVilla = new Map<string, (typeof data)[0]>();
  for (const report of data || []) {
    if (!latestByVilla.has(report.villa_id)) {
      latestByVilla.set(report.villa_id, report);
    }
  }

  return Array.from(latestByVilla.values());
}
