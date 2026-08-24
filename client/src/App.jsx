import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Shoshi from './components/Shoshi';
import Jacob from './components/Jacob';
import ContactUs from './components/ContactUs';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import JacobGallery from './components/JacobGallery';
import JacobProductPage from './components/JacobProductPage';
import ShoshiExhibitions from './components/ShoshiExhibitions';
import JacobExhibitions from './components/JacobExhibitions';
import Press from './components/Press';
import ShoshiGallery from './components/ShoshiGallery';
import ShoshiProductPage from './components/ShoshiProductPage';
import Articles from './components/Articles';
import PersonalGallery from './components/PersonalGallery';
import NotFound from './components/NotFound';

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
      <Footer language={language} />
    </>
  );
}

export default App;
