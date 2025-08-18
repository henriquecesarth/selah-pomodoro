import { useEffect, useRef } from 'react';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';
import Container from '../../components/Container/Container';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { SaveIcon } from 'lucide-react';
import { TaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import styles from './Settings.module.css';

const Settings = () => {
  const { state, dispatch } = useTaskContext();
  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortTimeBreakRef = useRef<HTMLInputElement>(null);
  const longTimeBreakRef = useRef<HTMLInputElement>(null);

  const handleSaveConfiguration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const payload = {
      workTime: Number(workTimeRef.current?.value),
      shortBreakTime: Number(shortTimeBreakRef.current?.value),
      longBreakTime: Number(longTimeBreakRef.current?.value),
    };

    if (
      isNaN(payload.workTime) ||
      isNaN(payload.shortBreakTime) ||
      isNaN(payload.longBreakTime)
    )
      formErrors.push(
        'Por favor, preencha TODOS os campos somente com números.'
      );

    if (payload.workTime <= 0 || payload.workTime > 99)
      formErrors.push('O tempo de foco deve ser entre 1 e 99 minutos.');

    if (payload.shortBreakTime <= 0 || payload.shortBreakTime > 30)
      formErrors.push(
        'O tempo de descanso curto deve ser entre 1 e 30 minutos.'
      );

    if (payload.longBreakTime <= 0 || payload.longBreakTime > 60)
      formErrors.push(
        'O tempo de descanso longo deve ser entre 1 e 60 minutos.'
      );

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.warning(error);
      });
      return;
    }

    dispatch({ type: TaskActionsTypes.SAVE_CONFIG, payload });
    showMessage.success('Configurações salvas com sucesso!');
  };

  useEffect(() => {
    document.title = 'Configurações - Selah';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Cofigurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form onSubmit={handleSaveConfiguration} className={styles.form}>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={workTimeRef}
              defaultValue={state.config.workTime}
              id='workTime'
              labelText='Tempo de foco (minutos)'
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={shortTimeBreakRef}
              defaultValue={state.config.shortBreakTime}
              id='shortTimeBreak'
              labelText='Tempo de descanso curto (minutos)'
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={longTimeBreakRef}
              defaultValue={state.config.longBreakTime}
              id='longTimeBreak'
              labelText='Tempo de descanso longo (minutos)'
            />
          </div>
          <div className={styles.formRow}>
            <Button
              icon={<SaveIcon />}
              color='green'
              title='Salvar Configurações'
              aria-label='Salvar Configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
};

export default Settings;
