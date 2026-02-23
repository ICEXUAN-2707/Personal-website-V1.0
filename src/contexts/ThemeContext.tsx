import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Theme, ThemeColors } from '../types';
import { themes } from '../utils/constants';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('morning');

  // Apply CSS Variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];

    // Set data-theme attribute for CSS selector
    root.setAttribute('data-theme', theme);

    // Inject CSS Variables
    root.style.setProperty('--bg-primary', colors.bgPrimary);
    root.style.setProperty('--bg-secondary', colors.bgSecondary);
    root.style.setProperty('--accent-1', colors.accent1);
    root.style.setProperty('--accent-2', colors.accent2);
    root.style.setProperty('--accent-3', colors.accent3);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'morning' ? 'night' : 'morning'));
  };

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    colors: themes[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
