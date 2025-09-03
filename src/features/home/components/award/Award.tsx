
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
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <path d="M20.975 10H3.375L11.675 1.7C12.075 1.3 12.075 0.7 11.675 0.3C11.275 -0.1 10.675 -0.1 10.275 0.3L0.275 10.3C0.175 10.4 0.075 10.5 0.075 10.6C-0.025 10.8 -0.025 11.1 0.075 11.4C0.175 11.5 0.175 11.6 0.275 11.7L10.275 21.7C10.475 21.9 10.775 22 10.975 22C11.175 22 11.475 21.9 11.675 21.7C12.075 21.3 12.075 20.7 11.675 20.3L3.375 12H20.975C21.575 12 21.975 11.6 21.975 11C21.975 10.4 21.575 10 20.975 10Z" fill="#0058EC"/>
          </svg>
        </button>
        <button className={`${styles.awardNavBtn} ${styles.awardNavBtnNext}`} aria-label="Siguiente">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <path xmlns="http://www.w3.org/2000/svg" d="M21.9 11.4C22 11.2 22 10.9 21.9 10.6C21.8 10.5 21.8 10.4 21.7 10.3L11.7 0.3C11.3 -0.1 10.7 -0.1 10.3 0.3C9.9 0.7 9.9 1.3 10.3 1.7L18.6 10H1C0.4 10 0 10.4 0 11C0 11.6 0.4 12 1 12H18.6L10.3 20.3C9.9 20.7 9.9 21.3 10.3 21.7C10.5 21.9 10.8 22 11 22C11.2 22 11.5 21.9 11.7 21.7L21.7 11.7C21.8 11.6 21.9 11.5 21.9 11.4Z" fill="#0058EC"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Award;
