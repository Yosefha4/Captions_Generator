"use client";
import axios from "axios";
import { Diamond, DiamondIcon, Gem } from "lucide-react";
import React, { useState } from "react";

const SubscriptionButton = ({ isPro }) => {
  const [loading, setLoading] = useState(false);


  const handleUpgradeToPro = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label
      onClick={handleUpgradeToPro}
      className="bg-black cursor-pointer text-gray-200 py-2 px-3
    rounded-full inline-flex gap-2
   shadow-md shadow-black items-center font-bold justify-center"
    >
      <Gem size={18} />
      <span>{isPro ? "Manage Plan" : "Get Pro"}</span>
    </label>

    // <button onClick={handleUpgradeToPro} className="flex gap-2 shadow-sm shadow-white bg-black rounded-full px-3 py-2">
    //   <Gem size={18} />
    //   <span>
    //   {isPro == true ? "Manage Subscription" : "Get Pro"}

    //   </span>
    // </button>
  );
};

export default SubscriptionButton;
