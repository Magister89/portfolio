import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CookiePolicy = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-surface-dark rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl transition-colors duration-300">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-surface-dark z-10 transition-colors duration-300">
                    <h2 className="text-2xl font-bold text-text dark:text-text-dark">{t.cookiePolicy.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-text dark:hover:text-text-dark transition-colors p-2"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                    <p>
                        {t.cookiePolicy.intro}
                    </p>

                    <h3 className="text-lg font-bold text-text dark:text-text-dark mt-4">{t.cookiePolicy.whatAreCookiesTitle}</h3>
                    <p>
                        {t.cookiePolicy.whatAreCookiesText}
                    </p>

                    <h3 className="text-lg font-bold text-text dark:text-text-dark mt-4">{t.cookiePolicy.howWeUseCookiesTitle}</h3>
                    <p>
                        {t.cookiePolicy.howWeUseCookiesText}
                    </p>

                    <h3 className="text-lg font-bold text-text dark:text-text-dark mt-4">{t.cookiePolicy.typesOfCookiesTitle}</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>{t.cookiePolicy.necessaryCookies}</strong> {t.cookiePolicy.necessaryCookiesText}
                            <br />
                            <em>{t.cookiePolicy.localStorageNote}</em>
                        </li>
                        <li>
                            <strong>{t.cookiePolicy.analyticsCookies}</strong> {t.cookiePolicy.analyticsCookiesText}
                        </li>
                    </ul>

                    <h3 className="text-lg font-bold text-text dark:text-text-dark mt-4">{t.cookiePolicy.controlCookiesTitle}</h3>
                    <p>
                        {t.cookiePolicy.controlCookiesText}
                    </p>
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-surface dark:bg-background-dark rounded-b-2xl transition-colors duration-300">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-white py-3 rounded-pill font-medium hover:bg-blue-600 transition-colors"
                    >
                        {t.cookiePolicy.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
