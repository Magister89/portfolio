import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import alien from '../assets/alien.gif';
import gengar from '../assets/gengar.gif';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-20 px-6 bg-surface dark:bg-zinc-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="col-span-1 md:col-span-2 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <img src={alien} alt="Alien" className="h-12 w-12 object-contain" />
                        <h2 className="text-3xl font-bold text-text dark:text-text-dark">{t.about.title}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {t.about.p1}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {t.about.p2}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t.about.p3}
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                        <Link to="/blog" className="text-lg font-medium italic text-purple-600 dark:text-purple-400 hover:underline">
                            {t.about.p4}
                        </Link>
                        <img src={gengar} alt="Gengar" className="h-8 w-8 object-contain" />
                    </div>
                </div>
                <div className="col-span-1 flex justify-center">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                            src={avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
