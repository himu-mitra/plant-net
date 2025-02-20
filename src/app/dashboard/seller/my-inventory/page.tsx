"use client";

import PlantDataRow from "@/components/Dashboard/TableRows/PlantDataRow";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const MyInventory = () => {
  const { sessionUser } = useAuth();
  const router = useRouter();
  const handleAddPlant = () => {
    router.push("/dashboard/seller/add-plant");
  };

  const { data: plants = [], refetch } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      if (!sessionUser?.email) return [];
      const { data } = await axios.get(
        `/api/dashboard/seller/get-my-plants/${sessionUser.email}`
      );
      return data;
    },
    enabled: !!sessionUser?.email,
  });
  
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-3xl font-semibold text-center text-white mb-8 bg-emerald-500 py-3 rounded-xl">
            My Inventory
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between items-center py-4 px-6 border-b">
              <button
                onClick={handleAddPlant}
                className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
              >
                Add New Plant
              </button>
            </div>
            <div className="overflow-x-auto">
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
                      Delete
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map((plant: any) => (
                    <PlantDataRow
                      key={plant?._id}
                      plant={plant}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInventory;
