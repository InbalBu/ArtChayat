import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  // Initialize language state based on URL or localStorage
  const initialLanguage = window.location.pathname.startsWith('/en') ? 'en' : 'he';
  const [language, setLanguage] = useState(localStorage.getItem('language') || initialLanguage);
  const navigate = useNavigate();

  // Update localStorage whenever language state changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Update language state based on URL changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentLang = currentPath.startsWith('/en') ? 'en' : 'he';
    if (currentLang !== language) {
      setLanguage(currentLang);
    }
  }, [language]);

  // Handle redirect if no language is present in the URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!/^\/(he|en)/.test(currentPath)) {
      const userLanguage = navigator.language || navigator.userLanguage;
      const languagePrefix = userLanguage.startsWith('he') ? '/he' : '/en';
      navigate(`${languagePrefix}${currentPath}`);
    }
  }, [navigate]);

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
        <Route path="/:lang?" element={<HomePage language={language} />} />
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
      </Routes>
      <Footer language={language} />
    </>
  );
}

export default App;
