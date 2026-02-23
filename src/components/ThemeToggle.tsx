import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`切换到${theme === 'morning' ? '深夜' : '晨间'}模式`}
      title={`切换到${theme === 'morning' ? '深夜' : '晨间'}模式`}
    >
      <div className={`${styles.iconContainer} ${styles[theme]}`}>
        <span className={styles.sunIcon} aria-hidden="true">
          ☀️
        </span>
        <span className={styles.moonIcon} aria-hidden="true">
          🌙
        </span>
      </div>
    </button>
  );
};
