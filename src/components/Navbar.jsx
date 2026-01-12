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

    // Wait for element to appear in DOM and scroll to it
    const scrollToElement = (sectionId, maxAttempts = 20) => {
        let attempts = 0;
        const tryScroll = () => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (attempts < maxAttempts) {
                attempts++;
                requestAnimationFrame(tryScroll);
            }
        };
        requestAnimationFrame(tryScroll);
    };

    // Smart navigation: scroll if on homepage, navigate if on other pages
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname === '/') {
            // Already on homepage, just scroll
            scrollToElement(sectionId);
        } else {
            // Navigate to homepage then scroll
            navigate('/', { replace: false });
            scrollToElement(sectionId);
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
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
                    <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.about}</a>
                    <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.activities}</a>
                    <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.certifications}</a>
                    <Link to="/blog" className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar?.blog || 'Blog'}</Link>
                    <a href="mailto:giorgio.cembran@gmail.com" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:scale-110 transform duration-200" aria-label={t.navbar.contact}>
                        <HiMail className="w-6 h-6" />
                    </a>

                    <div className="flex items-center space-x-2 text-sm font-medium" role="group" aria-label="Language selection">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`${language === 'en' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                            aria-pressed={language === 'en'}
                            lang="en"
                        >
                            EN
                        </button>
                        <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
                        <button
                            onClick={() => setLanguage('it')}
                            className={`${language === 'it' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                            aria-pressed={language === 'it'}
                            lang="it"
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
                <div id="mobile-menu" className="md:hidden px-6 pb-4 space-y-4 bg-background dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col space-y-3 pt-4">
                        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.about}</a>
                        <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.activities}</a>
                        <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors cursor-pointer">{t.navbar.certifications}</a>
                        <Link to="/blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-text dark:text-text-dark hover:text-primary transition-colors">{t.navbar?.blog || 'Blog'}</Link>
                        <a href="mailto:giorgio.cembran@gmail.com" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors" aria-label={t.navbar.contact}>
                            <span className="mr-2">{t.navbar.contact}</span>
                            <HiMail className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center space-x-2 text-sm font-medium" role="group" aria-label="Language selection">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`${language === 'en' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                                aria-pressed={language === 'en'}
                                lang="en"
                            >
                                EN
                            </button>
                            <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">|</span>
                            <button
                                onClick={() => setLanguage('it')}
                                className={`${language === 'it' ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} hover:text-primary dark:hover:text-blue-400 transition-colors`}
                                aria-pressed={language === 'it'}
                                lang="it"
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
