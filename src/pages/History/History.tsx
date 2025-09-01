import { TrashIcon } from 'lucide-react';
import Container from '../../components/Container/Container';
import Heading from '../../components/Heading/Heading';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Button from '../../components/Button/Button';
import styles from './History.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

function History() {
  const { state, dispatch } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        direction: 'desc',
        field: 'startDate',
      };
    }
  );

  const messageConfirm =
    state.config.language === 'pt-BR'
      ? 'Você tem certeza que deseja apagar todo o histórico?'
      : 'Are you sure you want to delete all history?';

  const buttonLabel =
    state.config.language === 'pt-BR'
      ? 'Apagar todo o histórico'
      : 'Delete all history';

  const columnsTitles =
    state.config.language === 'pt-BR'
      ? {
          task: 'Tarefa',
          duration: 'Duração',
          startDate: 'Data',
          status: 'Status',
          type: 'Tipo',
        }
      : {
          task: 'Task',
          duration: 'Duration',
          startDate: 'Date',
          status: 'Status',
          type: 'Type',
        };

  const handleSortTasks = ({ field }: Pick<SortTasksOptions, 'field'>) => {
    const newDirection = sortTasksOptions.direction === 'asc' ? 'desc' : 'asc';

    setSortTasksOptions({
      tasks: sortTasks({ tasks: state.tasks, field, direction: newDirection }),
      direction: newDirection,
      field,
    });
  };

  const handleResetHistory = () => {
    showMessage.dismiss();
    showMessage.confirm(messageConfirm, (confirmation: boolean) => {
      if (!confirmation) return;
      dispatch({ type: TaskActionsTypes.RESET_TASKS });
    });
  };

  useEffect(() => {
    document.title =
      state.config.language === 'pt-BR'
        ? 'Histórico - Selah'
        : 'History - Selah';
  }, [state.config.language]);

  useEffect(() => {
    setSortTasksOptions((prev) => ({
      ...prev,
      tasks: sortTasks({
        tasks: state.tasks,
        field: prev.field,
        direction: prev.direction,
      }),
    }));
  }, [state.tasks]);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>
            {state.config.language === 'pt-BR' ? 'Histórico' : 'History'}
          </span>
          <span onClick={handleResetHistory} className={styles.buttonContainer}>
            <Button
              color='red'
              icon={<TrashIcon />}
              aria-label={buttonLabel}
              title={buttonLabel}
            />
          </span>
        </Heading>
      </Container>

      <Container>
        {sortTasksOptions.tasks.length > 0 && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    {columnsTitles.task}
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    {columnsTitles.duration}
                  </th>
                  <th
                    className={styles.thSort}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    {columnsTitles.startDate}
                  </th>
                  <th>{columnsTitles.status}</th>
                  <th>{columnsTitles.type}</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map((task, index) => {
                  const taskTypes =
                    state.config.language === 'pt-BR'
                      ? {
                          workTime: 'Foco',
                          shortBreakTime: 'Pausa curta',
                          longBreakTime: 'Pausa longa',
                        }
                      : {
                          workTime: 'Focus',
                          shortBreakTime: 'Short break',
                          longBreakTime: 'Long break',
                        };

                  return (
                    <tr key={index}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypes[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {sortTasksOptions.tasks.length === 0 && (
          <p style={{ textAlign: 'center' }}>
            {state.config.language === 'pt-BR'
              ? 'Nenhuma tarefa no histórico. Vá fazer uma agora!'
              : "No history. Let's do one now!"}
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}

export default History;
