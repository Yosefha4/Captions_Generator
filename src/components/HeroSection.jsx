"use client";

import React from "react";

const HeroSection = ({ h1Text = "Hello H1", h2Text = "H2 HERO" }) => {
  // const [loading, setLoading] = useState(false);

  // const handleUpgradeToPro = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get("/api/stripe");
  //     window.location.href = res.data.url;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <section className="text-center mt-24 mb-8">
      {/* <button
        onClick={handleUpgradeToPro}
        disabled={loading}
        className=" mb-8 bg-white/90 cursor-pointer text-black/80 py-1 px-3 
        rounded-lg gap-2 shadow-lg shadow-black border border-black/80  font-semibold"
      >
        Upgrade To Pro
      </button> */}

      <h1
        className="text-5xl font-bold"
        style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.2" }}
      >
        {h1Text}
      </h1>
      <h2 className="text-black mt-2">{h2Text} </h2>
    </section>
  );
};

export default HeroSection;
