import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { Fragment, useState } from "react";
import Button from "../shared/Button";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";

const PurchaseModal = ({ closeModal, isOpen, plant, refetch }: any) => {
  const router = useRouter()
  const { sessionUser } = useAuth();
  const { category, price, name, seller, quantity, _id } = plant;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [purchaseInfo, setPurchaseInfo] = useState({
    customer: {
      name: sessionUser?.name,
      email: sessionUser?.email,
      image: sessionUser?.image,
    },
    plantId: _id,
    price: totalPrice,
    quantity: totalQuantity,
    seller: seller?.email,
    address: "",
    status: "Pending",
  });

  function handleQuantity(value: number) {
    if (value > quantity) {
      setTotalQuantity(quantity);
      return toast.error("Quantity exceeds available stock");
    }
    if (value < 1) {
      setTotalQuantity(1);
      return toast.error("Quantity can't be less than 1");
    }
    setTotalQuantity(value);
    setTotalPrice(value * price);
    setPurchaseInfo((prev) => ({
      ...prev,
      quantity: value,
      price: value * price,
      createdAt: new Date()
    }));
  }

  async function handlePurchase() {
    try {
      await axios.post("/api/order", purchaseInfo);
      await axios.patch(`/api/dashboard/seller/update-plant-quentity/${_id}`, {
        quantityToUpdate: totalQuantity,
        status: "decrease"
      });
      refetch();
      router.push("/dashboard/customer/my-orders")
      toast.success("Order Successful!");
    } catch (error) {
      console.log(error);
    } finally {
      closeModal();
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
      <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl transform transition-all">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold text-center text-gray-800"
              >
                Confirm Your Purchase
              </DialogTitle>

              <div className="mt-4 space-y-3 text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Plant:</span>{" "}
                  {name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Category:</span>{" "}
                  {category}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Customer:</span>{" "}
                  {sessionUser?.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Price:</span> $
                  {price}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    Available Quantity:
                  </span>{" "}
                  {quantity}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="quantity"
                    className="text-gray-700 font-medium"
                  >
                    Quantity:
                  </label>
                  <input
                    value={totalQuantity}
                    onChange={(e) => handleQuantity(parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    name="quantity"
                    id="quantity"
                    type="number"
                    min="1"
                    max={quantity}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="address"
                    className="text-gray-700 font-medium"
                  >
                    Address:
                  </label>
                  <input
                    onChange={(e) =>
                      setPurchaseInfo((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg text-gray-800 border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    name="address"
                    id="address"
                    type="text"
                    placeholder="Enter your address..."
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center gap-5">
                <button
                  onClick={closeModal}
                  className="px-4 py-3 rounded-lg text-red-900 bg-red-100 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
                <Button
                  onClick={handlePurchase}
                  label={`Pay $${totalPrice}`}
                  disabled={
                    !sessionUser ||
                    totalQuantity <= 0 ||
                    purchaseInfo.address === ""
                  }
                  className="px-6 py-3 text-white rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
