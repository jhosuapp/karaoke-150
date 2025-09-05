import styles from './ranking.module.css';
import TableRanking from '../../../../shared/components/tableRanking/TableRanking';

const Ranking = () => {
  return (
    <section className={styles.rankingSection}>
      <h2 style={{ display: 'none' }} > TOP 10</h2>
      <img
        src="/public/assets/text-top10.png"
        alt="Top 10"
        className={styles.imageText}
      />
      <TableRanking />
    </section>
  );
};

export default Ranking;
