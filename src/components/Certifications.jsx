import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const badges = [
    {
        id: "83b09089-c2ec-4f6c-a118-f34ed351e6d8",
        title: "Credly Badge"
    },
    {
        id: "17c34bb0-03a1-448c-b387-dcbe28cbdaee",
        title: "Credly Badge 2"
    },
    {
        id: "9a00c4ef-f47a-48a2-9e2f-7bbfe24bb43d",
        title: "Credly Badge 3"
    },
    {
        id: "beb5552a-a400-49a7-a8cf-b88aa4b35ba6",
        title: "Credly Badge 4"
    },
    {
        id: "b8798547-135c-47c3-9e20-76652811b0a6",
        title: "Credly Badge 5"
    },
    {
        id: "327972be-04c8-47f1-85ce-72588b6f3370",
        title: "Credly Badge 6"
    },
    {
        id: "adb566ad-4792-4d4e-b01d-d5bf46ba1b39",
        title: "Credly Badge 7"
    }
];

const Certifications = () => {
    const { t } = useLanguage();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//cdn.credly.com/assets/utilities/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <section id="certifications" className="py-20 px-2 md:px-6 max-w-7xl mx-auto transition-colors duration-300">
            <h2 className="text-3xl font-bold text-text dark:text-text-dark mb-12 text-center">{t.certifications.title}</h2>
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
                {badges.map((badge, index) => (
                    <div key={index} className="bg-white p-2 md:p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div
                            data-iframe-width="140"
                            data-iframe-height="250"
                            data-share-badge-id={badge.id}
                            data-share-badge-host="https://www.credly.com"
                        ></div>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                    {t.certifications.viewAll} <a href="https://www.credly.com/users/giorgio-cembran" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-blue-400 font-medium hover:underline">Credly</a>.
                </p>
            </div>
        </section>
    );
};

export default Certifications;
