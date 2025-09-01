import styles from './Footer.module.css';
import RouterLink from '../RouterLink/RouterLink';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

const Footer = () => {
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>
      <RouterLink href='/about'>
        {state.language === 'pt-BR'
          ? 'Entenda a técnica Pomodoro'
          : 'Understand the Pomodoro Technique'}{' '}
        🍅
      </RouterLink>
      <RouterLink href='/'>
        Selah &copy; {new Date().getFullYear()} -{' '}
        {state.language === 'pt-BR' ? 'Feito com' : 'Made with'} 💜
      </RouterLink>
    </div>
  );
};

export default Footer;
