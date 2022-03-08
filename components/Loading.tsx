import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-screen min-h-screen bg-base-300 flex items-center justify-center flex-col">
      Loading...
      <BarLoader loading={true} color="white" width="200px" />
    </div>
  );
};

export default Loading;
