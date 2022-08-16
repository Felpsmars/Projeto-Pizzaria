import React from 'react';
import styles from './styles.module.scss';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export { Input };
