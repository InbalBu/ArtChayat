import React from 'react';
import styles from '../css/Footer.module.css'; // Import the CSS module

function Footer({ language }) {
    return (
        <footer className={styles.footer} dir={language === 'he' ? 'rtl' : 'ltr'}>
            <div className={styles['footer-content']}>
                <h2>{language === 'he' ? 'ארט חייט | ArtChayat' : 'Art Chayat'}</h2>
                <p>© {new Date().getFullYear()} {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
                <div className={styles['footer-links']}>
                    <a href="/">{language === 'he' ? 'בית' : 'Home'}</a>
                    <a href="/gallery">{language === 'he' ? 'גלריה' : 'Gallery'}</a>
                    <a href="/about">{language === 'he' ? 'אודות' : 'About'}</a>
                    <a href="/contact">{language === 'he' ? 'צור קשר' : 'Contact'}</a>
                    <a href="/shop">{language === 'he' ? 'חנות' : 'Shop'}</a>
                </div>
                <p>{language === 'he' ? 'עקבו אחרינו ברשתות החברתיות:' : 'Follow us on social media:'}</p>
                <div className={styles['social-media']}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        {language === 'he' ? 'פייסבוק' : 'Facebook'}
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        {language === 'he' ? 'אינסטגרם' : 'Instagram'}
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        {language === 'he' ? 'טוויטר' : 'Twitter'}
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
