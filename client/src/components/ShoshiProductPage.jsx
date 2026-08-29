import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/ProductPage.module.css'; // Import the CSS module
import { cloudinarySrcSet } from '../utils/cloudinary';
import RoomPreview from './RoomPreview/RoomPreview';

const MAIN_IMAGE_WIDTHS = [500, 800, 1200];
const MODAL_IMAGE_WIDTHS = [800, 1200, 1600];

function ShoshiProductPage({ language }) {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for navigation

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';
    // Fetch the product details with language parameter
    fetch(`${apiUrl}/api/products/shoshi-gallery/${id}?lang=${language}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details.');
      });
  }, [id, language]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReturnToGallery = () => {
    navigate(`/${language}/shoshi/gallery`); // Navigate back to the gallery page
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  // Convert price from string to number
  const price = parseFloat(product.price.replace(/,/g, ''));

  const pageUrl = language === 'he'
    ? `https://artchayat.netlify.app/he/shoshi/product/${id}`
    : `https://artchayat.netlify.app/en/shoshi/product/${id}`;

  const mainImage = cloudinarySrcSet(product.imageURL, MAIN_IMAGE_WIDTHS);
  const modalImage = cloudinarySrcSet(product.imageURL, MODAL_IMAGE_WIDTHS, 1200);

  return (
    <HelmetProvider>
      <div className={`${styles.productPage} ${language === 'he' ? styles.rtl : styles.ltr}`}>
        <Helmet>
          <title>{language === 'he' ? `ArtChayat - שושי חייט | גלריה | ${product.name} | ארט חייט` : `Shoshi Chayat | Gallery | ${product.name} | ArtChayat - ארט חייט`}</title>
          <meta name="description" content={language === 'he' ? `פרטים אודות יצירתה של שושי חייט בשם ${product.name}.` : `Details about the artwork by Shoshi Chayat named ${product.name}.`} />
          <meta name="keywords" content={language === 'he' ? `שושי חייט, אומנות, ${product.name}` : `Shoshi Chayat, art, ${product.name}`} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={language === 'he' ? `ArtChayat - שושי חייט | גלריה | ${product.name} | ארט חייט` : `Shoshi Chayat | Gallery | ${product.name} | ArtChayat - ארט חייט`} />
          <meta property="og:description" content={language === 'he' ? `פרטים אודות יצירתה של שושי חייט בשם ${product.name}.` : `Details about the artwork by Shoshi Chayat named ${product.name}.`} />
          <meta property="og:image" content={product.imageURL} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="article" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />


          {/* Hreflang alternate links */}
          <link rel="alternate" href={`https://artchayat.netlify.app/he/shoshi/product/${id}`} hreflang="he" />
          <link rel="alternate" href={`https://artchayat.netlify.app/en/shoshi/product/${id}`} hreflang="en" />
        </Helmet>
        <div className={`${styles.productGrid} ${language === 'he' ? styles.rtl : styles.ltr}`}>
          <div className={styles.productImage} onClick={handleImageClick}>
            <img src={mainImage.src} srcSet={mainImage.srcSet} sizes="500px" alt={product.name} />
          </div>
          <div className={styles.productDetails}>
            <h1>{product.name} / {product.artist}</h1>
            <div className={styles['gallery-product-size']}>
              {language === 'he' ? 'גודל:' : 'Size:'}{' '}
              {product.size} {language === 'he' ? 'ס"מ' : 'cm'}
            </div>
            <p>{language === 'he' ? 'טכניקת עבודה' : 'Technic'}: {product.technic}</p>
            {price === 0
              ? <span className={styles.notForSale}>{language === 'he' ? 'לא למכירה' : 'Not for Sale'}</span>
              : price === 1
                // ₪1 is the gallery's own convention for "sold" (see ShoshiGallery.jsx) -
                // this page was missing that branch entirely, so a sold piece fell through
                // to the price tag and displayed literally "1₪".
                ? <span className={styles.sold}>{language === 'he' ? 'נמכר' : 'Sold'}</span>
                : <span className={styles.priceTag}>{product.price}₪</span>
            }
            <div className={styles.purchaseBox}>
              <h3>{language === 'he' ? 'מעוניינים ברכישה? צרו קשר:' : 'Interested in purchasing? Get in touch:'}</h3>
              <div className={styles.contactButtons}>
                <a className={styles.contactButton} href="https://api.whatsapp.com/send/?phone=9720538311215&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faWhatsapp} />
                  {language === 'he' ? 'מיכל בוקריס' : 'Michal Bukris'}
                </a>
                <a className={styles.contactButton} href="https://api.whatsapp.com/send/?phone=9720526652571&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faWhatsapp} />
                  {language === 'he' ? 'ריקי חייט' : 'Riki Chayat'}
                </a>
                <a className={styles.contactButton} href="mailto:artchayat@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                  {language === 'he' ? 'אימייל' : 'Email'}
                </a>
              </div>
            </div>
            <button className={styles.button} onClick={handleReturnToGallery}>{language === 'he' ? 'חזרה לגלריה' : 'Return to Gallery'}</button>
          </div>
        </div>

        <div className={styles.roomPreviewSection}>
          <h2>{language === 'he' ? 'כך תיראה היצירה הזו בבית שלכם' : 'See This Artwork In Your Home'}</h2>
          <RoomPreview image={product.imageURL} alt={product.name} language={language} size={product.size} />
        </div>

        {isModalOpen && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <span className={styles.close} onClick={closeModal}>&times;</span>
              <img src={modalImage.src} srcSet={modalImage.srcSet} sizes="80vw" alt={product.name}  className={`${styles.modalImage} ${product.category === 'Triptych, Shoshi\'s Circus of Life' || product.category === 'טריפטיכון, קרקס החיים של שושי' ? styles.tryptichCircus : ''}`} />
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default ShoshiProductPage;
