import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

import flagHE from '../images/usFlag.png';
import flagEN from '../images/isFlag.png';

import logoHE from '../images/logoHe.png';
import logoEN from '../images/logoEN.png';

const Navbar = ({ language, handleLanguageToggle }) => {
  const [showDropdownJacob, setShowDropdownJacob] = React.useState(false);
  const [showDropdownShoshi, setShowDropdownShoshi] = React.useState(false);

  return (
    <div className={`header ${language === 'he' ? 'hebrew-mode' : 'english-mode'}`}>
      <div className="logo-container">
        <div className="left-logo">
          <Link to="/"><img src={logoEN} alt="Israeli Art Logo" /></Link>
        </div>
        <div className="right-logo">
          <Link to="/"><img src={logoHE} alt="אמנות ישראלית Logo" /></Link>
        </div>
      </div>
      <div className="black-bar">
        <span className="left-bar-text">Israeli Art</span>
        <span className="right-bar-text">אמנות ישראלית</span>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/about">{language === 'he' ? 'אודות' : 'About'}</Link>
          </li>
          <li onMouseEnter={() => setShowDropdownShoshi(true)} onMouseLeave={() => setShowDropdownShoshi(false)}>
            <Link to="/shoshi">{language === 'he' ? 'שושי חייט' : 'Shoshi Hayat'}</Link>
            {showDropdownShoshi && (
              <ul className="dropdown">
                <li><Link to="/shoshi/biography">{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/shoshi/exhibitions">{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/shoshi/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li onMouseEnter={() => setShowDropdownJacob(true)} onMouseLeave={() => setShowDropdownJacob(false)}>
            <Link to="/jacob">{language === 'he' ? 'יעקב חייט' : 'Jacob Hayat'}</Link>
            {showDropdownJacob && (
              <ul className="dropdown">
                <li><Link to="/jacob/biography">{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/jacob/exhibitions">{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/jacob/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</Link>
          </li>
          <li>
            <Link to="/contact">{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
          </li>
          <li className="language-toggle">
            <img
              src={language === 'he' ? flagEN : flagHE}
              alt={language === 'he' ? 'Switch to English' : 'עברית'}
              onClick={handleLanguageToggle}
              className="flag-icon"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
