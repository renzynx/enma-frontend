import { FaYoutube, FaSpotify, FaSoundcloud } from 'react-icons/fa';

const Body = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex w-full lg:flex-row md:flex-row sm:flex-col flex-col items-center justify-around gap-5">
        <p className="lg:text-left md:text-left sm:text-center text-center text-xl">
          Enma offers a variety of platforms to help you get the most out of
          your music experience.
          <p>Play your favourite songs, playlist, albums with Enma.</p>
        </p>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-row gap-5">
            <FaYoutube color="#FF0000" size="50px" />
            <FaSpotify color="#1db954" size="50px" />
            <FaSoundcloud color="#FF9533" size="50px" />
          </div>
          <p>And much more...</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
