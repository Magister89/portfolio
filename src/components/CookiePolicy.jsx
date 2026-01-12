import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CookiePolicy = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Handle ESC key and focus trap
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }, [onClose]);

    // Store previous focus and set focus to modal when opening
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            closeButtonRef.current?.focus();
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookie-policy-title"
                className="bg-white dark:bg-surface-dark rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl transition-colors duration-300"
            >
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-surface-dark z-10 transition-colors duration-300">
                    <h2 id="cookie-policy-title" className="text-2xl font-bold text-text dark:text-text-dark">{t.cookiePolicy.title}</h2>
                    <button
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="text-gray-500 dark:text-gray-400 hover:text-text dark:hover:text-text-dark transition-colors p-2"
                        aria-label={t.cookiePolicy.close}
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
