"use client";

import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import logo from "../../../assets/images/logo-flat.png";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Toggle Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-white shadow-md text-gray-800 flex justify-between md:hidden px-4 py-3">
        <Link href="/">
          <Image src={logo} alt="logo" width={100} height={40} priority className="h-auto w-auto" />
        </Link>
        <button onClick={handleToggle} className="p-2 rounded-md focus:outline-none hover:bg-gray-200">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col bg-gray-100 w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition-all duration-300 ease-in-out shadow-lg md:shadow-none overflow-y-auto max-h-screen`}
      >
        <div>
          <div className="w-full flex justify-center items-center px-4 py-3 bg-emerald-500 rounded-lg shadow-md">
            <Link href="/">
              <Image src={logo} alt="logo" width={100} height={40} className="mx-auto" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex flex-col flex-1 mt-6">
            <nav className="space-y-2">
              <CustomerMenu />
              <SellerMenu />
              <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
              <AdminMenu />
            </nav>
          </div>
        </div>

        {/* Footer Section */}
        <div>
          <hr className="border-gray-300" />

          <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />
          <button
            onClick={async () => await signOut()}
            className="flex items-center w-full px-4 py-3 mt-4 text-gray-700 font-medium transition-all duration-300 rounded-lg hover:bg-red-500 hover:text-white"
          >
            <GrLogout className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
