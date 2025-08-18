import styles from './Footer.module.css';
import RouterLink from '../RouterLink/RouterLink';

const Footer = () => {
  return (
    <div className={styles.container}>
      <RouterLink href='/about'>Entenda a técnica Pomodoro 🍅</RouterLink>
      <RouterLink href='/'>
        Selah &copy; {new Date().getFullYear()} - Feito com 💜
      </RouterLink>
    </div>
  );
};

export default Footer;
