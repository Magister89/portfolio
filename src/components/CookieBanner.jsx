import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CookieBanner = ({ onOpenCookiePolicy }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
                    {t.cookieBanner.text}
                    <a href="#" onClick={onOpenCookiePolicy} className="text-primary dark:text-blue-400 hover:underline ml-1">{t.cookieBanner.readPolicy}</a>.
                </p>
                <button
                    onClick={acceptCookies}
                    className="bg-primary text-white px-6 py-2 rounded-pill text-sm font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
                >
                    {t.cookieBanner.accept}
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
