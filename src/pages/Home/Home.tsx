import { useEffect } from 'react';
import Container from '../../components/Container/Container';
import CountDown from '../../components/CountDown/CountDown';
import Form from '../../components/Form/Form';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

function Home() {
  const { state } = useTaskContext();
  useEffect(() => {
    document.title =
      state.config.language === 'pt-BR'
        ? 'Selah - Foco com propósito'
        : 'Selah - Focus with purpose';
  }, [state.config.language]);

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
