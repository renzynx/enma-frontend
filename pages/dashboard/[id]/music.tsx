import Controller from "@components/Controller";
import Navbar from "@components/Navbar";
import Slider from "@components/Slider";
import YoutubeEmbed from "@components/Youtube";
import axios from "axios";
import useAuth from "lib/hooks/useAuth";
import { Track } from "lib/types";
import withApollo from "lib/withApollo";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";

let socket: any = false;

const Music: NextPage<{ data: any }> = ({ data }) => {
  useAuth();
  const [track, setTrack] = useState<Track>();
  const [lyric, setLyric] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { id } = data;
  useEffect(() => {
    if (!socket) socket = io(process.env.NEXT_PUBLIC_WS!);
  }, [router]);
  useEffect(() => {
    socket.emit("playing", id);
    socket.on(id, (track: Track) => {
      track && setTrack(track);
      track && setTimeout(() => setLyric(""), track.duration - track.position);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLyric = (title: string) => {
    !lyric && setLoading(true);
    !lyric &&
      axios
        .get(
          `https://cors.lyricfinder.workers.dev/?https://api.renzynx.space/lyric?q=${title}`
        )
        .then(({ data }) => setLyric(data.lyric))
        .finally(() => setLoading(false));
  };

  const handlePlayback = () => socket.emit("playback", id);
  const handleSkip = () => {
    socket.emit("skip", id);
    setLyric("");
  };
  const handlePrevious = () => {
    socket.emit("previous", id);
    setLyric("");
  };
  const handleVolume = (volume: string) =>
    socket.emit("volume", { id, volume });

  return (
    <>
      <Head>
        <title>Enma | Music Dashboard</title>
      </Head>
      <Navbar />
      <div className="mx-auto grid place-items-center my-20">
        {track ? (
          <>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                {/* <Image
                  src={`https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`}
                  alt="Track Thumbnail"
                  width="400px"
                  height="225px"
                /> */}
                <YoutubeEmbed id={track.identifier} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{track.title}</h2>
                <p>{track.author}</p>
                <div className="card-actions justify-end">
                  <button
                    className={`btn btn-primary ${loading ? "loading" : ""}`}
                    onClick={() => fetchLyric(track.title)}
                  >
                    View Lyric
                  </button>
                </div>
              </div>
            </div>
            <Slider handleVolume={handleVolume} />
            <div>
              {lyric ? (
                <div className="flex justify-center whitespace-pre-line text-center text-lg my-20">
                  {lyric}
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-3xl">No track playing.</div>
        )}
      </div>
      <Controller
        playback={handlePlayback}
        skip={handleSkip}
        previous={handlePrevious}
      />
    </>
  );
};

Music.getInitialProps = async (context) => {
  return {
    data: context.query,
  };
};

export default withApollo(Music);
