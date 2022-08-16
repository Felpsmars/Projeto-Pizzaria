import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import { useState, useContext, FormEvent } from 'react';
import { toast } from 'react-toastify';

import logoImg from '../../public/logo.svg';
import { Input, Button } from '../components/atoms';
import { AuthContext } from '../contexts/AuthContext';
import { canSSRGuest } from '../utils/canSSRGuest';

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Preencha todos os campos!');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image alt='sujeitoPizza logo' src={logoImg}></Image>
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type='text'
              placeholder='Digite seu email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type='submit' loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href='/signup'>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  };
});
