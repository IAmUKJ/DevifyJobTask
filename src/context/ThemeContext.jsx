import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, initialTheme = 'light' }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage or use initial theme
    const savedTheme = localStorage.getItem('skeleton-theme');
    return savedTheme || initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('skeleton-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setCustomTheme = (customTheme) => {
    setTheme(customTheme);
  };

  // Default theme configurations
  const themeConfig = {
    light: {
      backgroundColor: '#f0f0f0',
      highlightColor: '#ffffff',
      textColor: '#333333',
      borderColor: '#e0e0e0'
    },
    dark: {
      backgroundColor: '#2a2a2a',
      highlightColor: '#404040',
      textColor: '#ffffff',
      borderColor: '#444444'
    },
    neon: {
      backgroundColor: '#1a1a2e',
      highlightColor: '#16213e',
      textColor: '#00ff88',
      borderColor: '#00ff88'
    },
    ocean: {
      backgroundColor: '#e3f2fd',
      highlightColor: '#ffffff',
      textColor: '#1565c0',
      borderColor: '#90caf9'
    }
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    setCustomTheme,
    themeConfig: themeConfig[theme] || themeConfig.light
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};