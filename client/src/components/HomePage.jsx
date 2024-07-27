import React, { useEffect, useState } from 'react';
import '../css/HomePage.css'; // Assuming you have a separate CSS file for styling
import video from "../images/video.mp4";

import painting1 from '../images/DSC05325.jpg'; // Replace with your actual image paths
import painting2 from '../images/DSC05355.jpg';
import painting3 from '../images/DSC05356.jpg';
import painting4 from '../images/DSC05371.jpg';
import painting5 from '../images/DSC05481.jpg';
import painting6 from '../images/DSC05529.jpg';

function HomePage({ language }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                let scrollPosition = window.pageYOffset;
                element.style.transform = `translateY(-${scrollPosition * 0.5}px)`; // Adjust the multiplier for desired effect
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const images = [
        painting1,
        painting2,
        painting3,
        painting4,
        painting5,
        painting6,
        painting1, // Repeat for demonstration
        painting2,
        painting3,
        painting4,
        painting5,
        painting6
    ];

    return (
        <div className='container'>
            <div className="homepage" dir={language === 'he' ? 'rtl' : 'ltr'}>
                <video id='video_bg' className='video-bg' autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-text">
                    <h1>{language === 'he' ? 'מציירים, סיפור אהבה | זוג האמנים שושי ויעקב חייט ז"ל' : 'Painting, A Love Story | The Artists Shoshi and Jacob Hayat'}</h1>
                    <p>{language === 'he' ? 'ברוכים הבאים לאתר האמנות הייחודי שלנו.' : 'Welcome to our unique art website.'}</p>
                    <p>{language === 'he' ? 'אנו מזמינות אתכם לעיין בגלריה המקוונת שלנו, בה תוכלו למצוא את יצירותיהם המרהיבות ולהתרשם מן ההשקפה האמנותית הייחודית של זוג האמנים.' : 'We invite you to browse our online gallery, where you can find their stunning works and be impressed by the unique artistic perspective of the artist couple.'}</p>
                    <p>{language === 'he' ? 'כל יצירה מספרת סיפור משלה, ומשלבת טקסטורות, רגשות וצבעים.' : 'Each work tells its own story, blending textures, emotions, and colors.'}</p>
                    <p>{language === 'he' ? 'היכנסו, התרגשו והתאהבו ביצירותיהם של זוג האמנים הישראלי.' : 'Enter, get excited, and fall in love with the works of the Israeli artist couple.'}</p>
                </div>
            </div>

            <div className="gallery">
                <h2 className='gridTitle'>{language === 'he' ? 'עבודות אמנות נבחרות' : 'Selected Artworks'}</h2>
                <div className="grid">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Painting ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </div>
            </div>

            {selectedImage !== null && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <img src={images[selectedImage]} alt={`Painting ${selectedImage + 1}`} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
