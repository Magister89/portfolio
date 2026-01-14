import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Mail, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <nav className="bg-background dark:bg-background-dark border-b border-border dark:border-border-dark sticky top-0 z-50 transition-colors duration-300">
            <div className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="group flex items-center text-xl font-bold tracking-tight transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        <span className="text-foreground dark:text-foreground-dark">
                            giorgio
                        </span>
                        <span className="text-muted-foreground dark:text-muted-foreground-dark mx-0.5">.</span>
                        <span className="text-muted-foreground dark:text-muted-foreground-dark group-hover:text-foreground dark:group-hover:text-foreground-dark transition-colors">
                            cembran
                        </span>
                        <span className="ml-0.5 w-1.5 h-4 bg-foreground dark:bg-foreground-dark animate-pulse"></span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </Button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.about}</a>
                    <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.activities}</a>
                    <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.certifications}</a>
                    <Link to="/blog" className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors">{t.navbar?.blog || 'Blog'}</Link>
                    <a href="mailto:giorgio.cembran@gmail.com" className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors hover:scale-110 transform duration-200" aria-label={t.navbar.contact}>
                        <Mail className="w-5 h-5" />
                    </a>

                    <div className="flex items-center space-x-2 text-sm font-medium" role="group" aria-label="Language selection">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`${language === 'en' ? 'text-foreground dark:text-foreground-dark' : 'text-muted-foreground dark:text-muted-foreground-dark'} hover:text-foreground dark:hover:text-foreground-dark transition-colors`}
                            aria-pressed={language === 'en'}
                            lang="en"
                        >
                            EN
                        </button>
                        <span className="text-border dark:text-border-dark" aria-hidden="true">|</span>
                        <button
                            onClick={() => setLanguage('it')}
                            className={`${language === 'it' ? 'text-foreground dark:text-foreground-dark' : 'text-muted-foreground dark:text-muted-foreground-dark'} hover:text-foreground dark:hover:text-foreground-dark transition-colors`}
                            aria-pressed={language === 'it'}
                            lang="it"
                        >
                            IT
                        </button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div id="mobile-menu" className="md:hidden px-6 pb-4 space-y-4 bg-background dark:bg-background-dark border-t border-border dark:border-border-dark">
                    <div className="flex flex-col space-y-3 pt-4">
                        <a href="#about" onClick={(e) => handleSectionClick(e, 'about')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.about}</a>
                        <a href="#activities" onClick={(e) => handleSectionClick(e, 'activities')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.activities}</a>
                        <a href="#certifications" onClick={(e) => handleSectionClick(e, 'certifications')} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors cursor-pointer">{t.navbar.certifications}</a>
                        <Link to="/blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors">{t.navbar?.blog || 'Blog'}</Link>
                        <a href="mailto:giorgio.cembran@gmail.com" className="flex items-center text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors" aria-label={t.navbar.contact}>
                            <span className="mr-2">{t.navbar.contact}</span>
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border-dark">
                        <div className="flex items-center space-x-2 text-sm font-medium" role="group" aria-label="Language selection">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`${language === 'en' ? 'text-foreground dark:text-foreground-dark' : 'text-muted-foreground dark:text-muted-foreground-dark'} hover:text-foreground dark:hover:text-foreground-dark transition-colors`}
                                aria-pressed={language === 'en'}
                                lang="en"
                            >
                                EN
                            </button>
                            <span className="text-border dark:text-border-dark" aria-hidden="true">|</span>
                            <button
                                onClick={() => setLanguage('it')}
                                className={`${language === 'it' ? 'text-foreground dark:text-foreground-dark' : 'text-muted-foreground dark:text-muted-foreground-dark'} hover:text-foreground dark:hover:text-foreground-dark transition-colors`}
                                aria-pressed={language === 'it'}
                                lang="it"
                            >
                                IT
                            </button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
