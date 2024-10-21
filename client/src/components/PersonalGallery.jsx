import React, { useState } from 'react';
import styles from '../css/PersonalGallery.module.css'; // Assuming you're using CSS Modules
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
import painting20 from '../images/personalGallery20.jpeg';
import painting21 from '../images/personalGallery21.jpeg';
import painting22 from '../images/personalGallery22.jpg';
import painting23 from '../images/personalGallery23.jpg';
import painting24 from '../images/personalGallery24.jpg';
import painting25 from '../images/personalGallery25.jpg';
import painting26 from '../images/personalGallery26.jpg';
import painting27 from '../images/personalGallery27.jpg';

const PersonalGallery = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: painting20, dataId: 'painting20', description: language === 'he' ? 'תיבת נח | תערוכה בבנק הפועלים 2017' : 'Noah\'s ark Exhibition at Bank Hapoalim 2017' },
    { src: painting21, dataId: 'painting21', description: language === 'he' ? 'בסטודיו, ציור \'ניו יורק\'' : 'In the studio, painting "New York"' },
    { src: painting25, dataId: 'painting25', description: language === 'he' ? 'תיבת נח | יעקב חייט, מתוך תערוכה בבנק הפועלים' : 'Noah\'s ark - Jacob Chayat, from an exhibition at Bank Hapoalim' },
    { src: painting26, dataId: 'painting26', description: language === 'he' ? 'תיבת נח - שושי חייט | תערוכה בבנק הפועלים 2023' : 'Noah\'s Ark - Shoshi Chayat | Exhibition at Bank Hapoalim 2023' },
    { src: painting27, dataId: 'painting27', description: language === 'he' ? 'חגיגה בכרם - יעקב חייט | תערוכה בבנק הפועלים 2023' : 'A celebration in the vineyard - Yaakov Hait | Exhibition at Bank Hapoalim 2023' },
    { src: painting14, dataId: 'painting14', description: language === 'he' ? '' : '' },
    { src: painting15, dataId: 'painting15', description: language === 'he' ? 'שושי חייט, פתיחת תערוכת יחיד בגלרית "אחוזת בית" רעננה. שייקה לוי (הגששים) נשא דברי פתיחה' : 'Shoshi Chayat, opening of a solo exhibition at the Hazut Beit gallery in Ra\'anana. Shaika Levy (the trackers) delivered opening remarks' },
    { src: painting16, dataId: 'painting16', description: language === 'he' ? 'שושי חייט וחבר ותיק האומן עימנואל קיפניס' : 'Shoshi Chayat and an old friend of the artist Emanuel Kipnis' },
    { src: painting17, dataId: 'painting17', description: language === 'he' ? '' : '' },
    { src: painting18, dataId: 'painting18', description: language === 'he' ? 'יעקב חײַט מנהל מוזיאון בן-ארי מארח את נשיא המדינה חײַם הרצוג 1984' : 'Jacob Chayat director of the Ben-Ari Museum hosts the country\'s president Chaim Herzog 1984' },
    { src: painting19, dataId: 'painting19', description: language === 'he' ? 'יעקב חייט מנהל מוזיאון בן-ארי פותח תערוכה. ברקע מאחור, אהוד קינמון ראש עיריית בת-ים' : 'Jacob Chayat, director of the Ben-Ari Museum, opens an exhibition. In the background behind, Ehud Kinamon, Mayor of Bat-Yam' },
    { src: painting22, dataId: 'painting22', description: language === 'he' ? 'קיר אומן בגלריה אגוזי תל אביב 2016' : 'Artist\'s wall at the Agozi Gallery Tel Aviv 2016' },
    { src: painting1, dataId: 'painting1', description: language === 'he' ? 'יעקב חייט בשנותיו האחרונות בביתו בחולון' : 'Jacob Chayat in his last years at his home in Holon' },
    { src: painting2, dataId: 'painting2', description: language === 'he' ? 'יעקב חייט בשנותיו האחרונות בביתו בחולון' : 'Jacob Chayat in his last years at his home in Holon' },
    { src: painting3, dataId: 'painting3', description: language === 'he' ? 'יעקב חייט בשנותיו האחרונות בביתו בחולון' : 'Jacob Chayat in his last years at his home in Holon' },
    { src: painting4, dataId: 'painting4', description: language === 'he' ? '' : '' },
    { src: painting5, dataId: 'painting5', description: language === 'he' ? 'בסטודיו בביתו של הצייר יעקב חייט. מסדרת ציורי הילדים' : 'In the studio in the house of the painter Jacob Chayat. The series of children\'s drawings' },
    { src: painting6, dataId: 'painting6', description: language === 'he' ? 'שושי חייט מלמדת בשיעור ציור, בסטודיו בביתם בברקן' : 'Shoshi Chayat teaches a painting class, in the studio at their home in Barkan' },
    { src: painting7, dataId: 'painting7', description: language === 'he' ? 'יעקב חייט מלמד בשיעור ציור, בסטודיו בביתם בברקן' : 'Jacob Chayat teaches a painting class, in the studio at their home in Barkan' },
    { src: painting8, dataId: 'painting8', description: language === 'he' ? 'שושי חייט מפסלת בסטודיו לפיסול בביתה בברקן' : 'Shoshi Chayat sculpts in the sculpture studio at her home in Barkan' },
    { src: painting23, dataId: 'painting23', description: language === 'he' ? 'קיר אומן בגלריה אגוזי תל אביב 2016' : 'Artist\'s wall at the Agozi Gallery Tel Aviv 2016' },
    { src: painting9, dataId: 'painting9', description: language === 'he' ? 'יום בסטודיו. שושי חייט, חולון' : 'A day in the studio. Shoshi Chayat, Holon' },
    { src: painting10, dataId: 'painting10', description: language === 'he' ? 'פתיחת תערוכה רישומים של שושי חייט. יעקב חייט עם טל ברודי. שנות ה-70' : 'Opening of an exhibition of drawings by Shoshi Chayat. Jacob Chayat with Tal Brody. The 70s' },
    { src: painting11, dataId: 'painting11', description: language === 'he' ? 'יעקב חייט בסטודיו. חולון' : 'Jacob Chayat in the studio. Holon' },
    { src: painting12, dataId: 'painting12', description: language === 'he' ? 'שושי חייט בסטודיו לפיסול בביתה, ברקן' : 'Shoshi Chayat in the sculpture studio at her home in Barkan' },
    { src: painting24, dataId: 'painting24', description: language === 'he' ? 'קיר אומן בגלריה אגוזי תל אביב 2016' : 'Artist\'s wall at the Agozi Gallery Tel Aviv 2016' },
    { src: painting13, dataId: 'painting13', description: language === 'he' ? 'הזמנה לתערוכת רישומים, שושי חייט. שטיח קיר אומנותי, עבודת יד לפי רישום "שבת", שושי חייט' : 'Invitation to an exhibition of drawings, Shoshi Chayat. Artistic tapestry, handmade according to the inscription "Shabbat", Shoshi Chayat' },
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/personalGallery"
    : "https://artchayat.netlify.app/en/personalGallery";

  const alternateUrl = language === 'he'
    ? "https://artchayat.netlify.app/en/personalGallery"
    : "https://artchayat.netlify.app/he/personalGallery";

  return (
    <HelmetProvider>
      <div className={styles['homepage-gallery']}>
        <Helmet>
          <title>{language === 'he' ? 'ArtChayat - גלריה מזווית אישית | ארט חייט' : 'Personal Gallery | ArtChayat - ארט חייט'}</title>
          <meta name="description" content={language === 'he' ? 'גלריה של ציורים אישיים ותערוכות' : 'Gallery of personal paintings and exhibitions'} />
          <meta name="keywords" content={language === 'he' ? 'גלריה, ציורים, תערוכות' : 'gallery, paintings, exhibitions'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={language === 'he' ? 'ArtChayat - גלריה מזווית אישית | ארט חייט' : 'Personal Gallery | ArtChayat - ארט חייט'} />
          <meta property="og:description" content={language === 'he' ? 'גלריה של ציורים אישיים ותערוכות' : 'Gallery of personal paintings and exhibitions'} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />

          {/* Hreflang alternate links */}
          <link rel="alternate" href={pageUrl} hreflang={language} />
          <link rel="alternate" href={alternateUrl} hreflang={language === 'he' ? 'en' : 'he'} />
        </Helmet>

        <h2 className='gridTitle'>
          {language === 'he' ? 'גלריה מזווית אישית' : 'A Gallery From A Personal Angle'}
        </h2>
        <div className={styles['homepage-grid']}>
          {images.map((image, index) => (
            <div key={index} className={styles['homepage-grid-item']}>
              <img
                src={image.src}
                alt={`${index + 1}`}
                data-id={image.dataId}
                onClick={() => handleImageClick(index)}
              />
              <p dir={language === 'he' ? 'rtl' : 'ltr'} className={styles['image-description']}>{image.description}</p>
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
    </HelmetProvider>
  );
};

export default PersonalGallery;
