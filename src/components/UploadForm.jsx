"use client";
import React, { useEffect, useState } from "react";
import UploadIcon from "./UploadIcon";
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadForm = ({isPro}) => {
  const [isUploading, setIsUploading] = useState(false);

  

  const router = useRouter();

  function handleMustUpgrade(){
    alert("Upgrade your plan to pro before continue");
    location.reload();
  }

  async function upload(event) {
    event.preventDefault();

    // if(!isPro === true){
    //   alert("Upgrade your plan to pro before continue");
    //   return;
    // }

    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      setIsUploading(true);

      const res = await axios.postForm("/api/upload", {
        file,
      });
      setIsUploading(false);
      const newName = res.data.newName;
      router.push("/" + newName);
    }

    // console.log(event);
  }
  return (
    <>
      {isUploading && (
        <div className="bg-black/80 text-white fixed inset-0 flex items-center">
          <div className="w-full text-center">
            <h2 className="text-4xl mb-4"> Uploading</h2>
            <h3 className="text-xl"> Please wait...</h3>
          </div>
        </div>
      )}
      <label
        className="bg-gray-200 cursor-pointer text-black py-2 px-3 
        rounded-full inline-flex gap-2 border-black/80 
        border-2 shadow-lg shadow-black "

        
      >
        <UploadIcon />

        <span className="font-semibold">Choose File</span>
        <input onChange={upload} type="file" className="hidden" />
      </label>
    </>
  );
};

export default UploadForm;
