import React from 'react';
import styles from './styles.module.scss';
import { TextareaHTMLAttributes } from 'react';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ ...rest }: InputProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}

export { TextArea };
