import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// GitHub Gist for activities data (without commit hash to always get latest version)
const ACTIVITIES_GIST_URL = 'https://gist.githubusercontent.com/Magister89/a527b1f5ff47cf9971d782185fb248a4/raw/activities.json';

const SKELETON_ROW_COUNT = 4;

// Skeleton loader component
const SkeletonTable = () => (
    <Card className="h-full">
        <CardHeader className="animate-pulse">
            <div className="flex items-center justify-center gap-3">
                <div className="w-7 h-7 bg-muted dark:bg-muted-dark rounded"></div>
                <div className="h-5 w-28 bg-muted dark:bg-muted-dark rounded"></div>
            </div>
        </CardHeader>
        <CardContent className="animate-pulse">
            <div className="w-full border border-border dark:border-border-dark rounded">
                <div className="bg-muted dark:bg-muted-dark h-9 border-b border-border dark:border-border-dark"></div>
                {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => (
                    <div key={i} className="h-9 border-b border-border dark:border-border-dark flex">
                        <div className="w-1/3 p-2"><div className="h-3 bg-muted dark:bg-muted-dark rounded"></div></div>
                        <div className="w-2/3 p-2"><div className="h-3 bg-muted dark:bg-muted-dark rounded"></div></div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Activity table component
const ActivityTable = ({ title, data, header1, header2, iconName }) => (
    <Card className="h-full">
        <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <span className="material-symbols-outlined text-2xl text-foreground dark:text-foreground-dark">{iconName}</span>
                <span className="text-foreground dark:text-foreground-dark">{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3 text-xs">{header1}</TableHead>
                        <TableHead className="text-xs">{header2}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-xs text-muted-foreground dark:text-muted-foreground-dark">{item.col1}</TableCell>
                            <TableCell className="text-xs font-medium text-foreground dark:text-foreground-dark">{item.col2}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const Activities = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const [readings, setReadings] = useState([]);
    const [courses, setCourses] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Lazy load: observe when section enters viewport
    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" },
        );

        observer.observe(currentRef);

        return () => observer.disconnect();
    }, []);

    // Fetch data only when visible with AbortController
    useEffect(() => {
        if (!isVisible) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(ACTIVITIES_GIST_URL, {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();

                // Transform to component format
                setReadings(data.readings?.map(r => ({ col1: r.author, col2: r.title })) || []);
                setCourses(data.courses?.map(c => ({ col1: c.platform, col2: c.name })) || []);
                setHobbies(data.hobbies?.map(h => ({ col1: h.activity, col2: h.item })) || []);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Error fetching activities:", err);
                    setError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [isVisible]);

    // Skeleton loading state
    if (!isVisible || loading) {
        return (
            <section ref={sectionRef} id="activities" className="py-16 px-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SkeletonTable />
                        <SkeletonTable />
                        <SkeletonTable />
                    </div>
                </div>
            </section>
        );
    }

    // Error state - silent fail
    if (error) return null;

    return (
        <section ref={sectionRef} id="activities" className="py-16 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActivityTable
                        title={t.activities.title}
                        data={readings}
                        header1={t.activities.author}
                        header2={t.activities.bookTitle}
                        iconName="menu_book"
                    />
                    <ActivityTable
                        title={t.activities.coursesTitle}
                        data={courses}
                        header1={t.activities.platform}
                        header2={t.activities.courseName}
                        iconName="school"
                    />
                    <ActivityTable
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
