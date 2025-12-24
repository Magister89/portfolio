import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Blog from './pages/Blog';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      {/* Home is always mounted, hidden when on blog */}
      <div style={{ display: isHomePage ? 'block' : 'none' }}>
        <Home />
      </div>
      {/* Blog only renders when needed */}
      {location.pathname.startsWith('/blog') && <Blog />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
