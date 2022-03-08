import { FC, useEffect, useState } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";

const Controller: FC<{
  playback: () => void;
  skip: () => void;
  previous: () => void;
}> = ({ playback, skip, previous }) => {
  const [state, setState] = useState("play");

  const handleClick = () => {
    if (state === "play") {
      setState("pause");
    } else {
      setState("play");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 w-screen bg-base-300 py-2">
        <div className="mx-auto flex justify-center gap-5">
          <button className="btn btn-ghost">
            <IoPlaySkipBack onClick={previous} size="2em" />
          </button>
          <button className="btn btn-ghost" onClick={handleClick}>
            {state === "play" ? (
              <IoPause size="2em" onClick={playback} />
            ) : (
              <IoPlay size="2em" onClick={playback} />
            )}
          </button>
          <button className="btn btn-ghost">
            <IoPlaySkipForward onClick={skip} size="2em" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Controller;
