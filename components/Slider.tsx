import { FC, useState } from "react";
import { IoVolumeLow, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

const Slider: FC<{ handleVolume: (volume: string) => any }> = ({
  handleVolume,
}) => {
  const [value, setValue] = useState("25");

  return (
    <div className="my-10 w-96">
      <div className="flex items-center gap-5">
        {value === "0" ? (
          <IoVolumeMute size="2em" />
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
