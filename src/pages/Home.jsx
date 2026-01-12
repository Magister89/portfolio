import Navbar from '../components/Navbar';
import Certifications from '../components/Certifications';
import About from '../components/About';
import Activities from '../components/Activities';
import Footer from '../components/Footer';
import CookiePolicy from '../components/CookiePolicy';
import { useCookiePolicy } from '../hooks/useCookiePolicy';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function Home() {
    const cookiePolicy = useCookiePolicy();
    useDocumentTitle(); // Use base title for home page

    return (
        <>
            <Navbar />
            <main id="main-content">
                <About />
                <Activities />
                <Certifications />
            </main>
            <Footer onOpenCookiePolicy={cookiePolicy.open} />
            <CookiePolicy isOpen={cookiePolicy.isOpen} onClose={cookiePolicy.close} />
        </>
    );
}

export default Home;
