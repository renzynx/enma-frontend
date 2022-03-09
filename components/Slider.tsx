import { FC, useState } from "react";
import { IoVolumeLow, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

const Slider: FC<{
  handleVolume: (volume: string) => any;
  defaultVol: number | null;
}> = ({ handleVolume, defaultVol }) => {
  const [value, setValue] = useState(defaultVol ? defaultVol.toString() : "25");

  return (
    <div className="my-10 w-80">
      <div className="flex items-center gap-5">
        {value === "0" ? (
          <IoVolumeMute
            size="2em"
            onClick={() => {
              handleVolume("25");
              setValue("25");
            }}
          />
        ) : (
          <IoVolumeLow
            size="2em"
            onClick={() => {
              handleVolume("0");
              setValue("0");
            }}
          />
        )}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          className="range range-accent"
          step="25"
          onChange={(e) => {
            setValue(e.target.value);
            handleVolume(e.target.value);
          }}
        />
        <IoVolumeHigh
          className="cursor-pointer"
          onClick={() => {
            handleVolume("100");
            setValue("100");
          }}
          size="2em"
        />
      </div>
    </div>
  );
};

export default Slider;
