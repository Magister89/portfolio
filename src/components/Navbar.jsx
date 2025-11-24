import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-background dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="flex items-center">
                <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Giorgio Cembran</div>
            </div>

            <div className="flex items-center space-x-6">
                <a href="#about" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.about}</a>
                <a href="#activities" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.activities}</a>
                <a href="#certifications" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.certifications}</a>
                <a href="mailto:giorgio.cembran@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:scale-110 transform duration-200" aria-label={t.navbar.contact}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                </a>

                <div className="flex items-center space-x-2 text-sm font-medium">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`${language === 'en' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                    >
                        EN
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <button
                        onClick={() => setLanguage('it')}
                        className={`${language === 'it' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                    >
                        IT
                    </button>
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text dark:text-text-dark"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'dark' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
