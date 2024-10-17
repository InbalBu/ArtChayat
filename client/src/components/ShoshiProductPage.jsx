import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../css/ProductPage.module.css'; // Import the CSS module

function ShoshiProductPage({ language }) {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for navigation

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';
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
    navigate('/shoshi/gallery'); // Navigate back to the gallery page
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  // Convert price from string to number
  const price = parseFloat(product.price.replace(/,/g, ''));

  const pageUrl = language === 'he'
    ? `https://artchayat.netlify.app/he/shoshi/product/${id}`
    : `https://artchayat.netlify.app/en/shoshi/product/${id}`;

  const alternateUrl = language === 'he'
    ? `https://artchayat.netlify.app/en/shoshi/product/${id}`
    : `https://artchayat.netlify.app/he/shoshi/product/${id}`;

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
          <link rel="alternate" href={pageUrl} hreflang={language} />
          <link rel="alternate" href={alternateUrl} hreflang={language === 'he' ? 'en' : 'he'} />
        </Helmet>
        <div className={`${styles.productGrid} ${language === 'he' ? styles.rtl : styles.ltr}`}>
          <div className={styles.productImage} onClick={handleImageClick}>
            <img src={product.imageURL} alt={product.name} />
          </div>
          <div className={styles.productDetails}>
            <h1>{product.name} / {product.artist}</h1>
            <p>{language === 'he' ? 'גודל' : 'Size'}: {product.size} {language === 'he' ? 'ס"מ' : 'cm'}</p>
            <p>{language === 'he' ? 'טכניקת עבודה' : 'Technic'}: {product.technic}</p>
            <p>
              {price === 0
                ? <span className={styles.notForSale}>{language === 'he' ? 'לא למכירה' : 'Not for Sale'}</span>
                : `${language === 'he' ? 'מחיר' : 'Price'}: ${product.price}₪`
              }
            </p>
            <div className={styles.contactInfo}>
              {language === 'he' ? (
                <>
                  <p>לרכישה ופרטים נוספים נא ליצור קשר בטלפונים:</p>
                  <p>מיכל בוקריס - <a href="https://api.whatsapp.com/send/?phone=9720538311215&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">וואטסאפ</a></p>
                  <p>ריקי חייט - <a href="https://api.whatsapp.com/send/?phone=9720526652571&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">וואטסאפ</a></p>
                  <p>אימייל - <a href="mailto:artchayat@gmail.com">artchayat@gmail.com</a></p>
                </>
              ) : (
                <>
                  <p>For purchase and more details, please contact:</p>
                  <p>Michal Bukris - <a href="https://api.whatsapp.com/send/?phone=9720538311215&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
                  <p>Riki Khayat - <a href="https://api.whatsapp.com/send/?phone=9720526652571&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
                  <p>Email - <a href="mailto:artchayat@gmail.com">artchayat@gmail.com</a></p>
                </>
              )}
            </div>
            <button className={styles.button} onClick={handleReturnToGallery}>{language === 'he' ? 'חזרה לגלריה' : 'Return to Gallery'}</button>
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <span className={styles.close} onClick={closeModal}>&times;</span>
              <img src={product.imageURL} alt={product.name} className={styles.modalImage} />
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default ShoshiProductPage;
