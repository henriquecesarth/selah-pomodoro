import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';

type TipsProps = {
  nextCycleType: TaskModel['type'];
};

const Tips = ({ nextCycleType }: TipsProps) => {
  const { state } = useTaskContext();

  const tipsForWhenActiveTask =
    state.language === 'pt-BR'
      ? {
          workTime: <span>Mantenha o foco e evite distrações.</span>,
          shortBreakTime: <span>Aproveite para se alongar e relaxar.</span>,
          longBreakTime: <span>Desconecte-se e faça algo que te relaxe.</span>,
        }
      : {
          workTime: <span>Maintain focus and avoid distractions.</span>,
          shortBreakTime: (
            <span>Take the opportunity to stretch and relax.</span>
          ),
          longBreakTime: (
            <span>Disconnect and do something that relaxes you.</span>
          ),
        };

  const tipsForWhenNotActiveTask = state.language === 'pt-BR' ? {
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
  } : {
    workTime: (
      <span>
        In this cycle
        <strong> have focus </strong>
        for <strong>{state.config.workTime} min.</strong>
      </span>
    ),
    shortBreakTime: (
      <span>
        In this cycle
        <strong> relax </strong>
        for <strong>{state.config.shortBreakTime} min.</strong>
      </span>
    ),
    longBreakTime: (
      <span>
        In this cycle
        <strong> relax </strong>
        for <strong>{state.config.longBreakTime} min.</strong>
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
