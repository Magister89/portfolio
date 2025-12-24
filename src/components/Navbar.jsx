import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { HiMenu, HiX, HiMail, HiSun, HiMoon } from 'react-icons/hi';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Smart navigation: scroll if on homepage, navigate if on other pages
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname === '/') {
            // Already on homepage, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to homepage with hash
            navigate('/', { replace: false });
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <nav className="bg-background dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="group flex items-center text-2xl font-bold tracking-tight transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <span className="bg-gradient-to-r from-primary via-cyan-400 to-blue-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            giorgio
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 mx-0.5">.</span>
                        <span className="text-text dark:text-text-dark group-hover:text-primary transition-colors">
                            cembran
                        </span>
                        <span className="ml-0.5 w-2 h-5 bg-primary animate-pulse"></span>
                    </Link>
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
                    <Link to="/" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.about}</Link>
                    <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.activities}</a>
                    <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.certifications}</a>
                    <Link to="/blog" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar?.blog || 'Blog'}</Link>
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
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar.about}</Link>
                        <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.activities}</a>
                        <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.certifications}</a>
                        <Link to="/blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar?.blog || 'Blog'}</Link>
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
