import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from '../css/Footer.module.css'; // Import the CSS module

function Footer({ language }) {
    return (
        <footer className={styles.footer} dir={language === 'he' ? 'rtl' : 'ltr'}>
            <div className={styles['footer-content']}>
                <h2>{language === 'he' ? 'ארט חייט | ArtChayat' : 'Art Chayat'}</h2>
                <p>© {new Date().getFullYear()} {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
                <div className={styles['footer-links']}>
                    <Link to="/">{language === 'he' ? 'בית' : 'Home'}</Link>
                    <Link to="/about">{language === 'he' ? 'אודות' : 'About'}</Link>
                    <Link to="/shoshi">{language === 'he' ? 'שושי חייט' : 'Shoshi Hayat'}</Link>
                    <Link to="/jacob">{language === 'he' ? 'יעקב חייט' : 'Jacob Hayat'}</Link>
                    <Link to="/press">{language === 'he' ? 'קטעי עיתונות ופרסים' : 'Press Clips And Videos'}</Link>
                    <Link to="/contact">{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
                </div>
                <p>{language === 'he' ? 'עקבו אחרינו ברשתות החברתיות:' : 'Follow us on social media:'}</p>
                <div className={styles['social-media']}>
                    <a href="https://www.facebook.com/JacobChayat" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
