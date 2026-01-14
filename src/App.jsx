import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Home from './pages/Home';

// Lazy load Blog for code splitting
const Blog = lazy(() => import('./pages/Blog'));

// Loading fallback for lazy loaded components
const LoadingFallback = () => (
  <div className="min-h-screen bg-muted dark:bg-muted-dark flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground dark:text-muted-foreground-dark text-sm">Loading...</div>
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-muted dark:bg-muted-dark flex items-center justify-center p-4">
          <Card className="max-w-md text-center">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">Warning</div>
              <h1 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-2">
                Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-4">
                An unexpected error occurred. Please refresh the page.
              </p>
              <Button
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark transition-colors duration-300">
      {/* Home is always mounted, hidden when on blog */}
      <div style={{ display: isHomePage ? 'block' : 'none' }}>
        <Home />
      </div>
      {/* Blog lazy loaded with Suspense */}
      {location.pathname.startsWith('/blog') && (
        <Suspense fallback={<LoadingFallback />}>
          <Blog />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
