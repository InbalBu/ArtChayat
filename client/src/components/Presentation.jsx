import React, { useState, useEffect } from 'react';
import styles from '../css/About.module.css';

// Vite doesn't support webpack's dynamic require(); import.meta.glob loads
// every slide eagerly, keyed by file path, so we look each one up by index.
// (Originally .GIF files - they were single-frame photos, not animations,
// so they were converted to .jpg: same images, a fraction of the size.)
const slideModules = import.meta.glob('../images/presentation/*.jpg', {
  eager: true,
  import: 'default',
});

function Presentation() {
  const slides = []; // Array of slide images
  for (let i = 1; i <= 51; i++) {
    const path = Object.keys(slideModules).find((p) => p.endsWith(`שקופית${i}.jpg`));
    slides.push(slideModules[path]);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return; // If not playing, do nothing

    const interval = setInterval(() => {
      setFadeClass('fade-out'); // Start fade-out transition

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        setFadeClass('fade-in'); // Start fade-in transition
      }, 500); // Match the duration of the transition (0.5s)

    }, 3500); // 3.5 seconds total, with 0.5 seconds for fade-out and 3 seconds for display

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [isPlaying, slides.length]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    if (!isPlaying) setIsPlaying(false); // Keep slideshow paused
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    if (!isPlaying) setIsPlaying(false); // Keep slideshow paused
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={styles['presentation-container']}>
      <div className={styles['slide']}>
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles[fadeClass]} // Apply fade class
        />
      </div>
      <div className={styles['buttons-container']}>
        <button
          className={styles['prev-button']}
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className={styles['play-pause-button']}
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className={styles['next-button']}
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Presentation;
