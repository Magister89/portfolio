import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    it: {
        navbar: {
            about: 'Chi sono',
            certifications: 'Certificazioni',
            activities: 'Attività',
            contact: 'Contattami',
        },
        about: {
            title: 'Chi Sono',
            p1: 'Sono un Data & Solutions Architect con base a Roma, Italia.',
            p2: 'Attualmente sono focalizzato su soluzioni Cloud Open Source, per ambito Data & AI.',
            p3: 'Quando non progetto architetture, adoro esplorare nuove tecnologie, finanza personale, leggere libri e montare Gunpla.',
            p4: 'Blog coming soon ...',
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
        cookieBanner: {
            text: 'Questo sito utilizza solo cookie tecnici necessari al funzionamento. Non vengono utilizzati cookie di profilazione o di terze parti.',
            readPolicy: 'Leggi la Cookie Policy',
            accept: 'Accetto',
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            intro: 'Questa Cookie Policy spiega cosa sono i cookie e come li utilizziamo. Ti invitiamo a leggere questa politica per capire quali tipi di cookie utilizziamo, le informazioni che raccogliamo tramite i cookie e come tali informazioni vengono utilizzate.',
            whatAreCookiesTitle: 'Cosa sono i cookie?',
            whatAreCookiesText: 'I cookie sono piccoli file di testo che vengono utilizzati per memorizzare piccole informazioni. Vengono memorizzati sul tuo dispositivo quando il sito web viene caricato sul tuo browser. Questi cookie ci aiutano a far funzionare correttamente il sito web, a renderlo più sicuro e a fornire una migliore esperienza utente.',
            howWeUseCookiesTitle: 'Come utilizziamo i cookie?',
            howWeUseCookiesText: 'Come la maggior parte dei servizi online, il nostro sito web utilizza cookie proprietari per scopi tecnici. I cookie proprietari sono per lo più necessari per il corretto funzionamento del sito web e non raccolgono alcuno dei tuoi dati personali identificabili.',
            typesOfCookiesTitle: 'Quali tipi di cookie utilizziamo?',
            necessaryCookies: 'Necessari (Tecnici):',
            necessaryCookiesText: 'Alcuni cookie sono essenziali per permetterti di provare la piena funzionalità del nostro sito. Ci permettono di mantenere le sessioni utente e prevenire eventuali minacce alla sicurezza. Non raccolgono né memorizzano alcuna informazione personale.',
            localStorageNote: "Nello specifico, utilizziamo il Local Storage del browser per memorizzare la tua preferenza di consenso ai cookie (chiave: 'cookieConsent'), in modo da non mostrarti nuovamente il banner ad ogni visita.",
            analyticsCookies: 'Statistici / Profilazione:',
            analyticsCookiesText: 'Questo sito NON utilizza cookie di profilazione o di terze parti per tracciare il comportamento degli utenti o per fini pubblicitari.',
            controlCookiesTitle: 'Come posso controllare le preferenze sui cookie?',
            controlCookiesText: "Oltre a quanto indicato in questo documento, l'utente può gestire le preferenze relative ai Cookie direttamente all'interno del proprio browser ed impedire – ad esempio – che terze parti possano installarne. Tramite le preferenze del browser è inoltre possibile eliminare i Cookie installati in passato.",
            close: 'Ho capito',
        }
    },
    en: {
        navbar: {
            about: 'About Me',
            certifications: 'Certifications',
            activities: 'Activities',
            contact: 'Contact Me',
        },
        about: {
            title: 'About Me',
            p1: 'I am a Data & Solutions Architect based in Rome, Italy.',
            p2: 'Currently focused on Open Source Cloud solutions for Data & AI.',
            p3: 'When I\'m not designing architectures, I enjoy exploring new technologies, personal finance, reading books, and building Gunpla.',
            p4: 'Blog coming soon ...',
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
        cookieBanner: {
            text: 'This site uses only technical cookies necessary for operation (localStorage). No profiling or third-party cookies are used.',
            readPolicy: 'Read Cookie Policy',
            accept: 'Accept',
        },
        cookiePolicy: {
            title: 'Cookie Policy',
            intro: 'This Cookie Policy explains what cookies are and how we use them. We encourage you to read this policy to understand what types of cookies we use, the information we collect via cookies, and how that information is used.',
            whatAreCookiesTitle: 'What are cookies?',
            whatAreCookiesText: 'Cookies are small text files used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, and provide a better user experience.',
            howWeUseCookiesTitle: 'How do we use cookies?',
            howWeUseCookiesText: 'Like most online services, our website uses first-party cookies for technical purposes. First-party cookies are mostly necessary for the website to function correctly and do not collect any of your personally identifiable data.',
            typesOfCookiesTitle: 'What types of cookies do we use?',
            necessaryCookies: 'Necessary (Technical):',
            necessaryCookiesText: 'Some cookies are essential to allow you to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.',
            localStorageNote: "Specifically, we use the browser's Local Storage to store your cookie consent preference (key: 'cookieConsent'), so as not to show you the banner again on every visit.",
            analyticsCookies: 'Statistical / Profiling:',
            analyticsCookiesText: 'This site does NOT use profiling or third-party cookies to track user behavior or for advertising purposes.',
            controlCookiesTitle: 'How can I control cookie preferences?',
            controlCookiesText: 'In addition to what is stated in this document, the user can manage Cookie preferences directly within their browser and prevent – for example – third parties from installing them. Through browser preferences, it is also possible to delete Cookies installed in the past.',
            close: 'Got it',
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
