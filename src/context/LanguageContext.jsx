import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    it: {
        navbar: {
            about: 'About',
            certifications: 'Certificazioni',
            activities: 'Attività',
            contact: 'Contattami',
            blog: 'Blog',
        },
        about: {
            title: 'About Me',
            p1: 'Data & Solutions Architect con base a Roma.',
            p2: 'Passo le giornate a costruire soluzioni Cloud Open Source per Data & AI — e a convincere le persone che Kubernetes non morde.',
            p3: 'Nel tempo libero? Esploro nuove tech, leggo di finanza personale (spoiler: non sono ancora ricco), divoro libri e monto Gunpla.',
            p4: 'Dai un\'occhiata al blog!',
        },
        blog: {
            title: 'Blog',
            posts: 'Articoli',
            showPosts: 'Mostra articoli',
            noPostSelected: 'Seleziona un articolo da leggere',
        },
        certifications: {
            title: 'Certificazioni',
            viewAll: 'Visualizza tutte le mie credenziali su',
        },
        activities: {
            title: 'Letture',
            coursesTitle: 'Corsi',
            hobbiesTitle: 'Hobby',
            author: 'Autore',
            bookTitle: 'Titolo',
            platform: 'Piattaforma',
            courseName: 'Corso',
            activity: 'Attività',
            item: 'Oggetto',
            error: 'Impossibile caricare le letture al momento.',
        },
        footer: {
            cookiePolicy: 'Cookie Policy',
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            intro: 'Questo sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Nessun dato personale viene raccolto o condiviso con terze parti.',
            whatAreCookiesTitle: 'Cosa sono i cookie?',
            whatAreCookiesText: 'I cookie sono piccoli file di testo memorizzati sul tuo dispositivo quando visiti un sito web. Servono a ricordare le tue preferenze.',
            howWeUseCookiesTitle: 'Come utilizziamo i cookie?',
            howWeUseCookiesText: 'Utilizziamo solo cookie tecnici di prima parte per memorizzare le tue preferenze (tema chiaro/scuro, lingua). Non raccogliamo dati identificativi.',
            typesOfCookiesTitle: 'Tipi di cookie',
            necessaryCookies: 'Cookie tecnici',
            necessaryCookiesText: 'Essenziali per il funzionamento del sito. Memorizzano preferenze come lingua e tema (solo se modificato manualmente) tramite localStorage.',
            localStorageNote: 'Utilizziamo localStorage per: preferenza lingua, preferenza tema (se modificata).',
            analyticsCookies: 'Cookie di terze parti',
            analyticsCookiesText: 'Questo sito NON utilizza cookie di profilazione, analytics o pubblicità.',
            controlCookiesTitle: 'Come gestire i cookie?',
            controlCookiesText: 'Puoi gestire o eliminare i cookie dalle impostazioni del tuo browser in qualsiasi momento.',
            close: 'Chiudi',
        }
    },
    en: {
        navbar: {
            about: 'About',
            certifications: 'Certifications',
            activities: 'Activities',
            contact: 'Contact Me',
            blog: 'Blog',
        },
        about: {
            title: 'About Me',
            p1: 'Data & Solutions Architect based in Rome, Italy',
            p2: 'I spend my days building Open Source Cloud solutions for Data & AI — and convincing people that Kubernetes doesn\'t bite.',
            p3: 'Off the clock? I explore shiny new tech, read about personal finance (spoiler: still not rich), devour books, and build Gunpla.',
            p4: 'Check out my blog!',
        },
        blog: {
            title: 'Blog',
            posts: 'Posts',
            showPosts: 'Show posts',
            noPostSelected: 'Select a post to read',
        },
        certifications: {
            title: 'Certifications',
            viewAll: 'View all my credentials on',
        },
        activities: {
            title: 'Current Readings',
            coursesTitle: 'Current Courses',
            hobbiesTitle: 'Hobbies',
            author: 'Author',
            bookTitle: 'Title',
            platform: 'Platform',
            courseName: 'Course',
            activity: 'Activity',
            item: 'Item',
            error: 'Unable to load readings at the moment.',
        },
        footer: {
            cookiePolicy: 'Cookie Policy',
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            intro: 'This site uses only essential technical cookies. No personal data is collected or shared with third parties.',
            whatAreCookiesTitle: 'What are cookies?',
            whatAreCookiesText: 'Cookies are small text files stored on your device when you visit a website. They help remember your preferences.',
            howWeUseCookiesTitle: 'How do we use cookies?',
            howWeUseCookiesText: 'We only use first-party technical cookies to store your preferences (light/dark theme, language). No identifying data is collected.',
            typesOfCookiesTitle: 'Types of cookies',
            necessaryCookies: 'Technical cookies',
            necessaryCookiesText: 'Essential for the site to function. They store preferences like language and theme (only if manually changed) via localStorage.',
            localStorageNote: 'We use localStorage for: language preference, theme preference (if changed).',
            analyticsCookies: 'Third-party cookies',
            analyticsCookiesText: 'This site does NOT use profiling, analytics, or advertising cookies.',
            controlCookiesTitle: 'How to manage cookies?',
            controlCookiesText: 'You can manage or delete cookies from your browser settings at any time.',
            close: 'Close',
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: toggleLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
