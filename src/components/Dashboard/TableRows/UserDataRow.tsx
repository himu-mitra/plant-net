"use client";

import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const UserDataRow = ({ user, refetch }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { image, name, email, role, status } = user || {};
  async function updateRole(selectedRole: any) {
    if (role === selectedRole) return;

    try {
      await axios.patch("/api/dashboard/admin/update-role", {email, role: selectedRole})
      toast.success("Role Update Successfully")
    } catch (error) {
      console.log(error)
    } finally {
      refetch()
      setIsOpen(false)
    }
  } 

  return (
    <tr className="group hover:bg-gray-100 transition">
      <td className="px-5 py-4 group-hover:bg-gray-100 transition">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
            {image ? (
              <Image
                src={user.image}
                alt="User"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm group-hover:bg-gray-100 transition">
        <p className="text-gray-900 font-medium whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm group-hover:bg-gray-100 transition">
        <p className="text-gray-900 font-medium whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm group-hover:bg-gray-100 transition">
        <p className="text-gray-700 font-medium whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm group-hover:bg-gray-100 transition">
        <p className="text-green-500 font-medium whitespace-no-wrap">
          {status ? status : "Unavailable"}
        </p>
      </td>

      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm group-hover:bg-gray-100 transition">
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-block px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Update Role
        </button>

        {/* Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} role={role} updateRole= {updateRole} />
      </td>
    </tr>
  );
};

export default UserDataRow;
