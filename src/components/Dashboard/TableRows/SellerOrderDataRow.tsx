"use client";

import { useState } from "react";
import DeleteModal from "@/components/Modal/DeleteModal";
import axios from "axios";
import toast from "react-hot-toast";

const SellerOrderDataRow = ({ orderData, refetch }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  async function handleStatus(newStatus: any) {
    if (orderData.status === newStatus) return;
    try {
      await axios.patch("/api/dashboard/seller/update-plant-status", {
        orderId: orderData?._id,
        orderStatus: newStatus,
      });
      refetch();
      toast.success("Status Update Successful!");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/dashboard/delete-order/${orderData?._id}`);
      await axios.patch(
        `/api/dashboard/update-plant-quentity/${orderData?.plantId}`,
        {
          quantityToUpdate: orderData?.quantity,
          status: "increase",
        }
      );
      refetch();
      toast.success("Order cancel Successful!");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      closeModal();
    }
  }

  return (
    <tr className="group bg-white hover:bg-gray-100 transition duration-300">
      <td className="px-3 py-4 border-b border-gray-200 text-sm font-medium text-gray-900 group-hover:bg-gray-100 transition">
        {orderData?.name || "Unknown"}
      </td>
      <td className="px-2 py-4 border-b border-gray-200 text-sm text-gray-700 group-hover:bg-gray-100 transition">
        {orderData?.customer.name || "N/A"}
      </td>
      <td className="px-2 py-4 border-b border-gray-200 text-sm font-semibold text-gray-900 group-hover:bg-gray-100 transition">
        ${orderData?.price || "0.00"}
      </td>
      <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700 group-hover:bg-gray-100 transition">
        {orderData?.quantity || "0"}
      </td>
      <td className="px-2 py-4 border-b border-gray-200 text-sm text-gray-700 group-hover:bg-gray-100 transition">
        {orderData?.address || "Unknown"}
      </td>
      <td className="px-2 py-4 border-b border-gray-200 text-sm group-hover:bg-gray-100 transition">
        <span
          className={`text-sm font-semibold transition ${
            orderData?.status === "Pending"
              ? "text-yellow-500"
              : orderData?.status === "In Progress"
              ? "text-blue-500"
              : "text-green-600"
          }`}
        >
          {orderData?.status || "Pending"}
        </span>
      </td>
      <td className="px-2 py-4 border-b border-gray-200 text-sm group-hover:bg-gray-100 transition">
        <div className="flex items-center gap-4">
          <select
            onChange={(e) => handleStatus(e.target.value)}
            defaultValue={orderData?.status}
            disabled={orderData.status === "Delivered"}
            required
            className="p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 transition duration-200 bg-white text-emerald-600"
            name="status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
