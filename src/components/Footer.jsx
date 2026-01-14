import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer = ({ onOpenCookiePolicy }) => {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="bg-background dark:bg-background-dark border-t border-border dark:border-border-dark py-6 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <div className="mt-2 flex flex-col md:flex-row gap-4 text-xs text-muted-foreground dark:text-muted-foreground-dark">
                        <button onClick={onOpenCookiePolicy} className="hover:text-foreground dark:hover:text-foreground-dark transition-colors">{t.footer.cookiePolicy}</button>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/giorgio-cembran/" className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors hover:scale-110 transform duration-200" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://x.com/eXist3nZ_89" className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors hover:scale-110 transform duration-200" aria-label="X (formerly Twitter)">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="https://github.com/Magister89" className="text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors hover:scale-110 transform duration-200" aria-label="GitHub">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
