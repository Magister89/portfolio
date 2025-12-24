import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// GitHub Gist for activities data (without commit hash to always get latest version)
const ACTIVITIES_GIST_URL = 'https://gist.githubusercontent.com/Magister89/a527b1f5ff47cf9971d782185fb248a4/raw/activities.json';

const Activities = () => {
    const { t } = useLanguage();
    const [readings, setReadings] = useState([]);
    const [courses, setCourses] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ACTIVITIES_GIST_URL);
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();

                // Transform to component format
                setReadings(data.readings?.map(r => ({ col1: r.author, col2: r.title })) || []);
                setCourses(data.courses?.map(c => ({ col1: c.platform, col2: c.name })) || []);
                setHobbies(data.hobbies?.map(h => ({ col1: h.activity, col2: h.item })) || []);
            } catch (err) {
                console.error("Error fetching activities:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return null;
    if (error) return null;

    const Table = ({ title, data, header1, header2, iconName }) => (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center gap-3 mb-4">
                <span className="material-symbols-outlined text-3xl text-primary dark:text-blue-400">{iconName}</span>
                <h3 className="text-xl font-bold text-text dark:text-text-dark">{title}</h3>
            </div>
            <div className="overflow-x-auto flex-grow">
                <table className="w-full border-collapse bg-white dark:bg-background-dark shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="py-2 px-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700 w-1/3">{header1}</th>
                            <th className="py-2 px-3 text-left font-semibold text-gray-700 dark:text-gray-200">{header2}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <td className="py-2 px-3 text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">{item.col1}</td>
                                <td className="py-2 px-3 text-gray-800 dark:text-gray-100 font-medium">{item.col2}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <section id="activities" className="py-20 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Table
                        title={t.activities.title}
                        data={readings}
                        header1={t.activities.author}
                        header2={t.activities.bookTitle}
                        iconName="menu_book"
                    />
                    <Table
                        title={t.activities.coursesTitle}
                        data={courses}
                        header1={t.activities.platform}
                        header2={t.activities.courseName}
                        iconName="school"
                    />
                    <Table
                        title={t.activities.hobbiesTitle}
                        data={hobbies}
                        header1={t.activities.activity}
                        header2={t.activities.item}
                        iconName="extension"
                    />
                </div>
            </div>
        </section>
    );
};

export default Activities;
