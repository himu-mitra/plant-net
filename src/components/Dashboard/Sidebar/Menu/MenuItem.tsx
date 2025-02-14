"use client"; // Next.js-এর Client Component হিসেবে চিহ্নিত করতে হবে

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuItem = ({ label, address, icon: Icon }: any) => {
  const pathname = usePathname();
  const isActive = pathname === address;

  return (
    <Link
      href={address}
      className={`flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
      }`}
    >
      <Icon className='w-5 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </Link>
  );
};


export default MenuItem;
