import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "@/components/Modal/BecomeSellerModal";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sessionUser } = useAuth();
  const closeModal = () => {
    setIsOpen(false);
  };

  async function requestHandler() {
    try {
      const { data } = await axios.patch("/api/dashboard/customer-request", {
        email: sessionUser?.email,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      closeModal();
    }
  }

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Orders"
        address="/dashboard/customer/my-orders"
      />

      {sessionUser?.role === "Customer" && (
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center px-5 py-3 my-3 rounded-lg transition-all duration-300 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 cursor-pointer"
        >
          <GrUserAdmin className="w-5 h-5" />
          <span className="ml-4 font-medium">Become A Seller</span>
        </div>
      )}

      <BecomeSellerModal
        closeModal={closeModal}
        isOpen={isOpen}
        requestHandler={requestHandler}
      />
    </>
  );
};

export default CustomerMenu;
