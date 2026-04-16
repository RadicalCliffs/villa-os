'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getReservationsForVilla(villaId: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('villa_id', villaId)
    .order('check_in', { ascending: true });

  if (error) {
    console.error('getReservationsForVilla error:', error);
    return [];
  }
  return data || [];
}

export async function getTodayReservations() {
  const supabase = await createServerSupabase();
  const today = new Date().toISOString().split('T')[0];

  const { data: checkIns } = await supabase
    .from('reservations')
    .select('*, villas(id, name)')
    .eq('check_in', today)
    .eq('status', 'confirmed');

  const { data: checkOuts } = await supabase
    .from('reservations')
    .select('*, villas(id, name)')
    .eq('check_out', today)
    .in('status', ['checked_in', 'confirmed']);

  return {
    checkIns: checkIns || [],
    checkOuts: checkOuts || [],
  };
}

export async function createReservation(formData: FormData) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from('reservations').insert({
    villa_id: formData.get('villa_id') as string,
    guest_name: formData.get('guest_name') as string,
    guest_email: formData.get('guest_email') as string || null,
    guest_phone: formData.get('guest_phone') as string || null,
    check_in: formData.get('check_in') as string,
    check_out: formData.get('check_out') as string,
    source: formData.get('source') as string,
    total_revenue: Number(formData.get('total_revenue')),
    status: 'confirmed',
    commission_rate: Number(formData.get('commission_rate')) || 0,
    notes: formData.get('notes') as string || null,
  });

  if (error) {
    console.error('createReservation error:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}
