import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleDropdownJacob = () => setShowDropdownJacob(!showDropdownJacob);
  const toggleDropdownShoshi = () => setShowDropdownShoshi(!showDropdownShoshi);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles['navbar-header']} ${language === 'he' ? styles['navbar-hebrew-mode'] : styles['navbar-english-mode']}`}>
      <div className={styles['navbar-logo-container']}>
        <div className={styles['navbar-left-logo']}>
          <Link to="/" onClick={closeMenu}>
            <img 
              src={isMobile ? (language === 'he' ? logoHE : logoEN) : logoHE} 
              alt={language === 'he' ? 'אמנות ישראלית Logo' : 'Israeli Art Logo'} 
              className={styles['show']} 
            />
          </Link>
        </div>
        <div className={styles['navbar-right-logo']}>
          <Link to="/" onClick={closeMenu}>
            <img 
              src={isMobile ? (language === 'he' ? logoHE : logoEN) : logoEN} 
              alt={language === 'he' ? 'אמנות ישראלית Logo' : 'Israeli Art Logo'} 
            />
          </Link>
        </div>
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
            <Link to="/about" onClick={closeMenu}>{language === 'he' ? 'אודות' : 'About'}</Link>
          </li>
          <li onMouseEnter={() => setShowDropdownShoshi(true)} onMouseLeave={() => setShowDropdownShoshi(false)} onClick={toggleDropdownShoshi}>
            <Link to="#" onClick={(e) => e.preventDefault()}>{language === 'he' ? 'שושי חייט' : 'Shoshi Chayat'}
              <span className={`${styles['dropdown-arrow']} ${showDropdownShoshi ? styles['open'] : ''}`}>&#9662;</span>
            </Link>
            {showDropdownShoshi && (
              <ul className={styles['navbar-dropdown']}>
                <li><Link to="/shoshi/biography" onClick={closeMenu}>{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/shoshi/exhibitions" onClick={closeMenu}>{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/shoshi/gallery" onClick={closeMenu}>{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li onMouseEnter={() => setShowDropdownJacob(true)} onMouseLeave={() => setShowDropdownJacob(false)} onClick={toggleDropdownJacob}>
            <Link to="#" onClick={(e) => e.preventDefault()}>{language === 'he' ? 'יעקב חייט' : 'Jacob Chayat'}
              <span className={`${styles['dropdown-arrow']} ${showDropdownJacob ? styles['open'] : ''}`}>&#9662;</span>
            </Link>
            {showDropdownJacob && (
              <ul className={styles['navbar-dropdown']}>
                <li><Link to="/jacob/biography" onClick={closeMenu}>{language === 'he' ? 'ביוגרפיה' : 'Biography'}</Link></li>
                <li><Link to="/jacob/exhibitions" onClick={closeMenu}>{language === 'he' ? 'תערוכות' : 'Exhibitions'}</Link></li>
                <li><Link to="/jacob/gallery" onClick={closeMenu}>{language === 'he' ? 'גלריה' : 'Gallery'}</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/press" onClick={closeMenu}>{language === 'he' ? 'קטעי עיתונות ופרסים' : 'Press Clips And Videos'}</Link>
          </li>
          <li>
            <Link to="/articles" onClick={closeMenu}>{language === 'he' ?  "כתבות ": 'Articles'}</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
          </li>
          <li className={styles['navbar-language-toggle']}>
            <img
              src={language === 'he' ? flagHE : flagEN}
              alt="Toggle Language"
              onClick={() => { handleLanguageToggle(); closeMenu(); }}
              className={styles['navbar-flag-icon']}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
