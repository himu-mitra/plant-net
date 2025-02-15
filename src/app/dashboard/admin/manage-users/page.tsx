import UserDataRow from "@/components/Dashboard/TableRows/UserDataRow";

const ManageUsers = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-3xl font-semibold text-center text-white mb-8 bg-emerald-500 py-3 rounded-xl">
            Manage Users
          </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse w-full">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <UserDataRow />
                  {/* Add more UserDataRow components if needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
