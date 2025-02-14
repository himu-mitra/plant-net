"use client";

import { useState } from "react";
import Heading from "@/components/shared/Heading";
import Button from "@/components/shared/Button";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import PurchaseModal from "@/components/Modal/PurchaseModal";
import useAuth from "@/hooks/useAuth";
// import PurchaseModal from "@/components/Modal/PurchaseModal";

const PlantDetails = () => {
  const { sessionUser } = useAuth();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: plant = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/get-single-plant/${id}`);
      return data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const { category, description, image, price, name, seller, quantity } =
    plant || {};

  return (
    <div className="mx-auto flex flex-col lg:flex-row justify-between w-11/12 gap-12 my-5">
      {/* Header */}
      <div className="flex-1 ">
        <Image
          src={image}
          alt="header image"
          layout="responsive"
          width={600}
          height={400}
          className="object-cover rounded-xl"
        />
      </div>
      <div className="md:gap-10 flex-1">
        {/* Plant Info */}
        <Heading title={name} subtitle={`Category: ${category}`} />
        <hr className="my-6" />
        <div
          className="
          text-lg font-light text-neutral-500"
        >
          {description}
        </div>
        <hr className="my-6" />

        <div
          className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
        >
          <div>Seller: {seller?.name}</div>

          <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            referrerPolicy="no-referrer"
            src={seller?.image}
          />
        </div>
        <hr className="my-6" />
        <div>
          <p
            className="
                gap-4 
                font-light
                text-neutral-500
              "
          >
            Quantity: {quantity} Units Left Only!
          </p>
        </div>
        <hr className="my-6" />
        <div className="flex justify-between">
          <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
          <div>
            <Button
              onClick={() => setIsOpen(true)}
              label={quantity > 0 ? "Buy Now" : "Out of Stock"}
              disabled={!sessionUser || quantity <= 0}
            />
          </div>
        </div>
        <hr className="my-6" />

        <PurchaseModal
          refetch={refetch}
          plant={plant}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

export default PlantDetails;
