import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: for blur effect on loading
import styles from '../css/JacobGallery.module.css'; // Import the CSS module
import logoEN from '../images/logoEN.png';

// CSS for the loader
const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

function Spinner() {
  return (
    <div style={loaderStyle}>
      <div className={styles.spinner}></div>
    </div>
  );
}

function ShoshiGallery({ language }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [filters, setFilters] = useState({
    category: ''
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categoryMapping = useMemo(() => ({
    en: {
      all: 'All Categories',
      clowns: 'Clowns',
      flowers: 'Flowers',
      colorfulHarmony: 'Colorful Harmony',
      tanachPaintings: 'The Tanach Paintings',
      sketches: 'Sketches',
      watercolor: 'Watercolor',
      prints: 'Prints',
      triptychCircus: "Triptych, Shoshi's Circus of Life"
    },
    he: {
      all: 'כל הקטגוריות',
      clowns: 'ליצנים',
      flowers: 'פרחים',
      colorfulHarmony: 'הרמוניה צבעונית',
      tanachPaintings: 'ציורי התנך',
      sketches: 'רישומים',
      watercolor: 'אקוורל',
      prints: 'הדפסים',
      triptychCircus: 'טריפטיכון, קרקס החיים של שושי'
    }
  }), []);

  const getCategoryLabel = useCallback((value) => {
    return categoryMapping[language][value];
  }, [categoryMapping, language]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';
    setLoading(true); // Set loading to true before fetch
    fetch(`${apiUrl}/api/products/shoshi-gallery?lang=${language}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json(); // Parse JSON directly
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetch
      });
  }, [language]);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = filters.category === '' || product.category === getCategoryLabel(filters.category);
      return matchesCategory;
    });

    setFilteredProducts(filtered);
  }, [filters, products, getCategoryLabel]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) return <Spinner />; // Show loader while loading
  if (error) return <div>{error}</div>;

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const pageUrl = language === 'he'
    ? "https://artchayat.netlify.app/he/shoshi/gallery"
    : "https://artchayat.netlify.app/en/shoshi/gallery";

  return (
    <HelmetProvider>
      <div className={`${styles['gallery-container']} ${language === 'he' ? styles['gallery-rtl'] : styles['gallery-ltr']}`}>
        <Helmet>
          <title>{language === 'he' ? 'גלריה - שושי חייט' : 'Gallery - Shoshi Chayat'}</title>
          <meta name="description" content={language === 'he' ? 'גלריה של יצירות שושי חייט' : 'Gallery of Shoshi Chayat\'s works'} />
          <meta name="keywords" content={language === 'he' ? 'שושי חייט, גלריה, אומנות' : 'Shoshi Chayat, gallery, art'} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={language === 'he' ? 'גלריה - שושי חייט' : 'Gallery - Shoshi Chayat'} />
          <meta property="og:description" content={language === 'he' ? 'גלריה של יצירות שושי חייט' : 'Gallery of Shoshi Chayat\'s works'} />
          <meta property="og:image" content={logoEN} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />

          {/* Canonical URL */}
          <link rel="canonical" href={pageUrl} />


          {/* Hreflang alternate links */}
          <link rel="alternate" href="https://artchayat.netlify.app/he/shoshi/gallery" hreflang="he" />
          <link rel="alternate" href="https://artchayat.netlify.app/en/shoshi/gallery" hreflang="en" />
        </Helmet>
        <div className={styles['gallery-filters']}>
          <select name="category" onChange={handleFilterChange} value={filters.category}>
            <option value="">{getCategoryLabel('all')}</option>
            <option value="clowns">{getCategoryLabel('clowns')}</option>
            <option value="flowers">{getCategoryLabel('flowers')}</option>
            <option value="colorfulHarmony">{getCategoryLabel('colorfulHarmony')}</option>
            <option value="tanachPaintings">{getCategoryLabel('tanachPaintings')}</option>
            <option value="sketches">{getCategoryLabel('sketches')}</option>
            <option value="watercolor">{getCategoryLabel('watercolor')}</option>
            <option value="prints">{getCategoryLabel('prints')}</option>
            <option value="triptychCircus">{getCategoryLabel('triptychCircus')}</option> 
          </select>
        </div>
        {Object.keys(groupedProducts).length > 0 ? (
          Object.keys(groupedProducts).map(category => (
            <div key={category} className={styles['gallery-category-section']}>
              <h2 className={styles['gallery-category-header']}>{category}</h2>
              <div className={styles['gallery-grid']}>
                {groupedProducts[category].map(product => {
                  const price = parseFloat(product.price.replace(/,/g, ''));
                  return (
                    <div className={styles['gallery-item']} key={product._id}>
                      <Link to={`/${language}/shoshi/product/${product._id}`} className={styles['gallery-product-link']}>
                        <LazyLoadImage
                          src={product.imageURL}
                          alt={product.name}
                          className={styles['gallery-product-image']}
                          effect="blur"
                        />
                        <div className={styles['gallery-product-info']}>
                          <div className={styles['gallery-product-name']}>{product.name}</div>
                          <div className={styles['gallery-product-price']}>
                            {price === 0
                              ? <span className={styles['gallery-not-for-sale']}>{language === 'he' ? 'לא למכירה' : 'Not for Sale'}</span>
                              : price === 1
                                ? <span className={styles['gallery-sold']}>{language === 'he' ? 'נמכר' : 'Sold'}</span>
                                : `${language === 'he' ? 'מחיר:' : 'Price:'} ${product.price}₪`
                            }
                          </div>
                          <div className={styles['gallery-product-size']}>{language === 'he' ? 'גודל:' : 'Size:'} {product.size}</div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div>{language === 'he' ? 'לא נמצאו ציורים' : 'No products found'}</div>
        )}

        <button className={`${styles['gallery-scroll-to-top']} ${showScrollTop ? styles['show'] : ''}`} onClick={scrollToTop}>
          ↑
        </button>
      </div>
    </HelmetProvider>
  );
}

export default ShoshiGallery;
