import React from 'react';
import styles from './Heading.module.css';

type HeadingProps = {
  children: React.ReactNode;
};

const Heading = ({ children }: HeadingProps) => {
  return (
    <div>
      <h1 className={styles.heading}>{children}</h1>
    </div>
  );
};

export default Heading;
