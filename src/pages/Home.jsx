import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Certifications from '../components/Certifications';
import About from '../components/About';
import Activities from '../components/Activities';
import Footer from '../components/Footer';
import CookiePolicy from '../components/CookiePolicy';

function Home() {
    const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

    const openCookiePolicy = (e) => {
        if (e) e.preventDefault();
        setIsCookiePolicyOpen(true);
    };

    const closeCookiePolicy = () => {
        setIsCookiePolicyOpen(false);
    };

    return (
        <>
            <Navbar />
            <main>
                <About />
                <Activities />
                <Certifications />
            </main>
            <Footer onOpenCookiePolicy={openCookiePolicy} />
            <CookiePolicy isOpen={isCookiePolicyOpen} onClose={closeCookiePolicy} />
        </>
    );
}

export default Home;
