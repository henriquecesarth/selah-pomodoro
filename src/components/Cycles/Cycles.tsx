import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './Cycles.module.css';
// type Props = {};

const Cycles = () => {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'Indicador de Ciclo de Foco',
    shortBreakTime: 'Indicador de Ciclo de Descanso Curto',
    longBreakTime: 'Indicador de Ciclo de Descanso Longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}> 
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              aria-label={cycleDescriptionMap[nextCycleType]}
              title={cycleDescriptionMap[nextCycleType]}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default Cycles;
