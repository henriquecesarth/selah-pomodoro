import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import RouterLink from '../RouterLink/RouterLink';

type PageTheme = 'dark' | 'light';

const Menu = () => {
  const [theme, setTheme] = useState<PageTheme>(
    () => (localStorage.getItem('theme') as PageTheme) || 'dark'
  );

  const handleThemeChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        href='/'
        className={styles.menuLink}
        aria-label='Ir para a Home'
        title='Ir para a Home'
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href='/history'
        className={styles.menuLink}
        aria-label='Ver histórico'
        title='Ver histórico'
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href='/settings'
        className={styles.menuLink}
        aria-label='Ir para as configurações'
        title='Ir para as configurações'
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href='#'
        className={styles.menuLink}
        aria-label='Mudar tema da página'
        title='Mudar tema da página'
        onClick={handleThemeChange}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </RouterLink>
    </nav>
  );
};

export default Menu;
