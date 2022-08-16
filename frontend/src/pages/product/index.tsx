import React, { ChangeEvent, FormEvent, useState } from 'react';
import Head from 'next/head';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { Header } from '../../components/molecules';
import styles from './styles.module.scss';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  function handleChangeCategory(event) {
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    try {
      const data = new FormData();

      if (
        name === '' ||
        price === '' ||
        description === '' ||
        imageAvatar === null
      ) {
        toast.error('Preencha todos os campos!');
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      const apiClient = setupAPIClient();

      await apiClient.post('/product', data);

      toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      console.log('error trying register a product', error);
      toast.error('Erro ao cadastrar um produto!');
    }

    setName('');
    setPrice('');
    setDescription('');
    setImageAvatar(null);
    setAvatarUrl('');
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo produto</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={40} color='#fff'></FiUpload>
              </span>

              <input
                type='file'
                accept='image/png, image/jpeg'
                onChange={handleFile}
              />

              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt='foto do produto'
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select
              onChange={handleChangeCategory}
              value={categorySelected}
              className={styles.select}
            >
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              className={styles.input}
              type='text'
              placeholder='Digite o nome do produto'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.input}
              type='text'
              placeholder='Digite o preço do produto'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className={styles.input}
              placeholder='Descreva seu produto...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className={styles.buttonAdd} type='submit'>
              Registrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context);
  const response = await apiClient.get('category');

  return {
    props: {
      categoryList: response.data,
    },
  };
});
