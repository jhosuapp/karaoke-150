
import React, { useState } from 'react';
import styles from './hero.module.css';
import ModalYoutube from '../modalYoutube/ModalYoutube';
import InputCode from '../../../../shared/components/inputCode/inputCode';

const Hero = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className={styles.heroSection}>
      <h1 style={{ display: 'none' }}> LOS CRACKS DEL KARAOKE </h1>
      <img
        src="/public/assets/logo-text.png"
        alt="Cracks del Karaoke"
        className={`${styles.heroImageTitle} ${styles.floaty}`}
      />
      <div className={styles.heroImageWrapper}>
        <img
          src="/public/assets/video-default.jpg"
          alt="Karaoke escenario"
          className={styles.heroImage}
        />
        <button
          className={styles.heroPlayButton}
          aria-label="Reproducir video"
          onClick={() => setOpenModal(true)}
        >
          <img src="/public/assets/icon-play.png" alt="Play" className={styles.heroPlayIcon} />
        </button>
      </div>
      
      <InputCode />
      
      <ModalYoutube
        open={openModal}
        onClose={() => setOpenModal(false)}
        url="https://www.youtube.com/watch?v=mzi8uB93rCI"
      />
    </section>
  );
};

export default Hero;
