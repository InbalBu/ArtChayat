import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Navbar/Footer render on every page, so they stay in the main bundle.
// Everything else only matters for whichever single page a visitor is
// actually on, so it's loaded on demand instead of shipping every page's
// code (galleries, forms, exhibition lists, ...) up front on first load.
const HomePage = lazy(() => import('./components/HomePage'));
const About = lazy(() => import('./components/About'));
const Shoshi = lazy(() => import('./components/Shoshi'));
const Jacob = lazy(() => import('./components/Jacob'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const JacobGallery = lazy(() => import('./components/JacobGallery'));
const JacobProductPage = lazy(() => import('./components/JacobProductPage'));
const ShoshiExhibitions = lazy(() => import('./components/ShoshiExhibitions'));
const JacobExhibitions = lazy(() => import('./components/JacobExhibitions'));
const Press = lazy(() => import('./components/Press'));
const ShoshiGallery = lazy(() => import('./components/ShoshiGallery'));
const ShoshiProductPage = lazy(() => import('./components/ShoshiProductPage'));
const Articles = lazy(() => import('./components/Articles'));
const PersonalGallery = lazy(() => import('./components/PersonalGallery'));
const NotFound = lazy(() => import('./components/NotFound'));

// Shown briefly while a lazy-loaded page's code downloads. Route chunks are
// small and cached after the first visit, so this is normally only visible
// on a slow connection's very first navigation to a given page.
function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <div
        style={{
          width: 36,
          height: 36,
          border: '3px solid #eee',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'app-page-loader-spin 0.8s linear infinite',
        }}
      />
      <style>{'@keyframes app-page-loader-spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );
}

function App() {
  // The site's language always defaults to Hebrew. It only becomes English if
  // the URL explicitly says so, or the visitor previously chose English themselves
  // (remembered in localStorage). We deliberately do NOT infer it from the
  // browser/OS language - that was the cause of the site randomly opening in English.
  const pathLanguage = window.location.pathname.match(/^\/(he|en)(\/|$)/)?.[1];
  const initialLanguage = pathLanguage || localStorage.getItem('language') || 'he';
  const [language, setLanguage] = useState(initialLanguage);
  const navigate = useNavigate();
  const location = useLocation();

  // Update localStorage whenever language state changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Set the <html lang> and dir attributes so the page is properly
  // right-to-left in Hebrew and readable by screen readers/browsers natively.
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  // Keep language state in sync with the URL (e.g. back/forward navigation
  // or following a direct link with a language prefix already in it).
  useEffect(() => {
    const currentLang = location.pathname.match(/^\/(he|en)(\/|$)/)?.[1];
    if (currentLang && currentLang !== language) {
      setLanguage(currentLang);
    }
  }, [location.pathname]);

  // If the URL has no language prefix at all, add one based on the
  // resolved language above (always Hebrew unless the visitor chose English).
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!/^\/(he|en)(\/|$)/.test(currentPath)) {
      navigate(`/${language}${currentPath}`, { replace: true });
    }
  }, []);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'he' ? 'en' : 'he';
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/(he|en)/, `/${newLanguage}`);
    setLanguage(newLanguage);
    navigate(newPath);
  };

  return (
    <>
      <Navbar language={language} handleLanguageToggle={handleLanguageToggle} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home is only "/" or an exact "/he" / "/en" - deliberately NOT the
              generic "/:lang?" pattern that used to sit here, which matched
              ANY single-segment path (e.g. a typo'd "/press" one level off,
              or a stale external link) and silently rendered the homepage
              instead of a real 404. Anything else falls through to the
              catch-all "*" route below. */}
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/he" element={<HomePage language={language} />} />
          <Route path="/en" element={<HomePage language={language} />} />
          <Route path="/:lang/about" element={<About language={language} />} />
          <Route path="/:lang/shoshi" element={<Shoshi language={language} />} />
          <Route path="/:lang/shoshi/biography" element={<Shoshi language={language} />} />
          <Route path="/:lang/shoshi/exhibitions" element={<ShoshiExhibitions language={language} />} />
          <Route path="/:lang/shoshi/gallery" element={<ShoshiGallery language={language} />} />
          <Route path="/:lang/shoshi/product/:id" element={<ShoshiProductPage language={language} />} />
          <Route path="/:lang/jacob" element={<Jacob language={language} />} />
          <Route path="/:lang/jacob/biography" element={<Jacob language={language} />} />
          <Route path="/:lang/jacob/exhibitions" element={<JacobExhibitions language={language} />} />
          <Route path="/:lang/jacob/gallery" element={<JacobGallery language={language} />} />
          <Route path="/:lang/jacob/product/:id" element={<JacobProductPage language={language} />} />
          <Route path="/:lang/press" element={<Press language={language} />} />
          <Route path="/:lang/contact" element={<ContactUs language={language} />} />
          <Route path="/:lang/articles" element={<Articles language={language} />} />
          <Route path="/:lang/personalGallery" element={<PersonalGallery language={language} />} />
          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
      </Suspense>
      <Footer language={language} />
    </>
  );
}

export default App;
