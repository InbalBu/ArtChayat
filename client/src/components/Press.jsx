import React, { useState } from 'react';
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

// Set the app element for the modal
Modal.setAppElement('#root');

function Press() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles['press-container']}>
      <h1>מן העיתונות</h1>
      <p>מה נכתב על הציירים שושי ויעקב חייט ז"ל</p>
      <div className={styles['press-grid']}>
        {images.map((image, index) => (
          <div key={index} className={styles['press-item']} onClick={() => openModal(index)}>
            <img src={image} alt={`Press item ${index + 1}`} />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className={styles['press-modal']}
        overlayClassName={styles['press-overlay']}
      >
        <button onClick={closeModal} className={styles['press-close-button']}>X</button>
        <button onClick={prevImage} className={`${styles['press-nav-button']} ${styles['press-nav-button-prev']}`}>❮</button>
        <button onClick={nextImage} className={`${styles['press-nav-button']} ${styles['press-nav-button-next']}`}>❯</button>
        <div className={styles['press-modal-content']}>
          <img src={images[currentImageIndex]} alt={`Press item ${currentImageIndex + 1}`} />
        </div>
      </Modal>
    </div>
  );
}

export default Press;
