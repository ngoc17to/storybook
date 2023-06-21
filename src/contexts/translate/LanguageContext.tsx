import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

type LanguageContextReturnType = {
    language: string
    setLanguage: (language: string) => void
    t: (text: string) => string
}

type LanguageType = () => LanguageContextReturnType

const LanguageContext = createContext<LanguageContextReturnType>({} as LanguageContextReturnType);

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) =>
{
    const intialLanguage = localStorage.getItem('MYAPP_LANGUAGE');

    const [language, setLanguage] = useState<string>((intialLanguage === null) ? 'vi' : intialLanguage);

    useEffect(() =>
    {
        localStorage.setItem('MYAPP_LANGUAGE', language);
    }, [language]);

    const t = (text: string) =>
    {
        if (language === 'vi') {return text;}

        let loadedLanguage: Record<string, string> = {};

        try
        {
            loadedLanguage = require(`./languages/${language}.json`);
        }
        catch (e)
        {
            console.log('Error:', e);
        }
                            
        return loadedLanguage[text] || text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

const useLanguage: LanguageType = () =>
{
    const context = useContext(LanguageContext);
    return context;
};

export { LanguageProvider, useLanguage };
