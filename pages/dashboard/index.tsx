import { getDataFromTree } from '@apollo/client/react/ssr';
import Menu from '@components/Menu';
import Navbar from '@components/Navbar';
import { useMutualGuildsQuery } from 'generated/graphql';
import useAuth from 'lib/hooks/useAuth';
import withApollo from 'lib/withApollo';
import Head from 'next/head';
import { MoonLoader } from 'react-spinners';

const DashboardPage = () => {
  useAuth();
  const { data, loading } = useMutualGuildsQuery();

  return (
    <>
      <Head>
        <title>Enma | Dashboard</title>
      </Head>
      <Navbar />
      {loading ? <MenuLoading /> : <Menu guilds={data?.getGuilds?.guilds} />}
    </>
  );
};

const MenuLoading = () => (
  <div className="flex items-center justify-center w-screen min-h-[90vh]">
    <MoonLoader loading={true} color="#6377f7" />
  </div>
);

export default withApollo(DashboardPage, { getDataFromTree });
