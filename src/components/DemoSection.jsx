import React from "react";
import SparksIcon from "./SparksIcon";
import Image from "next/image";
// import {VideoBefore} from "../videos/without-captions.mp4"

const DemoSection = () => {
  return (
    <section className="flex flex-col md:flex-row mt-12 justify-evenly rounded-sm items-center py-5 bg-slate-300">
      <div className="md:hidden w-auto items-center justify-center flex  mb-3">
        <Image src="/heroImg.png" alt="Caption image for small screens" width={400} height={300} />
      </div>
      {/* <div className="md:hidden w-auto items-center justify-center flex">
        <Image src="/stepsImg.png" alt="Caption image for small screens" width={400} height={300} />
      </div> */}
      <div className="bg-black/80 w-[240px] h-[480px] rounded-xl hidden md:block">
        
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
      <div className="bg-orange-400 hidden md:block">
        <SparksIcon />
      </div>
      <div className="bg-black/40 w-[240px] h-[480px] rounded-xl hidden md:block">
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

      {/* <div className="flex w-full">
        <Image src='/stepsImg.png' alt="Caption image for small screens" width={400} height={350}/>
      </div> */}
    </section>
  );
};

export default DemoSection;
