"use client";

import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import axios from "axios";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const CustomerOrderDataRow = ({ orderData, refetch, isLoading }: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const { name, image, category, price, quantity, _id, status, plantId } = orderData;
  console.log("quantity", quantity)

  async function handleDelete() {
    try {
      await axios.delete(`/api/dashboard/delete-order/${_id}`);
      await axios.patch(`/api/dashboard/seller/update-plant-quentity/${plantId}`, {
        quantityToUpdate: quantity,
        status: "increase"
      });
      refetch();
      toast.success("Order cancel Successful!");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  }

  return (
    <tr className="border-b border-gray-200 bg-white hover:bg-gray-100 transition duration-200">
      <td className="px-5 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
            {image ? (
              <Image
                src={image}
                alt={name}
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
      <td className="px-5 py-4 text-gray-900 font-medium">{name}</td>
      <td className="px-5 py-4 text-gray-600">{category}</td>
      <td className="px-5 py-4 font-semibold text-emerald-600">${price}</td>
      <td className="px-5 py-4 text-center">{quantity}</td>
      <td className="px-5 py-4">
        <span
          className={`px-3 py-2 text-sm font-semibold rounded-lg 
          ${
            status === "Delivered"
              ? "text-green-600"
              : status === "In Progress"
              ? "text-blue-600"
              : "text-yellow-500"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="px-5 py-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition rounded-lg shadow-md"
          >
            Cancel
          </button>
        )}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
