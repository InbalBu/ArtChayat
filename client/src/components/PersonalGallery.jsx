import React, { useState } from 'react';
import styles from '../css/PersonalGallery.module.css'; // Assuming you're using CSS Modules

// Import images
import painting1 from '../images/personalGallery1.jpg';
import painting2 from '../images/personalGallery2.jpg';
import painting3 from '../images/personalGallery3.jpg';
import painting4 from '../images/personalGallery4.jpg';
import painting5 from '../images/personalGallery5.jpg';
import painting6 from '../images/personalGallery6.jpg';
import painting7 from '../images/personalGallery7.jpg';
import painting8 from '../images/personalGallery8.jpg';
import painting9 from '../images/personalGallery9.jpg';
import painting10 from '../images/personalGallery10.jpg';
import painting11 from '../images/personalGallery11.jpg';
import painting12 from '../images/personalGallery12.jpg';
import painting13 from '../images/personalGallery13.jpg';
import painting14 from '../images/personalGallery14.jpg';
import painting15 from '../images/personalGallery15.jpg';
import painting16 from '../images/personalGallery16.jpg';
import painting17 from '../images/personalGallery17.jpg';
import painting18 from '../images/personalGallery18.jpg';
import painting19 from '../images/personalGallery19.jpg';

const PersonalGallery = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: painting14, description: language === 'he' ? 'תיאור בעברית לתמונה 14' : 'Description for painting 14' },
    { src: painting15, description: language === 'he' ? 'תיאור בעברית לתמונה 15' : 'Description for painting 15' },
    { src: painting16, description: language === 'he' ? 'תיאור בעברית לתמונה 16' : 'Description for painting 16' },
    { src: painting17, description: language === 'he' ? 'תיאור בעברית לתמונה 17' : 'Description for painting 17' },
    { src: painting18, description: language === 'he' ? 'תיאור בעברית לתמונה 18' : 'Description for painting 18' },
    { src: painting19, description: language === 'he' ? 'תיאור בעברית לתמונה 19' : 'Description for painting 19' },
    { src: painting1, description: language === 'he' ? 'תיאור בעברית לתמונה 1' : 'Description for painting 1' },
    { src: painting2, description: language === 'he' ? 'תיאור בעברית לתמונה 2' : 'Description for painting 2' },
    { src: painting3, description: language === 'he' ? 'תיאור בעברית לתמונה 3' : 'Description for painting 3' },
    { src: painting4, description: language === 'he' ? 'תיאור בעברית לתמונה 4' : 'Description for painting 4' },
    { src: painting5, description: language === 'he' ? 'תיאור בעברית לתמונה 5' : 'Description for painting 5' },
    { src: painting6, description: language === 'he' ? 'תיאור בעברית לתמונה 6' : 'Description for painting 6' },
    { src: painting7, description: language === 'he' ? 'תיאור בעברית לתמונה 7' : 'Description for painting 7' },
    { src: painting8, description: language === 'he' ? 'תיאור בעברית לתמונה 8' : 'Description for painting 8' },
    { src: painting9, description: language === 'he' ? 'תיאור בעברית לתמונה 9' : 'Description for painting 9' },
    { src: painting10, description: language === 'he' ? 'תיאור בעברית לתמונה 10' : 'Description for painting 10' },
    { src: painting11, description: language === 'he' ? 'תיאור בעברית לתמונה 11' : 'Description for painting 11' },
    { src: painting12, description: language === 'he' ? 'תיאור בעברית לתמונה 12' : 'Description for painting 12' },
    { src: painting13, description: language === 'he' ? 'תיאור בעברית לתמונה 13' : 'Description for painting 13' },
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
