import type { ToastContentProps } from 'react-toastify';
import styles from './Dialog.module.css';
import Button from '../Button/Button';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

const Dialog = ({ closeToast, data }: ToastContentProps<string>) => {
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
            aria-label='Confirmar ação e fechar'
            title='Confirmar ação e fechar'
          />
          <Button
            onClick={() => {
              closeToast(false);
            }}
            color='red'
            icon={<ThumbsDownIcon />}
            aria-label='Cancelar ação e fechar'
            title='Cancelar ação e fechar'
          />
        </div>
      </div>
    </>
  );
};

export default Dialog;
