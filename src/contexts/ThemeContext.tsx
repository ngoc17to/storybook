import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
type ThemeContextReturnType = {
    theme: string
    toggleTheme: () => void
    setTheme: (theme: string) => void
}
const ThemeContext = createContext<ThemeContextReturnType>({} as ThemeContextReturnType);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) =>
{
    const intialTheme = localStorage.getItem('MYAPP_THEME');

    const [theme, setTheme] = useState<string>((intialTheme === null) ? 'light' : intialTheme);

    const toggleTheme = () =>
    {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    useEffect(() =>
    {
        const currentTheme = localStorage.getItem('MYAPP_THEME');

        document.body.classList.remove(`${currentTheme}-mode`);
        document.body.classList.add(`${theme}-mode`);

        localStorage.setItem('MYAPP_THEME', theme);
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
type useThemeType = () => ThemeContextReturnType

const useTheme: useThemeType = () =>
{
    const context = useContext(ThemeContext);
    return context;
};

export { ThemeProvider, useTheme };
