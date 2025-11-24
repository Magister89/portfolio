import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Certifications from './components/Certifications';
import About from './components/About';
import Activities from './components/Activities';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import CookiePolicy from './components/CookiePolicy';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isCookiePolicyOpen, setIsCookiePolicyOpen] = useState(false);

  const openCookiePolicy = (e) => {
    if (e) e.preventDefault();
    setIsCookiePolicyOpen(true);
  };

  const closeCookiePolicy = () => {
    setIsCookiePolicyOpen(false);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
        <Navbar />
        <main>
          <About />
          <Activities />
          <Certifications />
        </main>
        <Footer onOpenCookiePolicy={openCookiePolicy} />
        <CookieBanner onOpenCookiePolicy={openCookiePolicy} />
        <CookiePolicy isOpen={isCookiePolicyOpen} onClose={closeCookiePolicy} />
      </div>
    </LanguageProvider>
  );
}

export default App;
