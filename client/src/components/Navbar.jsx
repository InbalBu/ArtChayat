import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Navbar.module.css'; // Import the CSS module

import flagHE from '../images/usFlag.png';
import flagEN from '../images/isFlag.png';

import logoHE from '../images/logoHe.png';
import logoEN from '../images/logoEN.png';

const Navbar = ({ language, handleLanguageToggle }) => {
  const [showDropdownJacob, setShowDropdownJacob] = useState(false);
  const [showDropdownShoshi, setShowDropdownShoshi] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`${styles['navbar-header']} ${language === 'he' ? styles['navbar-hebrew-mode'] : styles['navbar-english-mode']}`}>
      <div className={styles['navbar-logo-container']}>
        {language === 'he' ? (
          <>
            <div className={styles['navbar-right-logo']}>
              <Link to="/"><img src={logoHE} alt="אמנות ישראלית Logo" /></Link>
            </div>
            <div className={styles['navbar-left-logo']}>
              <Link to="/"><img src={logoEN} alt="Israeli Art Logo" /></Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles['navbar-left-logo']}>
              <Link to="/"><img src={logoEN} alt="Israeli Art Logo" /></Link>
            </div>
            <div className={styles['navbar-right-logo']}>
              <Link to="/"><img src={logoHE} alt="אמנות ישראלית Logo" /></Link>
            </div>
          </>
        )}
        <div className={styles['navbar-hamburger']} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={styles['navbar-black-bar']}>
        <span className={styles['navbar-left-bar-text']}>אמנות ישראלית</span>
        <span className={styles['navbar-right-bar-text']}>Israeli Art</span>
      </div>
      <nav className={`${styles['navbar-nav']} ${menuOpen ? styles['active'] : ''}`}>
        <ul>
          <li>
            <Link to="/about">{language === 'he' ? 'אודות' : 'About'}</Link>
          </li>
          <li onMouseEnter={() => setShowDropdownShoshi(true)} onMouseLeave={() => setShowDropdownShoshi(false)}>
            <Link to="/shoshi">{language === 'he' ? 'שושי חייט' : 'Shoshi Hayat'}</Link>
            {showDropdownShoshi && (
              <ul className={styles['navbar-dropdown']}>
                <li><Link to="/shoshi/biography">{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/shoshi/exhibitions">{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/shoshi/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li onMouseEnter={() => setShowDropdownJacob(true)} onMouseLeave={() => setShowDropdownJacob(false)}>
            <Link to="/jacob">{language === 'he' ? 'יעקב חייט' : 'Jacob Hayat'}</Link>
            {showDropdownJacob && (
              <ul className={styles['navbar-dropdown']}>
                <li><Link to="/jacob/biography">{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/jacob/exhibitions">{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/jacob/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/press">{language === 'he' ? 'קטעי עיתונות ופרסים' : 'Press Clips And Videos'}</Link>
          </li>
          <li>
            <Link to="/contact">{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
          </li>
          <li className={styles['navbar-language-toggle']}>
            <img
              src={language === 'he' ? flagHE : flagEN}
              alt={language === 'he' ? 'Switch to English' : 'עברית'}
              onClick={handleLanguageToggle}
              className={styles['navbar-flag-icon']}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
