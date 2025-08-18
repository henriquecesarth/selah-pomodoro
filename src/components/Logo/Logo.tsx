import RouterLink from '../RouterLink/RouterLink';
import styles from './Logo.module.css';
import { TimerIcon } from 'lucide-react';

const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <RouterLink href='/' className={styles.logoLink}>
        <TimerIcon />
        <span>Selah</span>
      </RouterLink>
    </h1>
  );
};

export default Logo;
