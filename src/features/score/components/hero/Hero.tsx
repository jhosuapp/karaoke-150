
import styles from './hero.module.css';
import InputCode from '../../../../shared/components/inputCode/inputCode';

const Hero = () => {
  

  return (
    <section className={styles.heroSection}>
     <h2 style={{ display: 'none' }} > ¡BIENVENIDO! </h2>
      <img
        src="/public/assets/text-bienvenido.png"
        alt="Bienvenido"
        className={styles.heroImageText}
      />

      <p className={styles.heroDetail} >TU MEJOR PUNTAJE ES</p>

      <div className={styles.heroPoint}>
        <img
          src="/public/assets/icon-point.png"
          alt="Puntaje"
          className={styles.pointIcon}
        />
        <p className={styles.number}>234.567</p>
      </div>

      <div className={styles.heroPositionContainer}>
        
        <h2 style={{ display: 'none' }} > TU POSICION </h2>
        <img
          src="/public/assets/text-posicion.png"
          alt="Posicion"
          className={styles.heroImageText}
        />

        <div className={styles.heroPositionHeader}>
          <p>POSICION</p>
          <p>PUNTAJE</p>
        </div>

        <div className={styles.heroPosition}>
              <p className={`${styles.positionNumber} ${styles.positionYellow}`}>134</p>
              <p className={`${styles.positionNumber} ${styles.positionCyan}`}>234.567</p>
        </div>

      </div>

      <div className={styles.heroCodeContainer}>
         <h2 style={{ display: 'none' }} > INGRESA UN NUEVO CODIGO </h2>
          <img
            src="/public/assets/text-codigo.png"
            alt="Posicion"
            className={styles.heroImageText}
          />
          <div className={styles.containerCode}>
            <InputCode />
          </div>
      </div>

    </section>
  );
};

export default Hero;
