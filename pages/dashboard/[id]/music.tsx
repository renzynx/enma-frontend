import Controller from "@components/Controller";
import MusicCard from "@components/MusicCard";
import Navbar from "@components/Navbar";
import SearchForm from "@components/SearchForm";
import Slider from "@components/Slider";
import useAuth from "lib/hooks/useAuth";
import { SocketData, Track } from "lib/types";
import withApollo from "lib/withApollo";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any = false;

const Music: NextPage<{ query: any }> = ({ query }) => {
  const uid = useAuth();
  const [data, setData] = useState<SocketData>();
  const router = useRouter();

  const { id } = query;
  useEffect(() => {
    if (!socket) socket = io(process.env.NEXT_PUBLIC_WS!);
  }, [router]);
  useEffect(() => {
    socket.emit("playing", { id, uid });
    socket.on(id, (data: SocketData) => data && setData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayback = () => socket.emit("playback", { id, uid });
  const handleSkip = () => socket.emit("skip", { id, uid });
  const handlePrevious = () => socket.emit("previous", { id, uid });
  const handleVolume = (volume: string) =>
    socket.emit("volume", { id, uid, volume });
  const handlePlay = (url: string) => socket.emit("play", { id, url, uid });
  const handleShuffle = () => socket.emit("shuffle", { id, uid });

  return (
    <>
      <Head>
        <title>Enma | Music Dashboard</title>
      </Head>
      <Navbar />
      <div className="mx-auto grid place-items-center mt-10 mb-20">
        {data && data.track ? (
          <>
            <MusicCard track={data.track} />
            <Slider
              handleVolume={handleVolume}
              defaultVol={data.defaultVolume}
            />
          </>
        ) : (
          <div className="text-center text-3xl mb-20">No track playing.</div>
        )}
        {data?.player ? (
          <SearchForm play={handlePlay} />
        ) : (
          <p className="text-xl">
            Join a voice channel and use command &quot;join&quot; to start
            adding songs.
          </p>
        )}
      </div>
      <Controller
        playback={handlePlayback}
        skip={handleSkip}
        previous={handlePrevious}
        shuffle={handleShuffle}
      />
    </>
  );
};

Music.getInitialProps = async (context) => {
  return {
    query: context.query,
  };
};

export default withApollo(Music);
