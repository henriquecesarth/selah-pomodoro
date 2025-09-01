import { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import {
  GlobeIcon,
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import RouterLink from '../RouterLink/RouterLink';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';

type PageTheme = 'dark' | 'light';

const Menu = () => {
  const { state, dispatch } = useTaskContext();
  const [theme, setTheme] = useState<PageTheme>(
    () => (localStorage.getItem('theme') as PageTheme) || 'dark'
  );

  const linksLabels =
    state.config.language === 'pt-BR'
      ? {
          home: 'Ir para a Home',
          history: 'Ver histórico',
          settings: 'Ir para as configurações',
          theme: 'Mudar tema da página',
          language: 'Mudar o idioma da página',
        }
      : {
          home: 'Go to Home',
          history: 'Go to History',
          settings: 'Go to Settings',
          theme: 'Change page theme',
          language: 'Change page language',
        };

  const handleThemeChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLanguageChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch({ type: TaskActionsTypes.CHANGE_LANGUAGE });
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
        aria-label={linksLabels.home}
        title={linksLabels.home}
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href='/history'
        className={styles.menuLink}
        aria-label={linksLabels.history}
        title={linksLabels.history}
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href='/settings'
        className={styles.menuLink}
        aria-label={linksLabels.settings}
        title={linksLabels.settings}
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href='#'
        className={styles.menuLink}
        aria-label={linksLabels.theme}
        title={linksLabels.theme}
        onClick={handleThemeChange}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </RouterLink>
      <RouterLink
        href='#'
        className={styles.menuLink}
        aria-label={linksLabels.language}
        title={linksLabels.language}
        onClick={handleLanguageChange}
      >
        <GlobeIcon />
      </RouterLink>
    </nav>
  );
};

export default Menu;
