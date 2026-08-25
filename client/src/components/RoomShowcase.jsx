import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import RoomPreview from './RoomPreview/RoomPreview';
import styles from '../css/RoomShowcase.module.css';

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

// A curated, alternating pick from both galleries - the same "Selected
// Artworks" set the homepage draws from - so this page can show a variety
// without depending on the backend product API.
const images = [
    painting1, painting2, painting3, painting4, painting5, painting6,
    painting7, painting8, painting10, painting11, painting12, painting13,
];

function RoomShowcase({ language }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const pageUrl = language === 'he'
        ? 'https://artchayat.netlify.app/he/room-showcase'
        : 'https://artchayat.netlify.app/en/room-showcase';

    return (
        <HelmetProvider>
            <div className={styles['roomShowcase']}>
                <Helmet>
                    <title>{language === 'he' ? 'דמיינו בבית | ארט חייט' : 'See It In A Room | ArtChayat'}</title>
                    <meta name="description" content={language === 'he'
                        ? 'דמיינו כיצד יצירה מהאוסף של ארט חייט תיראה על הקיר בבית שלכם - במטבח, בסלון או בחדר השינה.'
                        : 'See how a piece from the ArtChayat collection would look hanging on your own wall - in the kitchen, living room, or bedroom.'} />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href={pageUrl} />
                    <link rel="alternate" href="https://artchayat.netlify.app/he/room-showcase" hreflang="he" />
                    <link rel="alternate" href="https://artchayat.netlify.app/en/room-showcase" hreflang="en" />
                </Helmet>

                <h1 className={styles['roomShowcase-title']}>
                    {language === 'he' ? 'דמיינו בבית' : 'See It In A Room'}
                </h1>
                <p className={styles['roomShowcase-subtitle']}>
                    {language === 'he'
                        ? 'בחרו יצירה ועברו בין חללי הבית כדי לראות איך היא תיראה על הקיר שלכם.'
                        : 'Pick a piece and swipe between rooms to see how it would look on your own wall.'}
                </p>

                <RoomPreview
                    image={images[selectedIndex]}
                    alt={`Painting ${selectedIndex + 1}`}
                    language={language}
                />

                <div className={styles['roomShowcase-thumbs']}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${styles['roomShowcase-thumb']} ${index === selectedIndex ? styles['roomShowcase-thumb-active'] : ''}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <img src={image} alt={`Painting ${index + 1}`} loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>
        </HelmetProvider>
    );
}

export default RoomShowcase;
