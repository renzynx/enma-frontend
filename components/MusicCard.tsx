import { MusicCardProps } from "lib/types";
import { FC } from "react";
import YoutubeEmbed from "./Youtube";

const MusicCard: FC<MusicCardProps> = ({ track }) => {
  return (
    <div className="card card-compact lg:w-96 md:w-96 sm:w-[98vw] w-[98vw] bg-base-100 shadow-xl">
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
      </div>
    </div>
  );
};

export default MusicCard;
