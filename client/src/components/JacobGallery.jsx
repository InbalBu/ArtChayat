import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/JacobGallery.css'; // Import the CSS file

function JacobGallery({ language }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: ''
  });

  const categoryMapping = {
    en: {
      all: 'All Categories',
      jerusalem: 'Jerusalem',
      women: 'Women',
      tributeToInbal: 'A Tribute To Inbal'
    },
    he: {
      all: 'כל הקטגוריות',
      jerusalem: 'ירושלים',
      women: 'נשים',
      tributeToInbal: 'מחווה לענבל'
    }
  };

  const getCategoryValue = (category) => {
    const mapping = language === 'he' ? categoryMapping.he : categoryMapping.en;
    return Object.keys(mapping).find(key => mapping[key] === category) || '';
  };

  const getCategoryLabel = (value) => {
    return categoryMapping[language][value];
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/jacob-gallery?lang=${language}`)
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
    console.log('Products before filtering:', products); // Log products before filtering

    const filtered = products.filter(product => {
      console.log('Applying filter to:', product); // Log each product being filtered

      const matchesCategory = filters.category === '' || product.category === getCategoryLabel(filters.category);
      console.log(`Category match: ${matchesCategory}`); // Log filter match

      return matchesCategory;
    });

    console.log('Filtered products:', filtered); // Log products after filtering
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
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
    <div className={`gallery-container ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="filters">
        <select name="category" onChange={handleFilterChange} value={filters.category}>
          <option value="">{getCategoryLabel('all')}</option>
          <option value="jerusalem">{getCategoryLabel('jerusalem')}</option>
          <option value="women">{getCategoryLabel('women')}</option>
          <option value="tributeToInbal">{getCategoryLabel('tributeToInbal')}</option>
        </select>
      </div>

      {Object.keys(groupedProducts).length > 0 ? (
        Object.keys(groupedProducts).map(category => (
          <div key={category} className="category-section">
            <h2 className="category-header">{category}</h2>
            <div className="gallery-grid">
              {groupedProducts[category].map(product => {
                const price = parseFloat(product.price.replace(/,/g, ''));
                return (
                  <div className="gallery-item" key={product._id}>
                    <Link to={`/product/${product._id}`} className="product-link">
                      <img src={product.imageURL} alt={product.name} className="product-image" />
                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-price">
                          {price === 0 
                            ? <span className="not-for-sale">{language === 'he' ? 'לא למכירה' : 'Not for Sale'}</span> 
                            : `${language === 'he' ? 'מחיר:' : 'Price:'} ${product.price}₪`
                          }
                        </div>
                        <div className="product-size">{language === 'he' ? 'גודל:' : 'Size:'} {product.size}</div>
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
    </div>
  );
}

export default JacobGallery;
