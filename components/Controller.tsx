import { ControllerProps } from 'lib/types';
import { FC, useState } from 'react';
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoShuffle,
  IoRepeat,
} from 'react-icons/io5';

const Controller: FC<ControllerProps> = ({
  playback,
  skip,
  previous,
  shuffle,
  data,
}) => {
  const [state, setState] = useState('play');

  return (
    <>
      <div className="navbar fixed bottom-0 w-[100vw] bg-base-300 py-2">
        <div className="navbar-start" />
        <div className="navbar-center">
          <RateLimitButton disable={!data}>
            <IoPlaySkipBack onClick={previous} size="2em" />
          </RateLimitButton>
          <RateLimitButton disable={!data}>
            {state === 'play' ? (
              <IoPause
                size="2em"
                onClick={() => {
                  playback();
                  setState('pause');
                }}
              />
            ) : (
              <IoPlay
                size="2em"
                onClick={() => {
                  playback();
                  setState('play');
                }}
              />
            )}
          </RateLimitButton>
          <RateLimitButton disable={!data}>
            <IoPlaySkipForward
              onClick={() => {
                skip();
              }}
              size="2em"
            />
          </RateLimitButton>
        </div>
        <div className="navbar-end">
          <div className="flex lg:flex-row md:flex-row sm:flex-col sm:gap-y-2 gap-y-2 flex-col">
            <RateLimitButton disable={!data}>
              <IoShuffle size="2em" onClick={shuffle} />
            </RateLimitButton>
            <RateLimitButton disable={!data}>
              <IoRepeat size="2em" />
            </RateLimitButton>
          </div>
        </div>
      </div>
    </>
  );
};

const RateLimitButton: FC<{ disable: boolean }> = ({ children, disable }) => {
  const [ratelimit, setRatelimit] = useState(false);

  const handleRatelimit = () => {
    setRatelimit(true);
    setTimeout(() => setRatelimit(false), 1500);
  };

  return (
    <button
      disabled={disable}
      className={`btn btn-ghost mx-2 ${
        ratelimit ? 'btn-disabled cursor-wait' : ''
      }`}
      onClick={handleRatelimit}
    >
      {children}
    </button>
  );
};

export default Controller;
