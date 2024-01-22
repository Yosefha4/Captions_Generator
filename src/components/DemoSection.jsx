import React from "react";
import SparksIcon from "./SparksIcon";
// import {VideoBefore} from "../videos/without-captions.mp4"

const DemoSection = () => {
  return (
    <section className="flex mt-12 justify-evenly rounded-sm items-center py-5 bg-slate-200">
      <div className="bg-black/40 w-[240px] h-[480px] rounded-xl">
        
        <video
          className="h-full"
          src="https://yosef-captions.s3.amazonaws.com/y0lrj5zlhc.mp4"
          preload="true"
          muted
          autoPlay
          loop
        ></video>
      </div>
      <div className="bg-orange-400">
        <SparksIcon />
      </div>
      <div className="bg-black/40 w-[240px] h-[480px] rounded-xl">
        <video
          className="h-full "
          src="https://yosef-captions.s3.amazonaws.com/y0lrj62sik.mp4"
          preload="true"
          muted
          autoPlay
          loop
 
        ></video>
      </div>
    </section>
  );
};

export default DemoSection;
