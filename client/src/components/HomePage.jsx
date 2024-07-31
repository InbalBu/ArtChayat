import React, { useEffect, useState } from 'react';
import styles from '../css/HomePage.module.css'; // Import the CSS module
import video from "../images/artVideo.mp4";

import painting1 from '../images/DSC05325.jpg'; // Replace with your actual image paths
import painting2 from '../images/DSC05355.jpg';
import painting3 from '../images/DSC05356.jpg';
import painting4 from '../images/DSC05371.jpg';
import painting5 from '../images/DSC05481.jpg';
import painting6 from '../images/DSC05529.jpg';

function HomePage({ language }) {
    const [text, setText] = useState('');

    useEffect(() => {
        const fullText = language === 'he'
            ? 'מציירים, סיפור אהבה | זוג האמנים שושי ויעקב חייט ז"ל'
            : 'Painting, A Love Story | The Artists Shoshi and Jacob Hayat';
        
        setText(fullText);
    }, [language]);

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
            <div className={styles.homepage} dir={language === 'he' ? 'rtl' : 'ltr'}>
                <video id='video_bg' className={styles['homepage-video-bg']} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className={styles['homepage-video-text']}>
                    <h1>{text}</h1>
                    <p>{language === 'he' ? 'ארט חייט נולד מתוך יצירה ואהבה לאמנות. משולב בסיפור אהבתם יוצא הדופן והמרגש של הורינו, זוג האמנים שושי ויעקב חייט ז"ל.' : 'Art Hayat was born out of creation and a love for art. Combined with the extraordinary and touching love story of our parents, the artists Shoshi and Jacob Hayat.'}</p>
                    <p>{language === 'he' ? 'נעים להכיר: אנחנו, מיכל בוקריס וריקי חייט, בנותיהם, בעלים של חב\' ארט חייט ומנהלות את אוסף היצירות שהותירו אחריהם.' : 'Nice to meet you: we are Michal Bokris and Riki Hayat, their daughters, owners of Art Hayat Ltd., and managers of the collection of works they left behind.'}</p>
                    <p>{language === 'he' ? 'רבות מיצירותיהם מוצגות בגלריות ובקרב אספני אומנות בישראל ובחו"ל. האוסף שמוצע למכירה, כולל יצירות אומנות רבות ומגוונות מתקופות שונות ומציג את המסע האישי שכל אמן עבר בנפרד ומשקף 50 שנות יצירה, אהבה וזוגיות.' : 'Many of their works are displayed in galleries and among art collectors in Israel and abroad. The collection offered for sale includes many diverse artworks from different periods and showcases the personal journey each artist went through separately, reflecting 50 years of creation, love, and partnership.'}</p>
                    <p>{language === 'he' ? 'אנו מזמינות אתכם, להיכנס לגלריה המקוונת ולבחור את היצירה שתכניס לביתכם צבע ואהבה. כל יצירה מספרת סיפור משלה ומשלבת טקסטורות, רגשות וצבעים.' : 'We invite you to enter the online gallery and choose the artwork that will bring color and love to your home. Each piece tells its own story and combines textures, emotions, and colors.'}</p>
                    <p>{language === 'he' ? 'היכנסו, התרגשו והתאהבו ביצירותיהם של זוג האמנים הישראלי.' : 'Enter, get excited, and fall in love with the works of the Israeli artist couple.'}</p>
                </div>
            </div>

            <div className={styles['homepage-gallery']}>
                <h2 className='gridTitle'>{language === 'he' ? 'עבודות אמנות נבחרות' : 'Selected Artworks'}</h2>
                <div className={styles['homepage-grid']}>
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
                <div className={styles['homepage-modal']} onClick={handleCloseModal}>
                    <div className={styles['homepage-modal-content']} onClick={e => e.stopPropagation()}>
                        <span className={styles['homepage-close']} onClick={handleCloseModal}>&times;</span>
                        <img src={images[selectedImage]} alt={`Painting ${selectedImage + 1}`} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
