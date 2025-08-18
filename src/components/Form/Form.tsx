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

  const handleCreateNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning('Digite o nome da tarefa');
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
    showMessage.success('Tarefa iniciada');
  };

  const handleStopTask = () => {
    dispatch({ type: TaskActionsTypes.STOP_TASK });
    showMessage.error('Tarefa interrompida!');
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form}>
      <div className={styles.formRow}>
        <Input
          id='meuInput'
          labelText='Tarefa'
          type='text'
          placeholder='Digite uma tarefa'
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
            aria-label='Parar tarefa'
            title='Parar tarefa'
            icon={<CircleStopIcon />}
            color='red'
            onClick={handleStopTask}
            key='stop-task-button'
          />
        )}

        {!state.activeTask && (
          <Button
            type='submit'
            aria-label='Iniciar tarefa'
            title='Iniciar tarefa'
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
