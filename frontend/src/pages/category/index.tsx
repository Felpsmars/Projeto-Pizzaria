import React, { FormEvent } from 'react';
import Head from 'next/head';
import { Header } from '../../components/molecules';
import styles from './styles.module.scss';
import { useState } from 'react';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category() {
  const [name, setName] = useState<string>('');

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      return;
    }

    await api.post('category', { name: name });
    toast.success('Categoria cadastrada com sucesso!');
    setName('');
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              className={styles.input}
              type='text'
              placeholder='Digite o nome da categoria'
              onChange={(event) => setName(event.target.value)}
            />

            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
