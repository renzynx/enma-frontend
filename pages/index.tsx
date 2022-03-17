import type { GetStaticProps, NextPage } from 'next';
import Navbar from '@components/Navbar';
import Head from 'next/head';
import Header from '@components/Header';
import Body from '@components/Body';
import withApollo from 'lib/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

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

export default withApollo(Home, { getDataFromTree });
