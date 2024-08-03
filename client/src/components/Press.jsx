import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import styles from '../css/Press.module.css'; // Import the CSS module

const images = [
  'pressImages/articl1.jpg',
  'pressImages/article2.jpg',
  'pressImages/article10.jpeg',
  'pressImages/article11.jpeg',
  'pressImages/article12.jpeg',
  'pressImages/article13.jpeg',
  'pressImages/article14.jpeg',
  'pressImages/article15.jpeg',
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

  return (
    <div className={styles['press-container']}>
      <Helmet>
        <title>{language === 'he' ? 'מן העיתונות - שושי ויעקב חייט' : 'From the Press - Shoshi and Yaacov Khayat'}</title>
        <meta name="description" content={language === 'he' ? 'מה נכתב על שושי ויעקב חייט ז"ל בעיתונות' : 'What was written about Shoshi and Yaacov Khayat z"l in the press'} />
        <meta name="keywords" content={language === 'he' ? 'שושי חייט, יעקב חייט, עיתונות, אומנות' : 'Shoshi Khayat, Yaacov Khayat, press, art'} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <header>
        <h1>{language === 'he' ? 'מן העיתונות' : 'From the Press'}</h1>
        <p>{language === 'he' ? 'מה נכתב על שושי ויעקב חייט ז"ל' : 'What was written about Shoshi and Yaacov Khayat z"l'}</p>
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
            <button onClick={prevImage} className={styles['arrow-button']}>‹</button>
            <img src={images[currentImage]} alt={`Article ${currentImage + 1}`} className={styles['modal-image']} />
            <button onClick={nextImage} className={styles['arrow-button']}>›</button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Press;
