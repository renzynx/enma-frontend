import { getDataFromTree } from "@apollo/client/react/ssr";
import Menu from "@components/Menu";
import Navbar from "@components/Navbar";
import { useGuildsQuery } from "generated/graphql";
import withApollo from "lib/withApollo";
import Head from "next/head";
import { MoonLoader } from "react-spinners";

const DashboardPage = () => {
  const { data, loading } = useGuildsQuery();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />
      {loading ? <MenuLoading /> : <Menu guilds={data?.guilds} />}
    </>
  );
};

const MenuLoading = () => (
  <div className="flex items-center justify-center w-screen min-h-[90vh]">
    <MoonLoader loading={true} />
  </div>
);

export default withApollo(DashboardPage, { getDataFromTree });
