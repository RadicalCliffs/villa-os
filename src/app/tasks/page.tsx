'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ClipboardList, Filter, Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import {
  tasks as allTasks,
  villas,
  staff,
  getVillaById,
  getStaffById,
  type TaskType,
  type TaskStatus,
} from '@/lib/seed-data';

const taskTypeColors: Record<TaskType, string> = {
  cleaning: 'bg-blue-100 text-blue-800',
  pool: 'bg-cyan-100 text-cyan-800',
  garden: 'bg-green-100 text-green-800',
  maintenance: 'bg-orange-100 text-orange-800',
  repair: 'bg-red-100 text-red-800',
  laundry: 'bg-purple-100 text-purple-800',
};

const priorityVariants: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
  low: 'default',
  medium: 'success',
  high: 'warning',
  urgent: 'danger',
};

const columns: { status: TaskStatus; label: string; color: string }[] = [
  { status: 'pending', label: 'Pending', color: 'border-gray-300' },
  { status: 'in_progress', label: 'In Progress', color: 'border-amber-400' },
  { status: 'completed', label: 'Completed', color: 'border-green-400' },
];

export default function TaskBoardPage() {
  const [filterVilla, setFilterVilla] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStaff, setFilterStaff] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredTasks = allTasks.filter(t => {
    if (filterVilla !== 'all' && t.villa_id !== filterVilla) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterStaff !== 'all' && t.assigned_to !== filterStaff) return false;
    return true;
  });

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
              <Link href="/tasks" className="text-white hover:text-white">Tasks</Link>
              <Link href="/reports/v1" className="text-white/80 hover:text-white">Reports</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-emerald-600" />
            Task Board
          </h2>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? 'Close' : 'Add Task'}
          </Button>
        </div>

        {/* Add Task Form (inline stub) */}
        {showAddForm && (
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Villa</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {villas.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {(['cleaning', 'pool', 'garden', 'maintenance', 'repair', 'laundry'] as const).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {staff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.role})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} placeholder="Task description..." />
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Create Task</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            value={filterVilla}
            onChange={e => setFilterVilla(e.target.value)}
          >
            <option value="all">All Villas</option>
            {villas.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {(['cleaning', 'pool', 'garden', 'maintenance', 'repair', 'laundry'] as const).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            value={filterStaff}
            onChange={e => setFilterStaff(e.target.value)}
          >
            <option value="all">All Staff</option>
            {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.status);
            return (
              <div key={col.status}>
                <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${col.color}`}>
                  <h3 className="font-semibold text-gray-900">{col.label}</h3>
                  <span className="text-sm text-gray-500">({colTasks.length})</span>
                </div>
                <div className="space-y-3">
                  {colTasks.map(task => {
                    const villa = getVillaById(task.villa_id);
                    const assignedStaff = getStaffById(task.assigned_to);
                    return (
                      <Card key={task.id} className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                        <CardContent className="py-3">
                          <div className="flex items-start justify-between mb-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${taskTypeColors[task.type]}`}>
                              {task.type}
                            </span>
                            <Badge variant={priorityVariants[task.priority]}>{task.priority}</Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{villa?.name}</p>
                          <p className="text-xs text-gray-500 mb-2">{task.notes}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            {assignedStaff && <span>{assignedStaff.name}</span>}
                            <span>{formatDate(task.scheduled_date)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {colTasks.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8">No tasks</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
