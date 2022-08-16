import React, { useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../../contexts/AuthContext';

import styles from './styles.module.scss';

function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/dashboard'>
          <Image
            alt='dashboard'
            src='/logo.svg'
            width={190}
            height={60}
            className={styles.img}
          ></Image>
        </Link>

        <nav className={styles.menuNav}>
          <Link href='/category'>
            <a>Categoria</a>
          </Link>
          <Link href='/product'>
            <a>Cardapio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color='#fff' size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}

export { Header };
