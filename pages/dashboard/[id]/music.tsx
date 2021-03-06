import Controller from '@components/Controller';
import Navbar from '@components/Navbar';
import useAuth from 'lib/hooks/useAuth';
import { SocketData } from 'lib/types';
import withApollo from 'lib/withApollo';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getDataFromTree } from '@apollo/client/react/ssr';

let socket: any = false;

const Music: NextPage = () => {
  const uid = useAuth();
  const [data, setData] = useState<SocketData>();
  const router = useRouter();
  const MusicCard = dynamic(() => import('@components/MusicCard'));
  const SearchForm = dynamic(() => import('@components/SearchForm'));
  const Slider = dynamic(() => import('@components/Slider'));

  const { id } = router.query;
  useEffect(() => {
    if (!socket) socket = io(process.env.NEXT_PUBLIC_WS!);
  }, [router]);
  useEffect(() => {
    socket.emit('playing', id);
    socket.on(id, (data: SocketData) => data && setData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayback = () => socket.emit('playback', { id, uid });
  const handleSkip = () => socket.emit('skip', { id, uid });
  const handlePrevious = () => socket.emit('previous', { id, uid });
  const handleVolume = (volume: string) =>
    socket.emit('volume', { id, uid, volume });
  const handlePlay = (url: string) => socket.emit('play', { id, url, uid });
  const handleShuffle = () => socket.emit('shuffle', { id, uid });

  return (
    <>
      <Head>
        <title>Enma | Music Dashboard</title>
      </Head>
      <Navbar />
      <div className="mx-auto grid place-items-center mt-10 mb-20 text-center">
        {data && data.track ? (
          <>
            <MusicCard track={data} />
            <Slider
              handleVolume={handleVolume}
              defaultVol={data.defaultVolume}
            />
          </>
        ) : (
          <div className="text-3xl mb-20">No track playing.</div>
        )}
        {data ? (
          <SearchForm play={handlePlay} />
        ) : (
          <p className="text-xl">
            Join a voice channel and use command &quot;join&quot; to start
            adding songs.
          </p>
        )}
      </div>
      <Controller
        data={data}
        playback={handlePlayback}
        skip={handleSkip}
        previous={handlePrevious}
        shuffle={handleShuffle}
      />
    </>
  );
};

export default withApollo(Music, { getDataFromTree });
