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
import Dropdown from '../../components/Dropdown/Dropdown';

const Settings = () => {
  const { state, dispatch } = useTaskContext();
  const workTimeRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeRef = useRef<HTMLInputElement>(null);
  const longBreakTimeRef = useRef<HTMLInputElement>(null);
  const modeRef = useRef<HTMLSelectElement>(null);

  const errorMessages =
    state.config.language === 'pt-BR'
      ? {
          nanError: 'Por favor, preencha TODOS os campos somente com números.',
          workTimeError: 'O tempo de foco deve ser entre 1 e 99 minutos.',
          shortBreakTimeError:
            'O tempo de descanso curto deve ser entre 1 e 30 minutos.',
          longBreakTimeError:
            'O tempo de descanso longo deve ser entre 1 e 60 minutos.',
        }
      : {
          nanError: 'Please fill ALL fields only with numbers.',
          workTimeError: 'The focus time should be between 1 and 99 minutes.',
          shortBreakTimeError:
            'The short break time should be between 1 and 30 minutes.',
          longBreakTimeError:
            'The long break time should be between 1 and 60 minutes.',
        };

  const messageSuccess =
    state.config.language === 'pt-BR'
      ? 'Configurações salvas com sucesso!'
      : 'Settings saved successfully!';

  const documentTitle =
    state.config.language === 'pt-BR' ? 'Configurações' : 'Settings';

  const inputLabels =
    state.config.language === 'pt-BR'
      ? {
          workTime: 'Tempo de Foco (em minutos)',
          shortBreakTime: 'Tempo de Descanso Curto (em minutos)',
          longBreakTime: 'Tempo de Descanso Longo (em minutos)',
          mode: 'Modo de funcionamento',
        }
      : {
          workTime: 'Focus Time (in minutes)',
          shortBreakTime: 'Short Break Time (in minutes)',
          longBreakTime: 'Long Break Time (in minutes)',
          mode: 'Mode',
        };

  const buttonLabel =
    state.config.language === 'pt-BR'
      ? 'Salvar Configurações'
      : 'Save Settings';

  const handleSaveConfiguration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const payload = {
      type: {
        workTime: Number(workTimeRef.current?.value),
        shortBreakTime: Number(shortBreakTimeRef.current?.value),
        longBreakTime: Number(longBreakTimeRef.current?.value),
      },
      mode: String(modeRef.current?.value),
    };

    if (
      isNaN(payload.type.workTime) ||
      isNaN(payload.type.shortBreakTime) ||
      isNaN(payload.type.longBreakTime)
    )
      formErrors.push(errorMessages.nanError);

    if (payload.type.workTime <= 0 || payload.type.workTime > 99)
      formErrors.push(errorMessages.workTimeError);

    if (payload.type.shortBreakTime <= 0 || payload.type.shortBreakTime > 30)
      formErrors.push(errorMessages.shortBreakTimeError);

    if (payload.type.longBreakTime <= 0 || payload.type.longBreakTime > 60)
      formErrors.push(errorMessages.longBreakTimeError);

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
  }, [documentTitle]);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          {state.config.language === 'pt-BR' ? 'Configurações' : 'Settings'}
        </Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          {state.config.language === 'pt-BR'
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
              defaultValue={state.config.type.workTime}
              id='workTime'
              labelText={inputLabels.workTime}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={shortBreakTimeRef}
              defaultValue={state.config.type.shortBreakTime}
              id='shortBreakTime'
              labelText={inputLabels.shortBreakTime}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              type='number'
              ref={longBreakTimeRef}
              defaultValue={state.config.type.longBreakTime}
              id='longBreakTime'
              labelText={inputLabels.longBreakTime}
            />
          </div>
          <div className={styles.formRow}>
            <Dropdown
              id='mode'
              ref={modeRef}
              values={['Normal', 'Aly Mode']}
              labelText={inputLabels.mode}
              defaultValue={state.config.mode}
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
