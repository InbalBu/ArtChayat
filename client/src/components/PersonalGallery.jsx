import React, { useState } from 'react';
import styles from '../css/PersonalGallery.module.css'; // Assuming you're using CSS Modules
import painting1 from '../images/personalGallery1.jpg';
import painting2 from '../images/personalGallery2.jpg';
import painting3 from '../images/personalGallery3.jpg';
import painting4 from '../images/personalGallery4.jpg';
import painting5 from '../images/personalGallery5.jpg';

const PersonalGallery = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: painting1, description: language === 'he' ? 'תיאור בעברית לתמונה 1' : 'Description for painting 1' },
    { src: painting2, description: language === 'he' ? 'תיאור בעברית לתמונה 2' : 'Description for painting 2' },
    { src: painting3, description: language === 'he' ? 'תיאור בעברית לתמונה 3' : 'Description for painting 3' },
    { src: painting4, description: language === 'he' ? 'תיאור בעברית לתמונה 4' : 'Description for painting 4' },
    { src: painting5, description: language === 'he' ? 'תיאור בעברית לתמונה 5' : 'Description for painting 5' },
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles['homepage-gallery']}>
      <h2 className='gridTitle'>
        {language === 'he' ? 'גלריה מזווית אישית' : 'A Gallery From A Personal Angle'}
      </h2>
      <div className={styles['homepage-grid']}>
        {images.map((image, index) => (
          <div key={index} className={styles['homepage-grid-item']}>
            <img
              src={image.src}
              alt={`Painting ${index + 1}`}
              onClick={() => handleImageClick(index)}
            />
            <p className={styles['image-description']}>{image.description}</p>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div className={styles['homepage-modal']} onClick={handleCloseModal}>
          <div
            className={styles['homepage-modal-content']}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles['homepage-close']} onClick={handleCloseModal}>
              &times;
            </span>
            <img src={images[selectedImage].src} alt={`Painting ${selectedImage + 1}`} />
            <p className={styles['modal-description']}>
              {images[selectedImage].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalGallery;
