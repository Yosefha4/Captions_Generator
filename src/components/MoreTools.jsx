"use client";

import { File, FileText, BringToFront, AtomIcon } from "lucide-react";
import React from "react";

const ToolItem = ({ title, desc, link, serial }) => {
  let currentColor = "";
  let myClass = "";
  if (serial == 1) {
    currentColor = "#e34d0c";
    myClass =
      "flex flex-col gap-2 items-center w-full sm:w-[200px] bg-slate-200 rounded-md p-3 shadow-sm shadow-slate-500/50 border-2 border-[#e34d0c]";
  } else if (serial == 2) {
    currentColor = "#4159f6";
    myClass =
      "flex flex-col gap-2 items-center w-full sm:w-[200px] bg-slate-200 rounded-md p-3 shadow-sm shadow-slate-500/50 border-2 border-[#4159f6]";
  } else {
    currentColor = "#cb03ea";
    myClass =
      "flex flex-col gap-2 items-center w-full sm:w-[200px] bg-slate-200 rounded-md p-3 shadow-sm shadow-slate-500/50 border-2 border-[#cb03ea]";
  }

  // const handleToolClick = (serial) => {
  //   let link = "";
  //   if (serial == 1) {
  //     link = "https://github.com/Yosefha4/Chat-PDF";
  //   } else if (serial == 2) {
  //     link = "https://share-prompts-psi-seven.vercel.app/";
  //   }
  //   else{
  //     link = "https://meme-generator-js.netlify.app/"
  //   }
  //   window.open(link, "_blank");
  // };

  return (
    <div className={myClass}>
      {serial == 1 ? (
        <FileText size={24} color="#e48500" />
      ) : serial ==2 ? (
        <BringToFront size={24} color="#4159f6" />
      ) : (<AtomIcon size={24} color="#cb03ea" />)}
      <h3 className="font-bold">{title}</h3>
      <span className="text-center">{desc}</span>
      {serial == 1 ? (
        <button
          className="border border-slate-400 text-white  w-1/2 sm:w-full rounded-lg bg-orange-300"
          onClick={() => window.open("https://github.com/Yosefha4/Chat-PDF","_blank")}
        >
          Try it yourself
        </button>
      ) : serial == 2 ? (
        <button
          className="border border-slate-400 text-white  w-1/2 sm:w-full rounded-lg bg-[#4159f6]"
          onClick={() => window.open("https://share-prompts-psi-seven.vercel.app/","_blank")}
        >
          Try it yourself
        </button>
      ) : (
        <button
          className="border border-slate-400 text-white  w-1/2 sm:w-full rounded-lg bg-[#cb03ea]"
          onClick={() => window.open("https://meme-generator-js.netlify.app/","_blank")}
        >
          Try it yourself
        </button>
      )}
    </div>
  );
};

const MoreTools = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4 sm:gap-0">
      <ToolItem
        title="Share Prompt"
        desc="Open-source AI prompting tool for modern world to discover, create and share creative prompts."
        serial={2}
      />
      <ToolItem
        title="Chat PDF"
        desc="ChatPDF is an AI-powered tool that is designed to make your interaction with PDFs as simple as having a conversation."
        serial={1}
      />
      <ToolItem
        title="Memes-Generator"
        desc="ChatPDF is an AI-powered tool that is designed to make your interaction with PDFs as simple as having a conversation."
        serial={3}
        link="https://meme-generator-js.netlify.app/"
      />
    </div>
  );
};

export default MoreTools;
