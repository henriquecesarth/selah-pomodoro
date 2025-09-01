import type { TaskStateModel } from '../../models/TaskStateModel';

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    type: {
      workTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    },
    mode: 'Normal',
    language: 'en-US',
  },
};
