import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        // First check localStorage (user's explicit choice)
        const storedTheme = window.localStorage.getItem('color-theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
        // Then fall back to OS preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    // Listen for OS theme changes only if user hasn't set a preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only follow OS changes if no localStorage preference exists
            const storedTheme = window.localStorage.getItem('color-theme');
            if (!storedTheme) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            // Save user's explicit choice to localStorage
            window.localStorage.setItem('color-theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
