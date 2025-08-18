import styles from './Input.module.css';

type InputProp = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

const Input = ({ id, labelText, type, placeholder, ...rest }: InputProp) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} id={id} type={type} placeholder={placeholder} {...rest} />
    </>
  );
};

export default Input;
