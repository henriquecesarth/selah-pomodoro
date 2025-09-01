import styles from './Dropdown.module.css';

type DropdownProp = {
  id: string;
  labelText: string;
  values: string[];
} & React.ComponentProps<'select'>;

const Dropdown = ({ id, labelText, values, ...rest }: DropdownProp) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <select
        id='fruta-select'
        name='fruta'
        className={styles.dropdown}
        {...rest}
      >
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
