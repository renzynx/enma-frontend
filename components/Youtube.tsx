import { FC } from "react";
import YouTube, { Options } from "react-youtube";

const YoutubeEmbed: FC<{ id: string }> = ({ id }) => {
  const opts: Options = {
    height: "225",
    width: "400",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      disablekb: 1,
    },
  };

  return <YouTube videoId={id} opts={opts} />;
};

export default YoutubeEmbed;
