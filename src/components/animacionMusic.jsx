import Lottie from "lottie-react";
import animacionData from "../assets/lottie/music-group.json";

const AnimacionMusic = () => {
  return (
    <div className="w-[450px] h-auto">
      <Lottie animationData={animacionData} loop={true} />
    </div>
  );
};

export default AnimacionMusic;
