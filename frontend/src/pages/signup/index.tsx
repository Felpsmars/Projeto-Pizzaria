import { FormEvent, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import { toast } from 'react-toastify';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/atoms';
import { Button } from '../../components/atoms';

import { AuthContext } from '../../contexts/AuthContext';

import Link from 'next/link';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos!');
      return;
    }
    setLoading(true);

    let data = { name, email, password };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeito Pizzaria' />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              placeholder='Sua senha'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button type='submit' loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href='/'>
            <a className={styles.text}>Já possui uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
