import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = ({ children }: any) => {
  return (
    <div className="relative min-h-screen md:flex bg-white">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
