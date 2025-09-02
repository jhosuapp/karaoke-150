
import styles from './ranking.module.css';

const rankingData = [
  { pos: '01.', name: 'Pepito Pérez', score: '234.567' },
  { pos: '02.', name: 'Camila Serrano', score: '233.500' },
  { pos: '03.', name: 'Andrés Gómez', score: '216.467' },
  { pos: '04.', name: 'Angela Ruíz', score: '214.467' },
  { pos: '05.', name: 'Ingrid Mora', score: '200.400' },
  { pos: '06.', name: 'Angélica Rincón', score: '180.450' },
  { pos: '07.', name: 'Sandra Padilla', score: '160.150' },
  { pos: '08.', name: 'Tomás Beltrán', score: '155.950' },
  { pos: '09.', name: 'Adriana Soler', score: '135.900' },
  { pos: '10.', name: 'Jessica Cortés', score: '135.230' },
];

const Ranking = () => {
  return (
    <section className={styles.rankingSection}>
      <h2 className={styles.rankingTitle}>RANKING</h2>
      <div className={styles.rankingSubtitle}>
        <p>Ellos ya la están rompiendo</p>
        <p>¿Qué esperas para sumarte a este top?</p>
      </div>

      <div className={ styles.rankingTableHead }> 
        <div>POSICIÓN</div>
        <div>NOMBRE</div>
        <div>PUNTAJE</div>
      </div>

      <div className={`${styles.rankingTableWrapper} ${styles.neonBox}`}>     
        <div className={styles.rankingTable}>
          {rankingData.map((item, idx) => (
            <div className={styles.rankingTableRow} key={item.name}>
              <div className={styles.rankingTableCellPos}>{item.pos}</div>
              <div className={styles.rankingTableCell}>{item.name}</div>
              <div className={styles.rankingTableCellScore}>{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ranking;
