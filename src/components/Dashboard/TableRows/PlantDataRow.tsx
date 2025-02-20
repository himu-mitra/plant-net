"use client";

import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdatePlantModal from "../../Modal/UpdatePlantModal";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const PlantDataRow = ({ plant, refetch }: any) => {
  const { image, name, category, price, quantity, _id } = plant || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  async function handlePlantDelete() {
    try {
      const response = await axios.delete(`/api/dashboard/seller/delete-plant/${_id}`)
      console.log(response)
      if (response.status === 200) {
        toast.success("Plant deleted successfully!");
        refetch();
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 transition duration-200">
      {/* Plant Image */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-14 h-14 overflow-hidden rounded-lg shadow-md">
            {image ? (
              <Image
                src={image}
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

      {/* Plant Name */}
      <td className="px-6 py-4 text-gray-900 font-medium text-lg">{name}</td>

      {/* Category */}
      <td className="px-6 py-4 text-gray-700">{category}</td>

      {/* Price */}
      <td className="px-6 py-4 font-semibold text-emerald-600">{price}</td>

      {/* Quantity */}
      <td className="px-6 py-4 text-gray-900 text-center">{quantity}</td>

      {/* Delete Button */}
      <td className="px-6 py-4">
        <button
          onClick={() => setIsOpen(true)}
          className="relative px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition rounded-lg shadow-md"
        >
          Delete
        </button>
        <DeleteModal handleDelete={handlePlantDelete} isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      </td>

      {/* Update Button */}
      <td className="px-6 py-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="relative px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition rounded-lg shadow-md"
        >
          Update
        </button>
        <UpdatePlantModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </td>
    </tr>
  );
};

export default PlantDataRow;
