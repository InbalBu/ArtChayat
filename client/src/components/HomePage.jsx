import React, { useEffect, useState, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styles from '../css/HomePage.module.css';
import RoomPreview from './RoomPreview/RoomPreview';
import video from "../images/artChayatVideo.mp4";
import jacobPortrait from '../images/jacob_chayat_portrait.jpg';
import shoshiPortrait from '../images/shoshi_chayat_portrait.jpg';
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
    // Same 768px breakpoint the rest of the site already uses (Navbar,
    // JacobGallery, etc.) - a wider "tablet" cutoff (1024px) turned out to
    // catch plenty of real desktop browser windows (a laptop not maximized,
    // a smaller external monitor), which is why the masonry grid was
    // disappearing on desktop. Also drives the "Selected Artworks"
    // grid-vs-carousel choice below.
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const images = [
        painting1, painting2, painting3, painting4, painting5, painting6, painting7, painting8, painting10, painting11, painting12, painting13, painting14, painting15, painting16, painting17, painting18, painting19
    ];

    // Computed directly from language/isMobile on every render rather than
    // held in its own state+effect: those used to update on two separate
    // render passes (isMobile flips immediately on resize, text only
    // caught up a render later), so resizing across the 768px breakpoint
    // could hit a render where isMobile was already true but text was
    // still the desktop string - `text.map` on a string crashed the whole
    // page. A plain computed value can't ever be out of sync like that.
    const desktopText = language === 'he'
        ? 'מציירים, סיפור אהבה | זוג האמנים שושי ויעקב חייט ז"ל'
        : 'Painting, A Love Story | The Artists Shoshi and Jacob Chayat';
    const mobileText = language === 'he'
        ? ['מציירים, סיפור אהבה', 'זוג האמנים', 'שושי ויעקב חייט ז"ל']
        : ['Painting, A Love Story', 'The Artists', 'Shoshi and Jacob Chayat'];
    const text = isMobile ? mobileText : desktopText;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cropping/centering is handled by CSS (object-fit: cover) now, so the
    // video just needs to actually start playing on its own on mobile.
    // Setting `muted` as a JS property (not just the HTML attribute) and
    // calling play() explicitly is what makes autoplay reliably pass
    // mobile Safari/Chrome's autoplay policy - relying on the attributes
    // alone is what let the browser fall back to showing its own "tap to
    // play" button before playback ever started.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was blocked (e.g. OS-level data saver / low power
                // mode) - the poster image stays visible instead of erroring.
            });
        }
    }, []);

    const [selectedImage, setSelectedImage] = useState(null);
    const carouselRef = useRef(null);
    const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });

    // Native touch swipe already works for free on overflow-x:auto - this
    // is only to add the same "click and drag" scrolling for a mouse (a
    // trackpad/touchscreen doesn't need it, but overflow containers don't
    // support mouse click-drag scrolling by default the way touch does).
    const handlePointerDown = (e) => {
        const el = carouselRef.current;
        if (!el || e.pointerType === 'touch') return; // let touch use native scrolling
        dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
        // Best-effort: keeps the drag tracking pointermove even if the
        // cursor leaves the carousel bounds mid-drag. Not essential to the
        // core behavior, and it CAN throw (confirmed live: browser
        // automation's synthetic clicks produce a pointerId the browser's
        // pointer-capture machinery doesn't recognize as active) - an
        // uncaught throw here derailed the browser's normal click-event
        // dispatch entirely, silently breaking the image-zoom click. Never
        // let this one optional call take anything else down with it.
        try {
            el.setPointerCapture(e.pointerId);
        } catch {
            // Ignored - without capture, dragging just stops gracefully if
            // the cursor leaves the carousel mid-drag instead of continuing
            // to track it there; not breaking the whole interaction over it.
        }
    };

    const handlePointerMove = (e) => {
        const el = carouselRef.current;
        const state = dragState.current;
        if (!el || !state.dragging) return;
        const delta = e.clientX - state.startX;
        if (Math.abs(delta) > 3) state.moved = true; // distinguishes a drag from a plain click
        // Same RTL scrollLeft sign flip as everywhere else this session:
        // in this Hebrew/RTL container, positive scrollLeft values are
        // clamped to 0 (verified directly - assigning +150 silently had no
        // effect), and it's negative values that actually move the
        // content. Without this the drag was a no-op in Hebrew.
        const rtlSign = language === 'he' ? -1 : 1;
        el.scrollLeft = state.startScrollLeft - delta * rtlSign;
    };

    const endDrag = () => {
        dragState.current.dragging = false;
        // `moved` has to still read true for the click event the browser
        // fires right after this pointerup (handleImageClick below checks
        // it), so it can't be cleared synchronously here - but it must be
        // cleared eventually even if that click never happens (e.g. the
        // drag ended over the gap between images, not on one), or it gets
        // stuck true and silently swallows every click after it. A macrotask
        // delay clears it once whatever click was going to happen already has.
        setTimeout(() => { dragState.current.moved = false; }, 0);
    };

    // A click that was actually a drag shouldn't also open the image modal.
    // Previously `moved` was only ever reset at the start of the *next*
    // mouse pointerdown - fine for another mouse drag, but a touch tap
    // never fires pointerdown here at all (it's ignored, letting native
    // touch scrolling handle swipes), so `moved` stayed stuck true after
    // the first real drag and silently swallowed every click after it.
    const handleImageClick = (index) => {
        if (dragState.current.moved) return;
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

    const pageUrl = language === 'he'
        ? "https://artchayat.netlify.app/he/"
        : "https://artchayat.netlify.app/en/";

    return (
        <HelmetProvider>
            <div className='container'>
                <Helmet>
                    <title>{language === 'he' ? 'ארט חייט אומנות ישראלית | ArtChayat' : 'ArtChayat - Art of Jacob and Shoshi Chayat'}</title>

                    <meta name="description" content={language === 'he'
                        ? 'ארט חייט נולד מתוך יצירה ואהבה לאומנות, משולב בסיפור אהבתם יוצא הדופן והמרגש של הורינו, זוג האומנים שושי ויעקב חייט ז"ל.'
                        : 'ArtChayat showcases the works of artists Jacob Chayat and Shoshi Chayat, telling a story of love, creation, and art. Our gallery presents original art by Jacob and Shoshi Chayat.'} />

                    <meta name="keywords" content={language === 'he'
                        ? 'ארט חייט, יעקב חייט, שושי חייט, גלריה יעקב חייט, אומנות יעקב חייט, אומנות, יצירה, אהבה'
                        : 'ArtChayat, Jacob Chayat, Shoshi Chayat, Jacob Chayat Gallery, Jacob Chayat Art, art, creation, love'} />

                    <meta name="robots" content="index, follow" />

                    {/* Open Graph tags */}
                    <meta property="og:title" content={language === 'he'
                        ? 'ארט חייט אומנות ישראלית | ArtChayat'
                        : 'ArtChayat - Art of Jacob and Shoshi Chayat'} />

                    <meta property="og:description" content={language === 'he'
                        ? 'ארט חייט נולד מתוך יצירה ואהבה לאומנות, משולב בסיפור אהבתם יוצא הדופן והמרגש של הורינו, זוג האומנים שושי ויעקב חייט ז"ל.'
                        : 'ArtChayat presents the original works of Jacob and Shoshi Chayat, intertwined with their extraordinary love story.'} />

                    <meta property="og:image" content={language === 'he' ? 'https://artchayat.netlify.app/logoHe.png' : 'https://artchayat.netlify.app/logoEN.png'} />
                    <meta property="og:url" content={pageUrl} />
                    <meta property="og:type" content="website" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />

                    {/* Canonical URL */}
                    <link rel="canonical" href={pageUrl} />

                    {/* Hreflang alternate links */}
                    <link rel="alternate" href="https://artchayat.netlify.app/he/" hreflang="he" />
                    <link rel="alternate" href="https://artchayat.netlify.app/en/" hreflang="en" />
                </Helmet>

                <div className={styles.homepage} dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <video
                        id='video_bg'
                        ref={videoRef}
                        className={styles['homepage-video-bg']}
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        disableRemotePlayback
                        poster={painting1}
                        onCanPlayThrough={() => setVideoLoaded(true)}
                        preload="auto"
                        style={{ opacity: videoLoaded ? 1 : 0 }}
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={styles['homepage-video-overlay']} />
                    <div className={styles['homepage-video-text']}>
                        <h1
                            className={isMobile ? styles['typing-effect'] : ''}
                        >
                            {isMobile ? (
                                text.map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index < text.length - 1 && <br />}
                                    </span>
                                ))
                            ) : (
                                <span>{text}</span>
                            )}
                        </h1>
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

                <div className={styles['homepage-artists']}>
                    <h2 className='gridTitle'>{language === 'he' ? 'זוג האמנים' : 'The Artist Couple'}</h2>
                    <div className={styles['homepage-artists-grid']}>
                        <div className={styles['homepage-artist-card']}>
                            <img src={jacobPortrait} alt={language === 'he' ? 'יעקב חייט' : 'Jacob Chayat'} loading="lazy" />
                            <h3>{language === 'he' ? 'יעקב חייט' : 'Jacob Chayat'}</h3>
                            <button
                                className={styles['homepage-artist-button']}
                                onClick={() => navigate(`/${language}/jacob/gallery`)}
                            >
                                {language === 'he' ? 'לגלריה של יעקב' : "View Jacob's Gallery"}
                            </button>
                        </div>
                        <div className={styles['homepage-artist-card']}>
                            <img src={shoshiPortrait} alt={language === 'he' ? 'שושי חייט' : 'Shoshi Chayat'} loading="lazy" className={styles['homepage-artist-portrait-shoshi']} />
                            <h3>{language === 'he' ? 'שושי חייט' : 'Shoshi Chayat'}</h3>
                            <button
                                className={styles['homepage-artist-button']}
                                onClick={() => navigate(`/${language}/shoshi/gallery`)}
                            >
                                {language === 'he' ? 'לגלריה של שושי' : "View Shoshi's Gallery"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles['homepage-room-teaser']}>
                    <h2 className='gridTitle'>{language === 'he' ? 'היצירות שלהם, בבית שלכם' : 'Their Creations, In Your Home'}</h2>
                    <p className={styles['homepage-room-teaser-text']}>
                        {language === 'he'
                            ? 'לפני שמחליטים, אפשר לראות איך היצירה תיראה על הקיר בבית שלכם - במטבח, בסלון או בחדר השינה.'
                            : 'Before you decide, see how a piece would look on your own wall - in the kitchen, living room, or bedroom.'}
                    </p>
                    {/* "Noah's Ark" (homepagefirst.jpg) is a real 160x140cm
                        piece - hardcoded here since this teaser draws from a
                        local demo image, not a product API response, so
                        there's no product.size to read the way the product
                        pages do. Keeps this preview's scale in sync with how
                        the same painting renders on its own product page. */}
                    <RoomPreview image={painting1} alt={language === 'he' ? 'תצוגה מקדימה' : 'Preview'} language={language} size="160x140" />
                    <button
                        className={styles['homepage-room-teaser-button']}
                        onClick={() => navigate(`/${language}/room-showcase`)}
                    >
                        {language === 'he' ? 'לכל הגלריה בחלל הבית' : 'Browse The Full Room Gallery'}
                    </button>
                </div>

                <div className={styles['homepage-gallery']}>
                    <h2 className='gridTitle'>{language === 'he' ? 'עבודות אומנות נבחרות' : 'Selected Artworks'}</h2>
                    {isMobile ? (
                        <div
                            className={styles['homepage-carousel']}
                            ref={carouselRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={endDrag}
                            onPointerLeave={endDrag}
                        >
                            {images.map((image, index) => (
                                <div className={styles['homepage-carousel-item']} key={index}>
                                    <img
                                        src={image}
                                        alt={`Painting ${index + 1}`}
                                        onClick={() => handleImageClick(index)}
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles['homepage-grid']}>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Painting ${index + 1}`}
                                    onClick={() => handleImageClick(index)}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    )}
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
        </HelmetProvider>
    );
}

export default HomePage;
