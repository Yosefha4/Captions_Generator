import DemoSection from "@/components/DemoSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SparksIcon from "@/components/SparksIcon";
import UploadForm from "@/components/UploadForm";
import UploadIcon from "@/components/UploadIcon";
import React from "react";
import NoSSRWrapper from "./NoSSRWrapper";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "@/components/Footer";
import { checkSubscription } from "./libs/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { ArrowRight, ArrowRightSquare } from "lucide-react";
import MoreTools from "@/components/MoreTools";

const Home = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  const isPro = await checkSubscription();

  // console.log("isPro",isPro)
  return (
    <NoSSRWrapper>
      <HeroSection
        h1Text="Add captions to your videos"
        h2Text="Just upload your video and we will do the rest."
      />

      <div className="text-center">
        {isAuth ? (
          <div className="flex items-center justify-center gap-3">
            <UploadForm isPro={isPro} />
            <SubscriptionButton isPro={isPro} />
          </div>
        ) : (
          <Link href="/sign-in">
            <button
              className="bg-orange-600 cursor-pointer text-white py-2 px-4 
        rounded-lg inline-flex items-center gap-2 border-black/90 border-2 font-bold text-xl"
            >
                <ArrowRightSquare  size={22} />
              Login To Get Started!
            
            </button>
          </Link>
        )}
      </div>
      <DemoSection />
      <HeroSection
        h1Text="More AI Tools"
        h2Text="Just upload your video and we will do the rest."
      />
      <MoreTools/>
      <Footer />
    </NoSSRWrapper>
  );
};

export default Home;
