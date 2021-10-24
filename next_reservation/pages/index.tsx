import type { NextPage } from 'next';
import Header from 'components/Header/Header';
import { Container } from '../styles/_index/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default Home;
