"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({ label, address, icon: Icon }: any) => {
  const pathname = usePathname();
  const isActive = pathname === address;

  return (
    <Link
      href={address}
      className={`flex items-center px-5 py-3 my-3 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-emerald-600 text-white shadow-lg"
          : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-4 font-medium">{label}</span>
    </Link>
  );
};

export default MenuItem;
