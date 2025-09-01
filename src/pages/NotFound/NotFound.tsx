import Container from '../../components/Container/Container';
import GenericHtml from '../../components/GenericHtml/GenericHtml';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { useEffect } from 'react';
import NotFound_pt_BR from './NotFound.pt-BR';
import NotFound_en_US from './NotFound.en-US';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';

function NotFound() {
  const { state } = useTaskContext();
  useEffect(() => {
    document.title = '404 - Selah';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          {state.language === 'pt-BR' ? <NotFound_pt_BR /> : <NotFound_en_US />}
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}

export default NotFound;
