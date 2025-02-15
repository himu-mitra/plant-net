"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import avatarImg from "@/assets/images/placeholder.jpg";
import logo from "@/assets/images/logo-flat.png";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { sessionUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  if (
    pathname.startsWith("/dashboard")
  ) {
    return null;
  }

  return (
    <div className="w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0 w-11/12 mx-auto">
          {/* Logo */}
          <Link href="/">
            {/* <h1>MITRA MART</h1> */}
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
          </Link>
          {/* Dropdown Menu */}
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              {/* Dropdown btn */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  {/* Avatar */}
                  <Image
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={sessionUser?.image || avatarImg}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                  <Link
                    href="/"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Home
                  </Link>

                  {sessionUser ? (
                    <>
                      {sessionUser?.role === "customer" ? (
                        <Link
                          href="/dashboard/customer/my-orders"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          My Orders
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                      )}
                      <div
                        onClick={async () => await signOut()}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
