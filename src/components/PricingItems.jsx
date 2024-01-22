import React from "react";
import PriceIcon from "./PriceIcon";
import { checkSubscription } from "@/app/libs/subscription";

const PricingItems = async () => {
  const isPro = await checkSubscription();

  return (
    <section className="flex flex-col md:flex-row gap-5 md:gap-0 mt-12 justify-around items-center my-20">
      {/* <div className="bg-black/50 w-[240px] h-[400px] rounded-xl text-center shadow-lg shadow-slate-200">
        <h2 className="text-2xl text-center mt-2">Basic</h2>
        <span className="text-sm text-gray-50/40 mx-1 ">
          Best option for personal use & small PDF files.
        </span>
        <div className="flex justify-center mt-5 items-center gap-1">
          <h1 className="text-5xl text-center font-bold">19$</h1>
          <span className="text-sm text-gray-50/40">/ month</span>AI transcription, subtitles & translation
        </div>
      </div> */}
      {/* <div className="bg-black/50 w-[300px] h-[400px] flex flex-col justify-around rounded-xl text-center  shadow-lg shadow-slate-200">
        <div className="">
          <h2 className="text-3xl text-center mt-2 font-serif">Basic</h2>
          <span className="text-sm text-gray-50/40 mx-1">
          Best option for personal use & small PDF files.
          </span>
        </div>
        <div className="flex  justify-center items-center gap-1">
          <h1 className="text-5xl text-center font-bold">9$</h1>
          <span className="text-sm text-gray-50/40">/ month</span>
        </div>
        <div className="flex  flex-col items-start px-2 gap-3">
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-start text-gray-300" >Export 120 minutes of videos</span>
          </div>
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-gray-300" >Export 720p videos at super speed</span>
          </div>
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-gray-300" >Export in TXT, SRT, and Word</span>
          </div>
      
        </div>
        <button className="bg-blue-600 py-1 ">Get Started</button>

      </div> */}
{  !isPro  ? ( <div className="bg-white/80 w-[300px] h-[400px] flex flex-col justify-around rounded-xl text-center  shadow-lg shadow-slate-200">
        <div className="">
          <h2 className="text-3xl text-center my-2 font-serif">Pro</h2>
          <span className="text-sm text-black/70 mx-1">
            Relevant for advanced studies, research works & academic works.
          </span>
        </div>
        <div className="flex  justify-center items-center gap-1">
          <h1 className="text-5xl text-center font-bold">29$</h1>
          <span className="text-sm text-black/70">/ month</span>
        </div>
        <div className="flex  flex-col items-start px-2 gap-3">
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-start text-black/80" >Export 300 minutes of videos/month</span>
          </div>
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-start text-black/80" >Export Full HD videos at super speed</span>
          </div>
          <div className="flex items-center  gap-3">
            <PriceIcon />
            <span className="text-sm text-start text-black/80" >Translate Subtitles or Transcriptions</span>
          </div>
      
          <div className="flex items-center gap-3">
            <PriceIcon />
            <span className="text-sm text-start text-black/80" >Export in +10 formats</span>
          </div>
        </div>

        <button className="bg-orange-600 py-1 text-white font-semibold">Get Started
        
        </button>
      </div>) :( <div>
        <h1 className="bg-black/70">You Are Pro.</h1>
      </div>)}
    </section>
  );
};

export default PricingItems;
