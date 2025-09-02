
import styles from './award.module.css';

const Award = () => {
  return (
    <section className={styles.awardSection}>
      <h2 className={styles.awardTitle}>LOS PREMIOS</h2>
      <p className={styles.awardSubtitle}>
        Canta con todo y gana premios épicos. Entre más juegues, más chances tienes.
      </p>
      <div className={styles.awardImageWrapper}>
        <img
          src="/public/assets/slider-item.jpg"
          alt="Item de premio"
          className={styles.awardImage}
        />
      </div>
      <p className={styles.awardDescription}>
        Compra tu Águila Light y encuentra el código bajo la tapa.
      </p>
      <div className={styles.awardNav}>
        <button className={`${styles.awardNavBtn} ${styles.awardNavBtnPrev}`} aria-label="Anterior">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className={`${styles.awardNavBtn} ${styles.awardNavBtnNext}`} aria-label="Siguiente">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Award;
