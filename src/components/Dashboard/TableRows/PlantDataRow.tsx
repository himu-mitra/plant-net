"use client";

import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import UpdatePlantModal from "../../Modal/UpdatePlantModal";

const PlantDataRow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 transition duration-200">
      {/* Plant Image */}
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="w-14 h-14 overflow-hidden rounded-lg shadow-md">
            <img
              alt="Money Plant"
              src="https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </td>

      {/* Plant Name */}
      <td className="px-6 py-4 text-gray-900 font-medium text-lg">
        Money Plant
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-gray-700">Indoor</td>

      {/* Price */}
      <td className="px-6 py-4 font-semibold text-emerald-600">$120</td>

      {/* Quantity */}
      <td className="px-6 py-4 text-gray-900 text-center">5</td>

      {/* Delete Button */}
      <td className="px-6 py-4">
        <button
          onClick={() => setIsOpen(true)}
          className="relative px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition rounded-lg shadow-md"
        >
          Delete
        </button>
        <DeleteModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
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
