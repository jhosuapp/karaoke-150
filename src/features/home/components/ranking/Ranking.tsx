import styles from './ranking.module.css';
import TableRanking from '../../../../shared/components/tableRanking/TableRanking';

const Ranking = () => {
  return (
    <section className={styles.rankingSection}>
      <h2 className={styles.rankingTitle}>RANKING</h2>
      <div className={styles.rankingSubtitle}>
        <p>Ellos ya la están rompiendo</p>
        <p>¿Qué esperas para sumarte a este top?</p>
      </div>
      <TableRanking />
    </section>
  );
};

export default Ranking;
