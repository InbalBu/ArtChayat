import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styles from '../css/HomePage.module.css';
import video from "../images/artNewcut.mp4";
import painting1 from '../images/homepagefirst.jpg';
import painting2 from '../images/homepagesecond.jpg';
import painting3 from '../images/homepage5.jpg';
import painting4 from '../images/homepage6.jpg';
import painting5 from '../images/homepage7.jpg';
import painting6 from '../images/DSC05355.jpg';
import painting7 from '../images/DSC05371.jpg';
import painting8 from '../images/homepage8.jpg';
import painting10 from '../images/homepage10.jpg';
import painting11 from '../images/homepage11.jpg';
import painting12 from '../images/homepage12.jpg';
import painting13 from '../images/homepage13.jpg';
import painting14 from '../images/DSC05356.jpg';
import painting15 from '../images/homepage1.jpg';
import painting16 from '../images/DSC05529.jpg';
import painting17 from '../images/homepage3.jpg';
import painting18 from '../images/homepage2.jpg';
import painting19 from '../images/DSC05481.jpg';

function HomePage({ language }) {
    const [text, setText] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const images = [
        painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8, painting10, painting11, painting12, painting13, painting14, painting15, painting16, painting17, painting18, painting19
    ];

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    const randomImage = getRandomImage();

    useEffect(() => {
        const fullText = language === 'he'
            ? 'מציירים, סיפור אהבה | זוג האמנים שושי ויעקב חייט ז"ל'
            : 'Painting, A Love Story | The Artists Shoshi and Jacob Chayat';

        setText(fullText);
    }, [language]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                element.style.transform = `translateY(-${scrollPosition * 0.5}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='container'>
            <Helmet>
                <title>{language === 'he' ? 'ארט חייט - אמנות יעקב ושושי חייט' : 'ArtChayat - Art of Jacob and Shoshi Chayat'}</title>

                <meta name="description" content={language === 'he'
                    ? 'ארט חייט מציג את יצירותיהם של האמנים יעקב חייט ושושי חייט, המספרים סיפור של אהבה, יצירה ואמנות. הגלריה שלנו מציגה אומנות מקורית של יעקב ושושי חייט ז"ל.'
                    : 'ArtChayat showcases the works of artists Jacob Chayat and Shoshi Chayat, telling a story of love, creation, and art. Our gallery presents original art by Jacob and Shoshi Chayat.'} />

                <meta name="keywords" content={language === 'he'
                    ? 'ארט חייט, יעקב חייט, שושי חייט, גלריה יעקב חייט, אומנות יעקב חייט, אומנות, יצירה, אהבה'
                    : 'ArtChayat, Jacob Chayat, Shoshi Chayat, Jacob Chayat Gallery, Jacob Chayat Art, art, creation, love'} />

                <meta name="robots" content="index, follow" />

                {/* Open Graph tags */}
                <meta property="og:title" content={language === 'he'
                    ? 'ארט חייט - אמנות יעקב ושושי חייט'
                    : 'ArtChayat - Art of Jacob and Shoshi Chayat'} />

                <meta property="og:description" content={language === 'he'
                    ? 'ארט חייט מציג יצירות מקוריות של יעקב ושושי חייט, ושוזר את סיפור אהבתם היוצא דופן.'
                    : 'ArtChayat presents the original works of Jacob and Shoshi Chayat, intertwined with their extraordinary love story.'} />

                <meta property="og:image" content={randomImage} />
                <meta property="og:url" content="https://artchayat.netlify.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />       
            </Helmet>

            <div className={styles.homepage} dir={language === 'he' ? 'rtl' : 'ltr'}>
                {!isMobile && (
                    <video
                        id='video_bg'
                        className={styles['homepage-video-bg']}
                        autoPlay
                        loop
                        muted
                        onCanPlayThrough={() => setVideoLoaded(true)}
                        preload="auto"
                        style={{ opacity: videoLoaded ? 1 : 0 }}
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                <div className={styles['homepage-video-text']}>
                    <h1 className={isMobile ? styles['typing-effect'] : ''}>{text}</h1>
                    {language === 'he' ? (
                        <>
                            <p>ארט חייט נולד מתוך יצירה ואהבה לאומנות, משולב בסיפור אהבתם יוצא הדופן והמרגש של הורינו, זוג האומנים שושי ויעקב חייט ז"ל.</p>
                            <p>נעים להכיר: אנחנו, מיכל בוקריס וריקי חייט, בנותיהם, בעלים של חב' ארט חייט ומנהלות את אוסף היצירות שהותירו אחריהם.</p>
                            <p>רבות מיצירותיהם מוצגות בגלריות ובקרב אספני אומנות בישראל ובחו"ל.</p>
                            <p>האוסף שמוצע למכירה באתר, כולל יצירות אומנות רבות ומגוונות מתקופות שונות ומציג את המסע האישי שכל אמן עבר בנפרד ומשקף 50 שנות יצירה, אהבה וזוגיות.</p>
                            <p>אנו מזמינות אתכם, להיכנס לגלריה המקוונת ולבחור את היצירה שתכניס לביתכם צבע ואהבה.</p>
                            <p>כל יצירה מספרת סיפור משלה ומשלבת טקסטורות, רגשות וצבעים.</p>
                            <p>היכנסו, התרגשו והתאהבו ביצירותיהם של זוג האמנים הישראלי.</p>
                        </>
                    ) : (
                        <>
                            <p>Art Chayat was born out of creation and a love for art, Combined with the extraordinary and touching love story of our parents, the artists Shoshi and Jacob Chayat.</p>
                            <p>Nice to meet you: we are Michal Bokris and Riki Chayat, their daughters, owners of Art Hayat Ltd., and managers of the collection of works they left behind.</p>
                            <p>Many of their works are displayed in galleries and among art collectors in Israel and abroad.</p>
                            <p>The collection offered for sale includes many diverse artworks from different periods and showcases the personal journey each artist went through separately, reflecting 50 years of creation, love, and partnership.</p>
                            <p>We invite you to enter the online gallery and choose the artwork that will bring color and love to your home. Each piece tells its own story and combines textures, emotions, and colors.</p>
                            <p>Enter, get excited, and fall in love with the works of the Israeli artist couple.</p>
                        </>
                    )}
                </div>
            </div>

            <div className={styles['homepage-gallery']}>
                <h2 className='gridTitle'>{language === 'he' ? 'עבודות אומנות נבחרות' : 'Selected Artworks'}</h2>
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

document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('.homepage-video-bg');
    if (!video) {
        console.error('Video element not found!');
        return; 
    }
    
    const resizeVideo = () => {
        if (video.videoWidth / video.videoHeight > window.innerWidth / window.innerHeight) {
            video.style.width = '100%';
            video.style.height = 'auto';
        } else {
            video.style.width = 'auto';
            video.style.height = '100%';
        }
    };
    
    resizeVideo();
    window.addEventListener('resize', resizeVideo);
});


export default HomePage;
