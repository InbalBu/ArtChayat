import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/JacobGallery.css'; // Import the CSS file

function JacobGallery({ language }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100000], // Example high price range
    technic: '' // Corrected filter for technic
  });

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
      
      // Convert price from string to number
      const price = parseFloat(product.price.replace(/,/g, ''));

      const matchesCategory = filters.category === '' || product.category === filters.category;
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesTechnic = filters.technic === '' || product.technic.includes(filters.technic);

      console.log(`Category match: ${matchesCategory}, Price match: ${matchesPrice}, Technic match: ${matchesTechnic}`); // Log filter matches

      return matchesCategory && matchesPrice && matchesTechnic;
    });

    console.log('Filtered products:', filtered); // Log products after filtering
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'priceRange') {
      const [min, max] = value.split(',').map(Number);
      setFilters(prevFilters => ({
        ...prevFilters,
        priceRange: [min, max]
      }));
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
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
          <option value="">All Categories</option>
          {/* Example categories */}
          <option value="ירושלים">ירושלים</option>
          <option value="נשים">נשים</option>
        </select>

        <input
          type="number"
          name="priceRange"
          value={filters.priceRange[0]}
          onChange={(e) => setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: [Number(e.target.value), prevFilters.priceRange[1]]
          }))}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="priceRange"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prevFilters => ({
            ...prevFilters,
            priceRange: [prevFilters.priceRange[0], Number(e.target.value)]
          }))}
          placeholder="Max Price"
        />

        <input
          type="text"
          name="technic"
          value={filters.technic}
          onChange={handleFilterChange}
          placeholder="Technic Specification"
        />
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
        <div>No products found</div>
      )}
    </div>
  );
}

export default JacobGallery;
