'use server';

import { createServerSupabase } from '@/lib/supabase/server';

export async function getVillas() {
  const supabase = await createServerSupabase();
  const { data: villas, error } = await supabase
    .from('villas')
    .select('*')
    .eq('status', 'active')
    .order('name');

  if (error) {
    console.error('getVillas error:', error);
    return [];
  }

  // Get reservation counts for each villa
  const villasWithCounts = await Promise.all(
    (villas || []).map(async (villa) => {
      const { count } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('villa_id', villa.id)
        .in('status', ['confirmed', 'checked_in']);

      return { ...villa, active_reservations: count || 0 };
    })
  );

  return villasWithCounts;
}

export async function getVillaById(id: string) {
  const supabase = await createServerSupabase();
  const { data: villa, error } = await supabase
    .from('villas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getVillaById error:', error);
    return null;
  }
  return villa;
}

export async function getStaffMembers() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .order('name');

  if (error) {
    console.error('getStaffMembers error:', error);
    return [];
  }
  return data || [];
}
