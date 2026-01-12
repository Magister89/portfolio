import { useState } from 'react';

export const useCookiePolicy = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = (e) => {
        if (e) e.preventDefault();
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
    };

    return { isOpen, open, close };
};
