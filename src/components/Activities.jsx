import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
                const [readingsRes, coursesRes, hobbiesRes] = await Promise.all([
                    fetch('https://docs.google.com/spreadsheets/d/1-cTutiYy9tdUY8qoSGfFt7sjpuUik04vFqSDcePl0oE/gviz/tq?tqx=out:csv&sheet=Reading%20-%20Books'),
                    fetch('https://docs.google.com/spreadsheets/d/1-cTutiYy9tdUY8qoSGfFt7sjpuUik04vFqSDcePl0oE/gviz/tq?tqx=out:csv&sheet=Learning%20-%20Courses'),
                    fetch('https://docs.google.com/spreadsheets/d/1-cTutiYy9tdUY8qoSGfFt7sjpuUik04vFqSDcePl0oE/gviz/tq?tqx=out:csv&sheet=Hobbies')
                ]);

                const readingsText = await readingsRes.text();
                const coursesText = await coursesRes.text();
                const hobbiesText = await hobbiesRes.text();

                setReadings(parseCSV(readingsText));
                setCourses(parseCSV(coursesText));
                setHobbies(parseCSV(hobbiesText));
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parseCSV = (text) => {
        const rows = [];
        let currentRow = [];
        let currentField = '';
        let insideQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const nextChar = text[i + 1];

            if (char === '"') {
                if (insideQuotes && nextChar === '"') {
                    currentField += '"';
                    i++;
                } else {
                    insideQuotes = !insideQuotes;
                }
            } else if (char === ',' && !insideQuotes) {
                currentRow.push(currentField.trim());
                currentField = '';
            } else if ((char === '\r' || char === '\n') && !insideQuotes) {
                if (currentField || currentRow.length > 0) {
                    currentRow.push(currentField.trim());
                    rows.push(currentRow);
                }
                currentRow = [];
                currentField = '';
                if (char === '\r' && nextChar === '\n') i++;
            } else {
                currentField += char;
            }
        }
        if (currentField || currentRow.length > 0) {
            currentRow.push(currentField.trim());
            rows.push(currentRow);
        }

        return rows.map(row => ({
            col1: row[0],
            col2: row[1]
        })).filter(item => item.col1 && item.col2);
    };

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
                        <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
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
