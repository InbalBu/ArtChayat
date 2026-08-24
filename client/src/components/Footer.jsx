import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from '../css/Footer.module.css'; // Import the CSS module
import signature from '../images/signature.jpg'; // Ensure the image is imported

function Footer({ language }) {
    // NOTE: Footer renders on every page. It must NOT declare its own
    // <Helmet><title>/meta> - it used to, and because Footer mounts after
    // each page's own Helmet, its generic title/description silently
    // overwrote every page-specific one sitewide (Google was seeing "ארט
    // חייט | ArtChayat" as the title on every single URL, never the
    // page's actual title). Page-level SEO tags belong only in the page
    // components themselves.
    return (
        <footer className={styles.footer} dir={language === 'he' ? 'rtl' : 'ltr'}>
            <div className={styles['footer-content']}>
                <h2>{language === 'he' ? 'ארט חייט | ArtChayat' : 'Art Chayat'}</h2>
                <p>© {new Date().getFullYear()} {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
                <div className={styles['footer-links']}>
                    <Link to="/">{language === 'he' ? 'בית' : 'Home'}</Link>
                    <Link to="/about">{language === 'he' ? 'אודות' : 'About'}</Link>
                    <Link to="/shoshi">{language === 'he' ? 'שושי חייט' : 'Shoshi Chayat'}</Link>
                    <Link to="/jacob">{language === 'he' ? 'יעקב חייט' : 'Jacob Chayat'}</Link>
                    <Link to="/press">{language === 'he' ? 'קטעי עיתונות ופרסים' : 'Press Clips And Videos'}</Link>
                    <Link to="/articles">{language === 'he' ? 'כתבות' : 'Articles'}</Link>
                    <Link to="/personalGallery">{language === 'he' ? 'גלריה מזווית אישית' : 'A Gallery From A Personal Angle'}</Link>
                    <Link to="/contact">{language === 'he' ? 'צור קשר' : 'Contact'}</Link>
                </div>
                <p>{language === 'he' ? 'עקבו אחרינו ברשתות החברתיות:' : 'Follow us on social media:'}</p>
                <div className={styles['social-media']}>
                    <a href="https://www.facebook.com/share/15PjAaoQRL/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.instagram.com/artchayat?igsh=MXRlYjJicXY5ZGt2" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <div className={styles['footer-signature']}>
                    <img src={signature} alt="Signature" loading="lazy" />
                </div>
                <div className={styles['credits']}>
                    <p>
                    {language === 'he' ? 'צילום היצירות המוצגות באתר: טל בדרק' : 'Photography of the artworks displayed on the site: Tal Bedrack'}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
