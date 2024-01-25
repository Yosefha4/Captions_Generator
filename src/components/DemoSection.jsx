import React from "react";
import SparksIcon from "./SparksIcon";
// import {VideoBefore} from "../videos/without-captions.mp4"

const DemoSection = () => {
  return (
    <section className="flex mt-12 justify-evenly rounded-sm items-center py-5 bg-slate-200">
      <div className="bg-black/40 w-[240px] h-[480px] rounded-xl">
        
        <video
          className="h-full"
          src="/without-captions.mp4"
          preload="true"
          muted
          autoPlay
          loop
          playsInline
        ></video>
      </div>
      <div className="bg-orange-400">
        <SparksIcon />
      </div>
      <div className="bg-black/40 w-[240px] h-[480px] rounded-xl">
        <video
          className="h-full "
          src="/WithCap.mp4"
          preload="true"
          muted
          autoPlay
          loop
          playsInline
 
        ></video>
      </div>
    </section>
  );
};

export default DemoSection;
