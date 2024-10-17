import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Modal from 'react-modal';
import styles from '../css/Press.module.css'; // Import the CSS module

const images = [
  'pressImages/article3.jpg',
  'pressImages/article24.jpeg',
  'pressImages/article20.jpeg',
  'pressImages/article21.jpeg',
  'pressImages/article22.jpeg',
  'pressImages/article23.jpeg',
  'pressImages/article25.jpg',
  'pressImages/article4.jpg',
  'pressImages/article27.jpg',
  'pressImages/article26.jpg',
  'pressImages/article28.jpg',
  'pressImages/article29.jpg',
  'pressImages/article30.jpg',
  'pressImages/article31.jpg',
  'pressImages/article32.jpg',
  'pressImages/article33.jpg',
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

  const alternateUrl = language === 'he'
    ? "https://artchayat.netlify.app/en/press"
    : "https://artchayat.netlify.app/he/press";

  return (
    <HelmetProvider>
      <div className={styles['press-container']}>
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
          <link rel="alternate" href={pageUrl} hreflang={language} />
          <link rel="alternate" href={alternateUrl} hreflang={language === 'he' ? 'en' : 'he'} />
        </Helmet>
        <header>
          <h1>{language === 'he' ? 'כתבות מאוסף אלבומים פרטי של זוג האומנים' : 'Articles from a private album collection of the artist couple'}</h1>
        </header>
        <div className={styles['articles-grid']}>
          {images.map((img, index) => (
            <div key={index} className={styles['article']} onClick={() => openModal(index)}>
              <img src={img} alt={`Article ${index + 1}`} />
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
