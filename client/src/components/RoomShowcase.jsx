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
// without depending on the backend product API. That also means there's no
// product.size to read the way the product pages do - each `size` below was
// looked up by hand (matched to its real DB record via a perceptual-hash
// comparison against every product photo in both galleries, then confirmed
// visually) so RoomPreview can render these at real physical scale too, the
// same as it does on every product page. Four (marked below) matched
// nothing in either gallery - not a bug, they're just not in the current
// product catalog (older/archived pieces) - so those keep the generic
// fallback size until/unless a real one turns up.
const images = [
    { src: painting1, size: '160x140' }, // "Noah's Ark" (Jacob)
    { src: painting2, size: '135x210' }, // "The Wall" (Jacob)
    { src: painting3, size: '80x80' }, // "The Violinist" (Shoshi)
    { src: painting4, size: '80x80' }, // "Two Clowns In The Circus" (Shoshi)
    { src: painting5 }, // not in the current catalog - no real size to read
    { src: painting6, size: '80x100' }, // "When I Come Back" (Jacob)
    { src: painting7, size: '100x100' }, // "Graphic View" (Jacob)
    { src: painting8 }, // not in the current catalog - no real size to read
    { src: painting10, size: '100x130' }, // "Stage Workers" (Shoshi)
    { src: painting11 }, // not in the current catalog - no real size to read
    { src: painting12, size: '140x150' }, // "Jerusalem" (Jacob)
    { src: painting13 }, // not in the current catalog - no real size to read
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
                    image={images[selectedIndex].src}
                    alt={`Painting ${selectedIndex + 1}`}
                    language={language}
                    size={images[selectedIndex].size}
                />

                <div className={styles['roomShowcase-thumbs']}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${styles['roomShowcase-thumb']} ${index === selectedIndex ? styles['roomShowcase-thumb-active'] : ''}`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <img src={image.src} alt={`Painting ${index + 1}`} loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>
        </HelmetProvider>
    );
}

export default RoomShowcase;
