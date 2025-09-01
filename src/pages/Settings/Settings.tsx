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

  const errorMessages =
    state.language === 'pt-BR'
      ? {
          nanError: 'Por favor, preencha TODOS os campos somente com números.',
          workTimeError: 'O tempo de foco deve ser entre 1 e 99 minutos.',
          shortTimeBreakError:
            'O tempo de descanso curto deve ser entre 1 e 30 minutos.',
          longTimeBreakError:
            'O tempo de descanso longo deve ser entre 1 e 60 minutos.',
        }
      : {
          nanError: 'Please fill ALL fields only with numbers.',
          workTimeError: 'The focus time should be between 1 and 99 minutes.',
          shortTimeBreakError:
            'The short break time should be between 1 and 30 minutes.',
          longTimeBreakError:
            'The long break time should be between 1 and 60 minutes.',
        };

  const messageSuccess =
    state.language === 'pt-BR'
      ? 'Configurações salvas com sucesso!'
      : 'Settings saved successfully!';

  const documentTitle =
    state.language === 'pt-BR' ? 'Configurações' : 'Settings';

  const inputLabels =
    state.language === 'pt-BR'
      ? {
          workTime: 'Tempo de Foco (em minutos)',
          shortTimeBreak: 'Tempo de Descanso Curto (em minutos)',
          longTimeBreak: 'Tempo de Descanso Longo (em minutos)',
        }
      : {
          workTime: 'Focus Time (in minutes)',
          shortTimeBreak: 'Short Break Time (in minutes)',
          longTimeBreak: 'Long Break Time (in minutes)',
        };

  const buttonLabel =
    state.language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings';

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
      formErrors.push(errorMessages.nanError);

    if (payload.workTime <= 0 || payload.workTime > 99)
      formErrors.push(errorMessages.workTimeError);

    if (payload.shortBreakTime <= 0 || payload.shortBreakTime > 30)
      formErrors.push(errorMessages.shortTimeBreakError);

    if (payload.longBreakTime <= 0 || payload.longBreakTime > 60)
      formErrors.push(errorMessages.longTimeBreakError);

    if (formErrors.length > 0) {
      formErrors.forEach((error) => {
        showMessage.warning(error);
      });
      return;
    }

    dispatch({ type: TaskActionsTypes.SAVE_CONFIG, payload });
    showMessage.success(messageSuccess);
  };

  useEffect(() => {
    document.title = documentTitle + ' - Selah';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          {state.language === 'pt-BR' ? 'Configurações' : 'Settings'}
          </Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          {state.language === 'pt-BR'
            ? 'Modifique as configurações para tempo de foco, descanso curto e descanso longo.'
            : 'Modify the settings for focus time, short break time and long break time.'}
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
              labelText={inputLabels.workTime}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={shortTimeBreakRef}
              defaultValue={state.config.shortBreakTime}
              id='shortTimeBreak'
              labelText={inputLabels.shortTimeBreak}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={longTimeBreakRef}
              defaultValue={state.config.longBreakTime}
              id='longTimeBreak'
              labelText={inputLabels.longTimeBreak}
            />
          </div>
          <div className={styles.formRow}>
            <Button
              icon={<SaveIcon />}
              color='green'
              title={buttonLabel}
              aria-label={buttonLabel}
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
};

export default Settings;
