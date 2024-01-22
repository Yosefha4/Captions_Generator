import { Gem, Home, Send } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer >
      <div className="flex items-center justify-between w-full mt-20 mb-4 py-4 border-t border-slate-200">
        <div className="">
          <span className="text-sm">© 2023 – 2024 Yosef dev. All rights reserved</span>
        </div>
        <div className="flex items-center gap-16 text-sm ">
          <Link href="/">Terms of Use</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Help</Link>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
