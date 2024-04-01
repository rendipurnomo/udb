import { createContext, useContext, useState, useEffect } from 'react'

export const ThemeProviderContext = createContext()

export const ThemeProvider = ({ children, defaultTheme='dark', storageKey='theme', ...props }) => {
  const storage = localStorage.getItem(storageKey) || defaultTheme
  const [theme, setTheme] = useState(storage)

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if(theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme)=>{
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  }

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}