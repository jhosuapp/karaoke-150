import styles from './tableRanking.module.css';
import { Rankings } from '../../interfaces/ranking';

const dataDefault:Rankings[] = [
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


type TableRankingProps = {
  rankingData?: Rankings[];
};

const TableRanking = ({ rankingData }: TableRankingProps) => {
  const data = rankingData && rankingData.length > 0 ? rankingData : dataDefault;
  return (
    <div className={styles.tableRankingContainer}>
      <div className={ styles.tableRankingHead }> 
        <div>POSICIÓN</div>
        <div>NOMBRE</div>
        <div>PUNTAJE</div>
      </div>
      <div className={`${styles.tableRankingWrapper} ${styles.neonBox}`}>     
        <div className={styles.tableRanking}>
          {data.map((item, idx) => (
            <div
              className={`${styles.tableRankingRow} ${idx < 4 ? styles.destacar : ''}`}
              key={item.name}
            >
              <div className={styles.tableRankingCellPos}> 
                <img  src="./public/assets/icon-micro-sm.png" 
                      alt='micro' 
                      className={styles.micro} 
                />
                {item.pos}
              </div>
              <div className={styles.tableRankingCell}>{item.name}</div>
              <div className={styles.tableRankingCellScore}>{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableRanking;