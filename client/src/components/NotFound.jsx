import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from '../css/NotFound.module.css';

function NotFound({ language }) {
  const isHebrew = language === 'he';

  return (
    <HelmetProvider>
      <div className={styles['not-found']} dir={isHebrew ? 'rtl' : 'ltr'}>
        <Helmet>
          <title>{isHebrew ? 'הדף לא נמצא | ארט חייט' : 'Page Not Found | ArtChayat'}</title>
          {/* This is a client-rendered SPA, so we can't send a real HTTP 404
              status - Netlify's catch-all rewrite always returns 200. noindex
              is the standard way to tell Google not to index this URL anyway. */}
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <p className={styles['not-found-code']}>404</p>
        <h1>{isHebrew ? 'הדף לא נמצא' : 'Page Not Found'}</h1>
        <p className={styles['not-found-message']}>
          {isHebrew
            ? 'הדף שחיפשת לא קיים או שהוסר.'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link to={`/${language}`} className={styles['not-found-link']}>
          {isHebrew ? 'חזרה לדף הבית' : 'Back to homepage'}
        </Link>
      </div>
    </HelmetProvider>
  );
}

export default NotFound;
