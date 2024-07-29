import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductPage.css'; // Import the CSS file

function ProductPage({ language }) {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Use navigate for navigation

    useEffect(() => {
        // Fetch the product details with language parameter
        fetch(`http://localhost:5000/api/products/${id}?lang=${language}`)
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
        navigate('/jacob/gallery'); // Navigate back to the gallery page
    };

    if (error) return <div>{error}</div>;
    if (!product) return <div>Loading...</div>;

    // Convert price from string to number
    const price = parseFloat(product.price.replace(/,/g, ''));

    return (
        <div className={`product-page ${language === 'he' ? 'rtl' : 'ltr'}`}>
            <div className={`product-grid ${language === 'he' ? 'rtl' : 'ltr'}`}>
                {language === 'he' ? (
                    <>
                        <div className="product-image" onClick={handleImageClick}>
                            <img src={product.imageURL} alt={product.name} />
                        </div>
                        <div className="product-details">
                            <h1>{product.name} / {product.artist}</h1>
                            <p>גודל: {product.size} ס"מ</p>
                            <p>טכניקת עבודה: {product.technic}</p>
                            <p>
                                {price === 0 
                                    ? <span className="not-for-sale">לא למכירה</span> 
                                    : `מחיר: ${product.price}₪`
                                }
                            </p>
                            <div className="contact-info">
                                <p>לרכישה ופרטים נוספים נא ליצור קשר בטלפונים:</p>
                                <p>מיכל בוקריס - <a href="https://wa.me/0538311215" target="_blank" rel="noopener noreferrer">וואטסאפ</a></p>
                                <p>ריקי חייט - <a href="https://wa.me/0526652571" target="_blank" rel="noopener noreferrer">וואטסאפ</a></p>
                                <p>אימייל - <a href="mailto:artchayat@gmail.com">artchayat@gmail.com</a></p>
                            </div>
                            <button className="button" onClick={handleReturnToGallery}>חזרה לגלריה</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="product-image" onClick={handleImageClick}>
                            <img src={product.imageURL} alt={product.name} />
                        </div>
                        <div className="product-details">
                            <h1>{product.name} / {product.artist}</h1>
                            <p>Size: {product.size} cm</p>
                            <p>Technic: {product.technic}</p>
                            <p>
                                {price === 0 
                                    ? <span className="not-for-sale">Not for Sale</span> 
                                    : `Price: ${product.price}₪`
                                }
                            </p>
                            <div className="contact-info">
                                <p>For purchase and more details, please contact:</p>
                                <p>Michal Bukris - <a href="https://wa.me/0538311215" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
                                <p>Riki Khayat - <a href="https://wa.me/0526652571" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
                                <p>Email - <a href="mailto:artchayat@gmail.com">artchayat@gmail.com</a></p>
                            </div>
                            <button className="button" onClick={handleReturnToGallery}>Return to Gallery</button>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={product.imageURL} alt={product.name} className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPage;
