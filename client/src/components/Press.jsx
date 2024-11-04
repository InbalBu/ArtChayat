import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Modal from 'react-modal';
import styles from '../css/Press.module.css';

const images = [

  // כתבה מלאה
  '/pressImages/article4.jpg',
  '/pressImages/article34.jpg',
  '/pressImages/article35.jpg',
  '/pressImages/article36.jpg',
  '/pressImages/article37.jpg',
  '/pressImages/article3.jpg',

  // פתיחת תערוכה
  '/pressImages/article38.jpg',
  '/pressImages/article39.jpg',

  // סטודיו לפיסול בברקן
  '/pressImages/article40.jpg',
  '/pressImages/article41.jpg',
  '/pressImages/article42.jpg',

  '/pressImages/article24.jpeg',

  // תערוכה תל אביב 1967
  '/pressImages/article44.jpg',
  '/pressImages/article43.jpg',
  
  '/pressImages/article20.jpeg',
  '/pressImages/article21.jpeg',
  '/pressImages/article22.jpeg',
  '/pressImages/article23.jpeg',
  '/pressImages/article25.jpg',
  '/pressImages/article27.jpg',
  '/pressImages/article28.jpg',
  '/pressImages/article29.jpg',
  '/pressImages/article30.jpg',
  '/pressImages/article31.jpg',
  '/pressImages/article32.jpg',
  '/pressImages/article33.jpg',
];

Modal.setAppElement('#root');

function Press({ language }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openModal = (index) => {
    setCurrentImage(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/press"
    : "https://artchayat.netlify.app/en/press";

  const captions = {
    '/pressImages/article38.jpg': language === 'he' ? 'פתיחת תערוכה של שושי במוזיאון התנ"ך, תל אביב. דצמבר 2000' : 'Opening of Shoshi\'s exhibition at the Bible Museum, Tel Aviv. December 2000.',
    '/pressImages/article39.jpg': language === 'he' ? 'תערוכה במוזיאון התנ"ך, תל אביב' : 'Shoshi\'s exhibition at the Bible Museum, Tel Aviv.',
    '/pressImages/article42.jpg': language === 'he' ? 'שושי חייט | בסטודיו לפיסול בברקן' : 'Shoshi Chayat At the sculpture studio in Berken',
    '/pressImages/article43.jpg': language === 'he' ? 'תערוכת יחיד ראשונה של יעקב חייט 1967, גלריה 220, תל-אביב' : 'First solo exhibition of Jacob Chayat 1967, Gallery 220, Tel Aviv',
    '/pressImages/article44.jpg': language === 'he' ? 'פתיחת תערוכה, גלריה 220, תל אביב' : 'Exhibition opening, Gallery 220, Tel Aviv'
  };

  return (
    <HelmetProvider>
      <div className={styles['press-container']} dir={language === 'he' ? 'rtl' : 'ltr'}>
        <Helmet>
          <title>{language === 'he' ? 'ArtChayat - קטעי עיתונות ופרסים | ארט חייט' : 'Press Clips And Videos | ArtChayat - ארט חייט'}</title>
          <meta name="description" content={language === 'he' ? 'מה נכתב על שושי ויעקב חייט ז"ל בעיתונות' : 'What was written about Shoshi and Yaacov Chayat z"l in the press'} />
          <meta name="keywords" content={language === 'he' ? 'שושי חייט, יעקב חייט, עיתונות, אומנות' : 'Shoshi Chayat, Yaacov Chayat, press, art'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={language === 'he' ? 'ArtChayat - קטעי עיתונות ופרסים | ארט חייט' : 'Press Clips And Videos | ArtChayat - ארט חייט'} />
          <meta property="og:description" content={language === 'he' ? 'מה נכתב על שושי ויעקב חייט ז"ל בעיתונות' : 'What was written about Shoshi and Yaacov Chayat z"l in the press'} />
          <meta property="og:image" content={images[0]} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />

          {/* Hreflang alternate links */}
          <link rel="alternate" href="https://artchayat.netlify.app/he/press" hreflang="he" />
          <link rel="alternate" href="https://artchayat.netlify.app/en/press" hreflang="en" />
        </Helmet>
        <header>
          <h1>{language === 'he' ? 'כתבות מאוסף אלבומים פרטי של זוג האומנים' : 'Articles from a private album collection of the artist couple'}</h1>
        </header>
        <div className={styles['articles-grid']}>
          {images.map((img, index) => (
            <div key={index} className={styles['article']} onClick={() => openModal(index)}>
              <img src={img} alt={`Article ${index + 1}`} />
              {captions[img] && (
                <p className={styles['caption']}>{captions[img]}</p>
              )}
            </div>
          ))}
        </div>

        {modalIsOpen && (
          <div className={styles['overlay']}>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Image Modal"
              className={styles['modal']}
              overlayClassName={styles['overlay']}
            >
              <button onClick={closeModal} className={styles['close-button']}>×</button>
              <button onClick={prevImage} className={`${styles['arrow-button']} ${styles['prev']}`}>‹</button>
              <img src={images[currentImage]} alt={`Article ${currentImage + 1}`} className={styles['modal-image']} />
              <button onClick={nextImage} className={`${styles['arrow-button']} ${styles['next']}`}>›</button>
            </Modal>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Press;
