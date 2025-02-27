import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

import UpdatePlantForm from "../Form/UpdatePlantForm";

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen }: any) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Plant Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  <UpdatePlantForm />
                </div>
                <hr className="mt-3 " />
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="w-full mx-2 inline-flex justify-center rounded-md border border-transparent px-4 py-3.5 relative text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition shadow-md"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdatePlantModal;
