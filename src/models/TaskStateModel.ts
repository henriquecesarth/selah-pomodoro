import type { TaskModel } from './TaskModel';

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    type: {
      workTime: number;
      shortBreakTime: number;
      longBreakTime: number;
    };
    mode: string;
    language: string;
  };
};
