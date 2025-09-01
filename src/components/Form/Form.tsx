import { CirclePlayIcon, CircleStopIcon } from 'lucide-react';
import styles from './Form.module.css';
import Input from '../Input/Input';
import Cycles from '../Cycles/Cycles';
import Button from '../Button/Button';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import Tips from '../Tips/Tips';
import { showMessage } from '../../adapters/showMessage';

const Form = () => {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.activeTask?.name || '';

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const messages = state.language === 'pt-BR' ? {
    messageWarning: 'Digite o nome da tarefa',
    messageSuccess: 'Tarefa iniciada',
    messageError: 'Tarefa interrompida',
  } : {
    messageWarning: 'Enter the task name',
    messageSuccess: 'Task started',
    messageError: 'Task interrupted',
  };

  const inputLabels = state.language === 'pt-BR' ? {
    labelText: 'Tarefa',
    placeHolder: 'Digite o nome da tarefa',
  } : {
    labelText: 'Task',
    placeHolder: 'Enter the task name',
  };

  const buttonLabels = state.language === 'pt-BR' ? {
    start: 'Iniciar Tarefa',
    stop: 'Parar Tarefa',
  } : {
    start: 'Start Task',
    stop: 'Stop Task',
  };

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning(messages.messageWarning);
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionsTypes.START_TASK, payload: newTask });
    showMessage.success(messages.messageSuccess);
  };

  const handleStopTask = () => {
    dispatch({ type: TaskActionsTypes.STOP_TASK });
    showMessage.error(messages.messageError);
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <div className={styles.formRow}>
        <Input
          id='myInput'
          labelText={inputLabels.labelText}
          type='text'
          placeholder={inputLabels.placeHolder}
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>
      <div className={styles.formRow}>
        <Tips nextCycleType={nextCycleType} />
      </div>
      {state.currentCycle > 0 && (
        <div className={styles.formRow}>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {state.activeTask && (
          <Button
            type='button'
            aria-label={buttonLabels.stop}
            title={buttonLabels.stop}
            icon={<CircleStopIcon />}
            color='red'
            onClick={handleStopTask}
            key='stop-task-button'
          />
        )}

        {!state.activeTask && (
          <Button
            type='submit'
            aria-label={buttonLabels.start}
            title={buttonLabels.start}
            icon={<CirclePlayIcon />}
            color='green'
            key='start-task-button'
          />
        )}
      </div>
    </form>
  );
};

export default Form;
