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
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`header ${language === 'he' ? 'hebrew-mode' : 'english-mode'}`}>
      <div className="logo-container">
        {language === 'he' ? (
          <>
            <div className="right-logo">
              <Link to="/"><img src={logoHE} alt="אמנות ישראלית Logo" /></Link>
            </div>
            <div className="left-logo">
              <Link to="/"><img src={logoEN} alt="Israeli Art Logo" /></Link>
            </div>
          </>
        ) : (
          <>
            <div className="left-logo">
              <Link to="/"><img src={logoEN} alt="Israeli Art Logo" /></Link>
            </div>
            <div className="right-logo">
              <Link to="/"><img src={logoHE} alt="אמנות ישראלית Logo" /></Link>
            </div>
          </>
        )}
      </div>
      <div className="black-bar">
        <span className="left-bar-text">אמנות ישראלית</span>
        <span className="right-bar-text">Israeli Art</span>
      </div>
      <nav className="navbar">
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? 'show' : ''}>
          <li>
            <Link to="/about" onClick={toggleMenu}>{language === 'he' ? 'אודות' : 'About'}</Link>
          </li>
          <li onMouseEnter={() => setShowDropdownShoshi(true)} onMouseLeave={() => setShowDropdownShoshi(false)}>
            <Link to="/shoshi" onClick={toggleMenu}>{language === 'he' ? 'שושי חייט' : 'Shoshi Hayat'}</Link>
            {showDropdownShoshi && (
              <ul className="dropdown">
                <li><Link to="/shoshi/biography" onClick={toggleMenu}>{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/shoshi/exhibitions" onClick={toggleMenu}>{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/shoshi/gallery" onClick={toggleMenu}>{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li onMouseEnter={() => setShowDropdownJacob(true)} onMouseLeave={() => setShowDropdownJacob(false)}>
            <Link to="/jacob" onClick={toggleMenu}>{language === 'he' ? 'יעקב חייט' : 'Jacob Hayat'}</Link>
            {showDropdownJacob && (
              <ul className="dropdown">
                <li><Link to="/jacob/biography" onClick={toggleMenu}>{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/jacob/exhibitions" onClick={toggleMenu}>{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/jacob/gallery" onClick={toggleMenu}>{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/gallery" onClick={toggleMenu}>{language === 'he' ? 'גלריה' : 'Gallery'}</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
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
