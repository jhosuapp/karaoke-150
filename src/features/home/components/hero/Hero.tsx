
import React, { useState } from 'react';
import styles from './hero.module.css';
import ModalYoutube from '../modalYoutube/ModalYoutube';


const Hero = () => {
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123') {
      setError(false);
      setShowMsg(false);
      alert('bien');
    } else {
      setError(true);
      setShowMsg(true);
    }
  };

  return (
    <section className={styles.heroSection}>
      <h1 style={{ display: 'none' }}> LOS CRACKS DEL KARAOKE </h1>
      <img
        src="/public/assets/logo-text-single.png"
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
      <p className={styles.heroDescription}>
        🍺🎤 Ingresa los códigos de tus Águila Light, súbete al Karaoke y conviértete en el crack del escenario.  
      </p>
      <form className={styles.heroForm} onSubmit={handleCodeSubmit}>
        <input
          type="text"
          placeholder="Escribe tu código aquí"
          value={code}
          onChange={e => { setCode(e.target.value); setError(false); setShowMsg(false); }}
          className={`${styles.heroInput} ${error ? styles.heroInputError : ''}`}
        />

        {showMsg && (
          <div className={styles.heroMsgError}>
            Código inválido
          </div>
        )}

        <button
          type="submit"
          className={styles.heroButton}
        >
          INGRESA TU CÓDIGO
        </button>
      </form>
      
      <ModalYoutube
        open={openModal}
        onClose={() => setOpenModal(false)}
        url="https://www.youtube.com/watch?v=mzi8uB93rCI"
      />
    </section>
  );
};

export default Hero;
