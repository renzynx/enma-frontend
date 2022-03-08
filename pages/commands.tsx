import Navbar from "@components/Navbar";
import { CgDanger } from "react-icons/cg";

const Commands = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="text-6xl text-center my-10">Work In Progress...</div>
        <CgDanger size="10rem" />
      </div>
    </>
  );
};

export default Commands;
