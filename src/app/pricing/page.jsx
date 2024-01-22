import HeroSection from "@/components/HeroSection";
import PricingItems from "@/components/PricingItems";
import React from "react";
import { checkSubscription } from "../libs/subscription";

const PricingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <HeroSection h1Text="Check out our pricing" h2Text="Choose your plan" />

      <PricingItems />
    </div>
  );
};

export default PricingPage;
