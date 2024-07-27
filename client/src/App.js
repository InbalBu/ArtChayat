import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Shoshi from './components/Shoshi';
import Jacob from './components/Jacob';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import JacobGallery from './components/JacobGallery';
import ProductPage from './components/ProductPage';

function App() {
  const [language, setLanguage] = useState('he');

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
        <Route path="/jacob" element={<Jacob language={language} />} />
        <Route path="/jacob/gallery" element={<JacobGallery language={language} />} />
        <Route path="/product/:id" element={<ProductPage language={language} />} />
        <Route path="/gallery" element={<Gallery language={language} />} />
        <Route path="/contact" element={<ContactUs language={language} />} />
      </Routes>
      <Footer language={language} />
    </Router>
  );
}

export default App;
