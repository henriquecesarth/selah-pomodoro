import type { TaskModel } from '../models/TaskModel';

export const getTaskStatus = (task: TaskModel, activeTask: TaskModel | null) => {
  if (task.completeDate) return 'Concluida';
  else if (task.interruptDate) return 'Interrompida';
  else if (task.id === activeTask?.id) return 'Em andamento';
  else return 'Abandonada';
};
