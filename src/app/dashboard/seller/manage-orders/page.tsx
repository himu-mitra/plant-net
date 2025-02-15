"use client";

import SellerOrderDataRow from "@/components/Dashboard/TableRows/SellerOrderDataRow";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageOrders = () => {
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-orders"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/dashboard/manage-orders`);
      return data;
    },
  });

  // if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8 bg-emerald-500 py-3 rounded-xl">
          Manage Orders
        </h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto"> {/* Make the table scrollable */}
            <table className="min-w-full border-collapse w-full">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <SellerOrderDataRow></SellerOrderDataRow>
                {/* {orders.length > 0 ? (
                  orders.map((orderData: any) => (
                    <SellerOrderDataRow key={orderData._id} orderData={orderData} refetch={refetch} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500 font-medium">
                      No orders found
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
