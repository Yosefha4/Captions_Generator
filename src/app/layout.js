import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });
// const roboto = Roboto({subsets: ["latin"],weight:'900'});
// const arial = Averia_Libre({ subsets: ["latin"],weight:"700" });

export const metadata = {
  title: "CaptionsPlus⁺",
  description: "Captions Generator - Add Captions To Your Video",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            inter.className +
            // " bg-white min-h-screen text-black"
            " bg-gradient-to-b from-white to-white min-h-screen text-black"
          }
        >
          <main className="p-4 max-w-5xl mx-auto">
            <Header />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
