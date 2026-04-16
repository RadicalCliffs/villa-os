import { getTasks } from '@/app/actions/tasks';
import { getVillas, getStaffMembers } from '@/app/actions/villas';
import { TaskBoardClient } from './task-board-client';
import {
  tasks as seedTasks,
  villas as seedVillas,
  staff as seedStaff,
} from '@/lib/seed-data';

export default async function TaskBoardPage() {
  const [dbTasks, dbVillas, dbStaff] = await Promise.all([
    getTasks(),
    getVillas(),
    getStaffMembers(),
  ]);

  const hasDbData = dbTasks.length > 0;

  return (
    <TaskBoardClient
      initialTasks={hasDbData ? dbTasks : seedTasks}
      villas={hasDbData ? dbVillas : seedVillas}
      staff={hasDbData ? dbStaff : seedStaff}
      hasDbData={hasDbData}
    />
  );
}
