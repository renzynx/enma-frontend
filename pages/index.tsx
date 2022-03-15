import type { NextPage } from 'next';
import Navbar from '@components/Navbar';
import Head from 'next/head';
import Header from '@components/Header';
import Body from '@components/Body';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Enma | Home</title>
      </Head>
      <Navbar />
      <Header />
      <Body />
    </>
  );
};

export default Home;
