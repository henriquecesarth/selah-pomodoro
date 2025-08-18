import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';

type TipsProps = {
  nextCycleType: TaskModel['type'];
};

const Tips = ({ nextCycleType }: TipsProps) => {
  const { state } = useTaskContext();

  const tipsForWhenActiveTask = {
    workTime: <span>Mantenha o foco e evite distrações.</span>,
    shortBreakTime: <span>Aproveite para se alongar e relaxar.</span>,
    longBreakTime: <span>Desconecte-se e faça algo que te relaxe.</span>,
  };

  const tipsForWhenNotActiveTask = {
    workTime: (
      <span>
        Nesse ciclo
        <strong> tenha foco </strong>
        por <strong>{state.config.workTime} min.</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        Nesse ciclo
        <strong> descanse </strong>
        por <strong>{state.config.shortBreakTime} min.</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        Nesse ciclo
        <strong> descanse </strong>
        por <strong>{state.config.longBreakTime} min.</strong>
      </span>
    ),
  };

  return (
    <>
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}

      {!state.activeTask && tipsForWhenNotActiveTask[nextCycleType]}
    </>
  );
};

export default Tips;
