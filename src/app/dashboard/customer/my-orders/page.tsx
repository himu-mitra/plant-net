"use client";

import CustomerOrderDataRow from "@/components/Dashboard/TableRows/CustomerOrderDataRow";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyOrders = () => {
  const { sessionUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", sessionUser?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/dashboard/customer-orders/${sessionUser?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-8 bg-emerald-500 py-3 rounded-xl">
          My Orders
        </h2>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto"> {/* ✅ Scrollbar added */}
            <table className="min-w-full border-collapse w-full">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((orderData: any) => (
                    <CustomerOrderDataRow
                      key={orderData._id}
                      orderData={orderData}
                      refetch={refetch}
                      isLoading={isLoading}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-gray-500 font-medium"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div> {/* ✅ Scrollbar wrapper ends here */}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
