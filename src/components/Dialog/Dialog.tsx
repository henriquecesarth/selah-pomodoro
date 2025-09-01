import type { ToastContentProps } from 'react-toastify';
import styles from './Dialog.module.css';
import Button from '../Button/Button';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

const Dialog = ({ closeToast, data }: ToastContentProps<string>) => {

  const buttonsLabel =
    document.documentElement.lang === 'pt-BR'
      ? {
          confirm: 'Confirmar ação e fechar',
          cancel: 'Cancelar ação e fechar',
        }
      : {
          confirm: 'Confirm action and close',
          cancel: 'Cancel action and close',
        };

  return (
    <>
      <div className={styles.container}>
        <p>{data}</p>

        <div className={styles.buttonsContainer}>
          <Button
            onClick={() => {
              closeToast(true);
            }}
            color='green'
            icon={<ThumbsUpIcon />}
            aria-label={buttonsLabel.confirm}
            title={buttonsLabel.confirm}
          />
          <Button
            onClick={() => {
              closeToast(false);
            }}
            color='red'
            icon={<ThumbsDownIcon />}
            aria-label={buttonsLabel.cancel}
            title={buttonsLabel.cancel}
          />
        </div>
      </div>
    </>
  );
};

export default Dialog;
