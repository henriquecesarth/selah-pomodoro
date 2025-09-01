import Container from '../../components/Container/Container';
import GenericHtml from '../../components/GenericHtml/GenericHtml';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import { useEffect } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import About_pt_BR from './About.pt-BR';
import About_en_US from './About.en-US';

function About() {
  const { state } = useTaskContext();
  useEffect(() => {
    document.title =
      state.config.language === 'pt-BR'
        ? 'Entenda a Técnica Pomodoro - Selah'
        : 'Understand the Pomodoro Technique - Selah';
  }, [state.config.language]);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          {state.config.language === 'pt-BR' ? (
            <About_pt_BR />
          ) : (
            <About_en_US />
          )}
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}

export default About;
