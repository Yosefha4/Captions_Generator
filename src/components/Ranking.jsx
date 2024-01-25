"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");
  const [firstBlur, setfirstBlur] = useState("");
  const [secBlur, setSecBlur] = useState("");
  const [thirdBlur, setThirdBlur] = useState("");

  const handleImgClick = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    setCurrentImg(e.target.alt);
    // console.log(e.target.alt);
  };

  return (
    <div className="flex flex-col ">
      <h1 className="text-center text-2xl font-bold">Steps</h1>
      <div className="w-full py-6 px-2 flex flex-col md:flex-row items-center gap-2 bg-slate-300  rounded-sm ">
        <div className="relative h-[220px] w-[320px]">
          <Image
            fill
            src="/colorImg.png"
            alt="/colorImg.png"
            className={`rounded-lg cursor-pointer ` + firstBlur}
            onClick={handleImgClick}
            onMouseOver={() => setfirstBlur(" opacity-75")}
            onMouseLeave={() => setfirstBlur("opacity-1")}
          />
        </div>
        <div className="relative h-[220px] w-[320px]">
          <Image
            fill
            src="/proccImg.png"
            alt="/proccImg.png"
            className={`rounded-lg cursor-pointer ` + secBlur}
            onClick={handleImgClick}
            onMouseOver={() => setSecBlur(" opacity-75")}
            onMouseLeave={() => setSecBlur("opacity-1")}
          />
        </div>
        <div className="relative h-[220px] w-[320px]">
          <Image
            fill
            src="/downImg.png"
            alt="/downImg.png"
            className={`rounded-lg cursor-pointer ` + thirdBlur}
            onClick={handleImgClick}
            onMouseOver={() => setThirdBlur(" opacity-75")}
            onMouseLeave={() => setThirdBlur("opacity-1")}
          />
        </div>
      </div>
      {openModal && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center"
          id="modal-container"
        >
          <div className="relative max-w-4xl mx-auto w-[100%] h-[40%] md:w-full md:h-full ">
            <Image
              fill
              src={currentImg}
              alt={currentImg}
              // width={500}
              // height='screen'
              className="max-w-full max-h-full "
              //  onClick={handleImageClick}
            />
            <button
              className="absolute top-2 right-2 text-black text-4xl cursor-pointer"
              onClick={() => setOpenModal(!openModal)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
