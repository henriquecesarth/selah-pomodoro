import type { TaskModel } from '../../models/TaskModel';

export enum TaskActionsTypes {
  START_TASK = 'START_TASK',
  STOP_TASK = 'STOP_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  RESET_TASKS = 'RESET_TASKS',
  SAVE_CONFIG = 'SAVE_CONFIG',
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE',
}

export type TaskActionsWithPayload =
  | {
      type: TaskActionsTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: TaskActionsTypes.COUNT_DOWN;
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActionsTypes.SAVE_CONFIG;
      payload: {
        workTime: number;
        shortBreakTime: number;
        longBreakTime: number;
      };
    };

export type TaskActionsWithoutPayload =
  | {
      type: TaskActionsTypes.STOP_TASK;
    }
  | {
      type: TaskActionsTypes.COMPLETE_TASK;
    }
  | {
      type: TaskActionsTypes.RESET_TASKS;
    }
  | {
      type: TaskActionsTypes.CHANGE_LANGUAGE;
    };

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
