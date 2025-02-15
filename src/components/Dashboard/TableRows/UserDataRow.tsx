"use client";

import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";

const UserDataRow = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-medium whitespace-no-wrap">abc@gmail.com</p>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-700 font-medium whitespace-no-wrap">Customer</p>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <p className="text-red-500 font-medium whitespace-no-wrap">Unavailable</p>
      </td>

      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-block px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Update Role
        </button>

        {/* Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  );
};

export default UserDataRow;
