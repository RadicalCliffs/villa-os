'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ClipboardList, Filter, Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/nav-header';
import { WhatsAppNotify } from '@/components/whatsapp-notify';
import { useToast } from '@/components/ui/toast';
import { formatDate } from '@/lib/utils';
import { createTask, updateTaskStatus } from '@/app/actions/tasks';

type TaskStatus = 'pending' | 'in_progress' | 'completed';
type TaskType = 'cleaning' | 'pool' | 'garden' | 'maintenance' | 'repair' | 'laundry';

const taskTypeColors: Record<string, string> = {
  cleaning: 'bg-blue-100 text-blue-800 border-l-blue-500',
  pool: 'bg-cyan-100 text-cyan-800 border-l-cyan-500',
  garden: 'bg-green-100 text-green-800 border-l-green-500',
  maintenance: 'bg-orange-100 text-orange-800 border-l-orange-500',
  repair: 'bg-red-100 text-red-800 border-l-red-500',
  laundry: 'bg-purple-100 text-purple-800 border-l-purple-500',
};

const taskTypeBorderColors: Record<string, string> = {
  cleaning: 'border-l-blue-500',
  pool: 'border-l-cyan-500',
  garden: 'border-l-green-500',
  maintenance: 'border-l-orange-500',
  repair: 'border-l-red-500',
  laundry: 'border-l-purple-500',
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

interface TaskBoardClientProps {
  initialTasks: Array<Record<string, unknown>>;
  villas: Array<Record<string, unknown>>;
  staff: Array<Record<string, unknown>>;
  hasDbData: boolean;
}

export function TaskBoardClient({ initialTasks, villas, staff, hasDbData }: TaskBoardClientProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filterVilla, setFilterVilla] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStaff, setFilterStaff] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const filteredTasks = tasks.filter((t: Record<string, unknown>) => {
    if (filterVilla !== 'all' && t.villa_id !== filterVilla) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterStaff !== 'all' && t.assigned_to !== filterStaff) return false;
    return true;
  });

  async function handleCreateTask(e: React.FormEvent) {
    e.preventDefault();
    if (!hasDbData) {
      toast('Demo mode - tasks are read-only', 'info');
      return;
    }
    const formData = new FormData(formRef.current!);
    const result = await createTask(formData);
    if (result.error) {
      toast(result.error, 'error');
    } else {
      toast('Task created');
      setShowAddForm(false);
      window.location.reload();
    }
  }

  function handleDragStart(e: React.DragEvent, taskId: string) {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingId(taskId);
  }

  function handleDragOver(e: React.DragEvent, status: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  }

  function handleDragLeave() {
    setDragOverColumn(null);
  }

  async function handleDrop(e: React.DragEvent, newStatus: string) {
    e.preventDefault();
    setDragOverColumn(null);
    setDraggingId(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    setTasks((prev) =>
      prev.map((t) => ((t.id as string) === taskId ? { ...t, status: newStatus } : t))
    );

    if (hasDbData) {
      const result = await updateTaskStatus(taskId, newStatus);
      if (result.error) {
        toast(result.error, 'error');
        setTasks(initialTasks);
      } else {
        toast(`Task moved to ${newStatus.replace('_', ' ')}`);
      }
    } else {
      toast('Task moved (demo mode)');
    }
  }

  function getVillaName(villaId: string): string {
    const v = villas.find((v) => v.id === villaId);
    return (v?.name as string) || '';
  }

  function getStaffInfo(task: Record<string, unknown>): { name: string; phone: string } | null {
    if (hasDbData && task.staff) {
      const s = task.staff as { name: string; phone: string };
      return s.name ? s : null;
    }
    const s = staff.find((s) => s.id === task.assigned_to);
    return s ? { name: s.name as string, phone: s.phone as string } : null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />

      {/* Header Banner */}
      <div className="relative h-32 md:h-40 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=400&fit=crop&q=85"
          alt="Team working"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-indigo-800/70 to-blue-700/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <ClipboardList className="h-7 w-7" />
              Task Board
            </h2>
            <p className="text-white/70 mt-1">Drag tasks between columns to update status</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-end mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? 'Close' : 'Add Task'}
          </Button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <Card className="mb-6 animate-slide-up">
            <CardContent className="py-4">
              <form ref={formRef} onSubmit={handleCreateTask}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Villa</label>
                    <select name="villa_id" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      {villas.map((v) => (
                        <option key={v.id as string} value={v.id as string}>{v.name as string}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      {(['cleaning', 'pool', 'garden', 'maintenance', 'repair', 'laundry'] as const).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                    <select name="assigned_to" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      {staff.map((s) => (
                        <option key={s.id as string} value={s.id as string}>{s.name as string} ({s.role as string})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select name="priority" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea name="notes" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} placeholder="Task description..." />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button type="submit" size="sm">Create Task</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Filter className="h-4 w-4 text-gray-500" />
          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" value={filterVilla} onChange={(e) => setFilterVilla(e.target.value)}>
            <option value="all">All Villas</option>
            {villas.map((v) => <option key={v.id as string} value={v.id as string}>{v.name as string}</option>)}
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            {(['cleaning', 'pool', 'garden', 'maintenance', 'repair', 'laundry'] as const).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm" value={filterStaff} onChange={(e) => setFilterStaff(e.target.value)}>
            <option value="all">All Staff</option>
            {staff.map((s) => <option key={s.id as string} value={s.id as string}>{s.name as string}</option>)}
          </select>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t: Record<string, unknown>) => t.status === col.status);
            const isOver = dragOverColumn === col.status;
            return (
              <div
                key={col.status}
                onDragOver={(e) => handleDragOver(e, col.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.status)}
                className={`rounded-lg transition-colors ${isOver ? 'bg-emerald-50 ring-2 ring-emerald-300' : ''}`}
              >
                <div className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${col.color}`}>
                  <h3 className="font-semibold text-gray-900">{col.label}</h3>
                  <span className="text-sm text-gray-500">({colTasks.length})</span>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  {colTasks.map((task: Record<string, unknown>) => {
                    const villaName = hasDbData
                      ? ((task.villas as { name: string } | null)?.name || '')
                      : getVillaName(task.villa_id as string);
                    const staffInfo = getStaffInfo(task);
                    const isDragging = draggingId === (task.id as string);
                    const borderColor = taskTypeBorderColors[task.type as string] || 'border-l-gray-300';

                    return (
                      <Card
                        key={task.id as string}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id as string)}
                        onDragEnd={() => setDraggingId(null)}
                        className={`cursor-grab active:cursor-grabbing card-hover border-l-4 ${borderColor} ${
                          isDragging ? 'opacity-50 scale-95 rotate-1' : ''
                        }`}
                      >
                        <CardContent className="py-3">
                          <div className="flex items-start justify-between mb-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${taskTypeColors[task.type as string]?.split(' ').slice(0, 2).join(' ') || ''}`}>
                              {task.type as string}
                            </span>
                            <Badge variant={priorityVariants[task.priority as string] || 'default'}>{task.priority as string}</Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{villaName}</p>
                          <p className="text-xs text-gray-500 mb-2">{task.notes as string}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-2">
                              {staffInfo && <span>{staffInfo.name}</span>}
                              {staffInfo?.phone && (
                                <WhatsAppNotify
                                  phone={staffInfo.phone}
                                  message={`VillaOS Task: ${task.type} at ${villaName} - ${task.notes}`}
                                />
                              )}
                            </div>
                            <span>{formatDate(task.scheduled_date as string)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {colTasks.length === 0 && (
                    <div className={`text-sm text-gray-400 text-center py-8 border-2 border-dashed rounded-lg ${
                      isOver ? 'border-emerald-300 text-emerald-500' : 'border-gray-200'
                    }`}>
                      {isOver ? 'Drop here' : 'No tasks'}
                    </div>
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
