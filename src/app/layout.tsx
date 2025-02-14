import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthSesionProvider from "@/providers/NextAuthSessionProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen-2xl mx-auto`}
      >
        <NextAuthSesionProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <nav className="sticky top-0 z-30">
            <Navbar></Navbar>
          </nav>
          <main>{children}</main>
          <footer>
            <Footer></Footer>
          </footer>
        </NextAuthSesionProvider>
      </body>
    </html>
  );
}
