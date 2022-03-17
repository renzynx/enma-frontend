import { getDataFromTree } from '@apollo/client/react/ssr';
import Navbar from '@components/Navbar';
import withApollo from 'lib/withApollo';
import Head from 'next/head';
import { CgDanger } from 'react-icons/cg';

const Commands = () => {
  return (
    <>
      <Head>
        <title>Enma | Commands</title>
      </Head>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-6xl text-center my-10">Work In Progress...</div>
        <CgDanger size="10rem" />
      </div>
    </>
  );
};

export default withApollo(Commands, { getDataFromTree });
