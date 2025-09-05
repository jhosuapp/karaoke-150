import Hero from '../components/hero/Hero';
import Award from '../components/award/Award';
import Ranking from '../components/ranking/Ranking';

const HomeView = () => {
  return (
    <div>
      <Hero />
      <Award />
      <Ranking />
    </div>
  );
};

export { HomeView }
