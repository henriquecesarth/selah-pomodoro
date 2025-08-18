import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import CountDown from '../../components/CountDown/CountDown';
import Form from '../../components/Form/Form';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

function Home() {
  useEffect(() => {
    document.title = 'Selah - Foco com propósito';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <Form />
      </Container>
    </MainTemplate>
  );
}

export default Home;
