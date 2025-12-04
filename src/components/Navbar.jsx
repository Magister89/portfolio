import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { HiMenu, HiX, HiMail, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-background dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Giorgio Cembran</div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text dark:text-text-dark hover:text-primary focus:outline-none"
                    >
                        {isOpen ? (
                            <HiX className="w-6 h-6" />
                        ) : (
                            <HiMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#about" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.about}</a>
                    <a href="#activities" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.activities}</a>
                    <a href="#certifications" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.certifications}</a>
                    <a href="mailto:giorgio.cembran@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:scale-110 transform duration-200" aria-label={t.navbar.contact}>
                        <HiMail className="w-6 h-6" />
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
                            <HiSun className="w-5 h-5" />
                        ) : (
                            <HiMoon className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4 space-y-4 bg-background dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col space-y-3 pt-4">
                        <a href="#about" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.about}</a>
                        <a href="#activities" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.activities}</a>
                        <a href="#certifications" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.certifications}</a>
                        <a href="mailto:giorgio.cembran@gmail.com" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors" aria-label={t.navbar.contact}>
                            <span className="mr-2">{t.navbar.contact}</span>
                            <HiMail className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
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
                                <HiSun className="w-5 h-5" />
                            ) : (
                                <HiMoon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
