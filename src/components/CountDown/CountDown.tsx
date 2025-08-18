import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './CountDown.module.css';

const CountDown = () => {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>
      {state.formattedSecondsRemaining}
    </div>
  );
};

export default CountDown;
