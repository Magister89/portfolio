import { useEffect } from 'react';

const BASE_TITLE = 'Giorgio Cembran';

export const useDocumentTitle = (title) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};
