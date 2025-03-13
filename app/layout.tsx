import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";

import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};    

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className} >
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar  currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
            {children}
        </div>        
      </body>
    </html>
  );
}
