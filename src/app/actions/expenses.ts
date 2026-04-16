'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getExpensesForVilla(villaId: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('villa_id', villaId)
    .order('date', { ascending: false });

  if (error) {
    console.error('getExpensesForVilla error:', error);
    return [];
  }
  return data || [];
}

export async function createExpense(formData: FormData) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from('expenses').insert({
    villa_id: formData.get('villa_id') as string,
    category: formData.get('category') as string,
    amount_thb: Number(formData.get('amount_thb')),
    description: formData.get('description') as string,
    date: formData.get('date') as string || new Date().toISOString().split('T')[0],
  });

  if (error) {
    console.error('createExpense error:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}
