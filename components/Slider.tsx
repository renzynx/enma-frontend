import { FC, useState } from 'react';
import { IoVolumeLow, IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

const Slider: FC<{
  handleVolume: (volume: string) => any;
  defaultVol: number | null;
}> = ({ handleVolume, defaultVol }) => {
  const [value, setValue] = useState(defaultVol ? defaultVol.toString() : '25');
  const [ratelimit, setRatelimit] = useState(false);

  const handleVolumeRateLimit = (vol: string) => {
    setValue(vol);
    handleVolume(vol);
    setRatelimit(true);
    setTimeout(() => setRatelimit(false), 1500);
  };

  return (
    <div className="my-10 w-80">
      <div className="flex items-center gap-5">
        {value === '0' ? (
          <IoVolumeMute
            size="2em"
            onClick={() => handleVolumeRateLimit('25')}
          />
        ) : (
          <IoVolumeLow size="2em" onClick={() => handleVolumeRateLimit('0')} />
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          className="range range-accent"
          step="25"
          onChange={(e) => handleVolumeRateLimit(e.target.value)}
        />
        <IoVolumeHigh
          className="cursor-pointer"
          onClick={() => handleVolumeRateLimit('100')}
          size="2em"
        />
      </div>
    </div>
  );
};

export default Slider;
