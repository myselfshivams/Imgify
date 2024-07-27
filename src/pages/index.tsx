// src/pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is the home page of the website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Home Page!
        </h1>
        <p className={styles.description}>
          This is a simple landing page to showcase the Imigify.
        </p>
      </main>
    </>
  );
};

export default Home;