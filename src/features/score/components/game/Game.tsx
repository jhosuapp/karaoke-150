
import styles from './game.module.css';
import { formatFecha } from '../../../../shared/utilities';

const Game = () => {
  const data = [
    { pos: '2025-10-01', score: '234.567' },
    { pos: '2025-10-02', score: '233.500' },
    { pos: '2025-10-03', score: '233.200' },
  ];

  return (
    <section className={styles.gameSection}>
     <h2 style={{ display: 'none' }} > MIS JUGADAS</h2>
      <img
        src="/public/assets/text-jugada.png"
        alt="Mis Jugadas"
        className={styles.imageText}
      />

      <div className={styles.tableContainer}>
        <div className={ styles.tableHead }> 
          <div>POSICIÓN</div>
          <div>PUNTAJE</div>
        </div>
        <div className={styles.tableWrapper}>     
          <div className={styles.tableRanking}>
            {data.map((item, idx) => (
              <div
                className={styles.tableRow}
                key={idx}
              >
                <div className={styles.tableCellPos}>
                  {formatFecha(item.pos)}
                </div>
                <div className={styles.tableCellScore}>{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
  
};

export default Game;
