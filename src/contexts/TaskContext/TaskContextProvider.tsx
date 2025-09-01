import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionsTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import { showMessage } from '../../adapters/showMessage';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { localStorageCleaner } from '../../utils/localStorageCleaner';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    localStorageCleaner();
    const localState = localStorage.getItem('state');

    if (!localState) return initialTaskState;

    const parsedLocalState = JSON.parse(localState) as TaskStateModel;

    return {
      ...parsedLocalState,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
      activeTask: null,
    };
  });

  const messageSuccess =
    state.config.language === 'pt-BR' ? 'Tarefa concluida' : 'Task completed';

  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e: MessageEvent) => {
    const secondsRemaining = e.data;

    if (secondsRemaining <= 0) {
      if (state.config.mode === 'Aly Mode') {
        playBeepRef.current?.();
        dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining },
      });
      } else {
        playBeepRef.current?.();
        playBeepRef.current = null;

        dispatch({ type: TaskActionsTypes.COMPLETE_TASK });
        worker.terminate();
        showMessage.success(messageSuccess);
      }
    } else {
      dispatch({
        type: TaskActionsTypes.COUNT_DOWN,
        payload: { secondsRemaining },
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
    document.documentElement.lang = state.config.language;

    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
    document.title = `${state.formattedSecondsRemaining} - Selah`;
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
