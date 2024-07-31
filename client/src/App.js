import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Shoshi from './components/Shoshi';
import Jacob from './components/Jacob';
import ContactUs from './components/ContactUs';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import JacobGallery from './components/JacobGallery';
import ProductPage from './components/ProductPage';
import ShoshiExhibitions from './components/ShoshiExhibitions';
import JacobExhibitions from './components/JacobExhibitions';
import Press from './components/Press';
import ShoshiGallery from './components/ShoshiGallery';

function App() {
  // Initialize language state from localStorage or default to 'he'
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'he');

  // Update localStorage whenever language state changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleLanguageToggle = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'he' ? 'en' : 'he'));
  };

  return (
    <Router>
      <Navbar language={language} handleLanguageToggle={handleLanguageToggle} />
      <Routes>
        <Route path="/" element={<HomePage language={language} />} />
        <Route path="/about" element={<About language={language} />} />
        <Route path="/shoshi" element={<Shoshi language={language} />} />
        <Route path="/shoshi/biography" element={<Shoshi language={language} />} />
        <Route path="/shoshi/exhibitions" element={<ShoshiExhibitions language={language} />} />
        <Route path="/shoshi/gallery" element={<ShoshiGallery language={language} />} />
        <Route path="/jacob" element={<Jacob language={language} />} />
        <Route path="/jacob/biography" element={<Jacob language={language} />} />
        <Route path="/jacob/exhibitions" element={<JacobExhibitions language={language} />} />
        <Route path="/jacob/gallery" element={<JacobGallery language={language} />} />
        <Route path="/product/:id" element={<ProductPage language={language} />} />
        <Route path="/press" element={<Press language={language} />} />
        <Route path="/contact" element={<ContactUs language={language} />} />
      </Routes>
      <Footer language={language} />
    </Router>
  );
}

export default App;
