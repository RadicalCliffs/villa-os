'use server';

import { createServerSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface TaskFilters {
  villa_id?: string;
  type?: string;
  assigned_to?: string;
  status?: string;
}

export async function getTasks(filters?: TaskFilters) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from('tasks')
    .select('*, villas(id, name), staff(id, name, phone)')
    .order('scheduled_date', { ascending: false });

  if (filters?.villa_id && filters.villa_id !== 'all') {
    query = query.eq('villa_id', filters.villa_id);
  }
  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type);
  }
  if (filters?.assigned_to && filters.assigned_to !== 'all') {
    query = query.eq('assigned_to', filters.assigned_to);
  }
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('getTasks error:', error);
    return [];
  }
  return data || [];
}

export async function createTask(formData: FormData) {
  const supabase = await createServerSupabase();

  const { error } = await supabase.from('tasks').insert({
    villa_id: formData.get('villa_id') as string,
    type: formData.get('type') as string,
    assigned_to: formData.get('assigned_to') as string,
    priority: formData.get('priority') as string,
    notes: formData.get('notes') as string,
    scheduled_date: new Date().toISOString().split('T')[0],
    status: 'pending',
  });

  if (error) {
    console.error('createTask error:', error);
    return { error: error.message };
  }

  revalidatePath('/tasks');
  return { success: true };
}

export async function updateTaskStatus(id: string, status: string) {
  const supabase = await createServerSupabase();

  const updates: Record<string, unknown> = { status };
  if (status === 'completed') {
    updates.completed_at = new Date().toISOString();
  }

  const { error } = await supabase.from('tasks').update(updates).eq('id', id);

  if (error) {
    console.error('updateTaskStatus error:', error);
    return { error: error.message };
  }

  revalidatePath('/tasks');
  return { success: true };
}
