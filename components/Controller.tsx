import { ControllerProps } from "lib/types";
import { FC, useState } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoShuffle,
  IoRepeat,
} from "react-icons/io5";

const Controller: FC<ControllerProps> = ({
  playback,
  skip,
  previous,
  shuffle,
}) => {
  const [state, setState] = useState("play");

  return (
    <>
      <div className="navbar fixed bottom-0 w-[100vw] bg-base-300 py-2">
        <div className="navbar-start" />
        <div className="navbar-center">
          <RateLimitButton>
            <IoPlaySkipBack onClick={previous} size="2em" />
          </RateLimitButton>
          <RateLimitButton>
            {state === "play" ? (
              <IoPause
                size="2em"
                onClick={() => {
                  playback();
                  setState("pause");
                }}
              />
            ) : (
              <IoPlay
                size="2em"
                onClick={() => {
                  playback();
                  setState("play");
                }}
              />
            )}
          </RateLimitButton>
          <RateLimitButton>
            <IoPlaySkipForward
              onClick={() => {
                skip();
              }}
              size="2em"
            />
          </RateLimitButton>
        </div>
        <div className="navbar-end">
          <div className="flex lg:flex-row md:flex-row sm:flex-col flex-col">
            <RateLimitButton>
              <IoShuffle size="2em" onClick={shuffle} />
            </RateLimitButton>
            <RateLimitButton>
              <IoRepeat size="2em" />
            </RateLimitButton>
          </div>
        </div>
      </div>
    </>
  );
};

const RateLimitButton: FC = ({ children }) => {
  const [ratelimit, setRatelimit] = useState(false);

  const handleRatelimit = () => {
    setRatelimit(true);
    setTimeout(() => setRatelimit(false), 1500);
  };

  return (
    <button
      className={`btn btn-ghost ${ratelimit ? "btn-disabled cursor-wait" : ""}`}
      onClick={handleRatelimit}
    >
      {children}
    </button>
  );
};

export default Controller;
