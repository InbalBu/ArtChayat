import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional: for blur effect on loading
import styles from '../css/JacobGallery.module.css'; // Import the CSS module

function ShoshiGallery({ language }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: ''
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categoryMapping = useMemo(() => ({
    en: {
      all: 'All Categories',
      jerusalem: 'Jerusalem',
      women: 'Women',
      tributeToInbal: 'A Tribute To Inbal',
      tanachPaintings: 'The Tanach Paintings',
      views: 'Views',
      bookSeries: 'A Series Of Paintings From The Exhibition "Seeing God through the Darkness"'
    },
    he: {
      all: 'כל הקטגוריות',
      jerusalem: 'ירושלים',
      women: 'נשים',
      tributeToInbal: 'מחווה לענבל',
      tanachPaintings: 'ציורי התנך',
      views: 'נופים',
      bookSeries: '"סדרת ציורים מתוך התערוכה "לראות את אלוהים מבעד לחשכה'
    }
  }), []);

  const getCategoryLabel = useCallback((value) => {
    return categoryMapping[language][value];
  }, [categoryMapping, language]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/shoshi-gallery?lang=${language}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json(); // Parse JSON directly
      })
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
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

  if (error) return <div>{error}</div>;

  // Group products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className={`${styles['gallery-container']} ${language === 'he' ? styles['gallery-rtl'] : styles['gallery-ltr']}`}>
      <div className={styles['gallery-filters']}>
        <select name="category" onChange={handleFilterChange} value={filters.category}>
          <option value="">{getCategoryLabel('all')}</option>
          <option value="jerusalem">{getCategoryLabel('jerusalem')}</option>
          <option value="women">{getCategoryLabel('women')}</option>
          <option value="tributeToInbal">{getCategoryLabel('tributeToInbal')}</option>
          <option value="tanachPaintings">{getCategoryLabel('tanachPaintings')}</option>
          <option value="views">{getCategoryLabel('views')}</option>
          <option value="bookSeries">{getCategoryLabel('bookSeries')}</option>
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
                    <Link to={`/product/${product._id}`} className={styles['gallery-product-link']}>
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
        <div>{language === 'he' ? 'לא נמצאו מוצרים' : 'No products found'}</div>
      )}

      <button className={`${styles['gallery-scroll-to-top']} ${showScrollTop ? styles['show'] : ''}`} onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default ShoshiGallery;
