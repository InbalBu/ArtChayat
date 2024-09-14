import React, { useState, useEffect } from 'react';
import styles from '../css/About.module.css';

function Presentation() {
  const slides = []; // Array of GIFs
  for (let i = 1; i <= 51; i++) {
    slides.push(require(`../images/presentation/שקופית${i}.GIF`)); // Dynamically import GIFs
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
        <button className={styles['prev-button']} onClick={goToPreviousSlide}>
          &#9664; {/* Left arrow */}
        </button>
        <button className={styles['play-pause-button']} onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'} {/* Pause or Play */}
        </button>
        <button className={styles['next-button']} onClick={goToNextSlide}>
          &#9654; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}

export default Presentation;
