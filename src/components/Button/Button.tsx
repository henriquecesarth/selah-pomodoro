import styles from './Button.module.css';
import React from 'react';

type ButtonProp = { icon: React.ReactNode, color: 'green' | 'red' } & React.ComponentProps<'button'>;

const Button = ({icon, color, ...props }: ButtonProp) => {
  return (
    <>
      <button
        className={
          `${styles.button} ${styles[color]}`
        }
        {...props}
      >
        {icon}
      </button>
    </>
  );
};

export default Button;
