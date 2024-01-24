import React from "react";
import SparksIcon from "./SparksIcon";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header =  async() => {
  // const { userId } = await auth();
  // const isAuth = !!userId;
  return (
    <header className="flex justify-between items-center  text-lg  my-2 border-b border-gray-200">
      <Link href="/" className="flex gap-1 text-black font-bold rounded-md p-1">
        {/* <SparksIcon /> */}
        <span className="text-orange-600">CaptionsPlus⁺</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6 text-black text-md sm:text-md">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="mailto:contact@captionsPlus.com">Contact</Link>
      </nav>
   <div className="isLogin">
        <UserButton afterSignOutUrl="/"/>
      </div>
    </header>
  );
};

export default Header;
