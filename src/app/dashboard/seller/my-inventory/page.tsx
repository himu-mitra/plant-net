"use client"

import PlantDataRow from "@/components/Dashboard/TableRows/PlantDataRow";
import { useRouter } from "next/navigation";

const MyInventory = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle navigation
  const handleAddPlant = () => {
    router.push("/dashboard/seller/add-plant"); // Navigate to the desired path
  };
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-3xl font-semibold text-center text-white mb-8 bg-emerald-500 py-3 rounded-xl">
            My Inventory
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between items-center py-4 px-6 border-b">
              <button onClick={handleAddPlant} className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                Add New Plant
              </button>
            </div>
            <div className="overflow-x-auto"> {/* ✅ Scrollbar added */}
              <table className="min-w-full border-collapse w-full">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Delete</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Update</th>
                  </tr>
                </thead>
                <tbody>
                  <PlantDataRow />
                  {/* Add more PlantDataRow components if needed */}
                </tbody>
              </table>
            </div> {/* ✅ Scrollbar wrapper ends here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInventory;
