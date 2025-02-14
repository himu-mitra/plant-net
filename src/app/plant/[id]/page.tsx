"use client";

import { useState } from "react";
import Heading from "@/components/shared/Heading";
import Button from "@/components/shared/Button";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import PurchaseModal from "@/components/Modal/PurchaseModal";
import useAuth from "@/hooks/useAuth";

const PlantDetails = () => {
  const router = useRouter();
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

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const { category, description, image, price, name, seller, quantity } = plant || {};

  const handlePurchaseClick = () => {
    if (!sessionUser) {
      const redirectUrl = `/plant/${id}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col lg:flex-row gap-12 bg-white shadow-lg rounded-2xl">
      {/* Plant Image */}
      <div className="flex-1">
        <Image
          src={image}
          alt={name}
          width={600}
          height={400}
          className="object-cover rounded-xl border shadow-sm"
          priority
        />
      </div>

      {/* Plant Details */}
      <div className="flex-1 space-y-6">
        <Heading title={name} subtitle={`Category: ${category}`} />
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>

        {/* Seller Info */}
        <div className="flex items-center gap-3 border p-4 rounded-xl shadow-sm bg-gray-100">
          <Image
            className="rounded-full border"
            height="40"
            width="40"
            alt="Seller Avatar"
            referrerPolicy="no-referrer"
            src={seller?.image}
            priority
          />
          <div>
            <p className="text-lg font-semibold">Seller: {seller?.name}</p>
            <p className="text-sm text-gray-500">Verified Seller</p>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-2xl font-bold text-gray-800">Price: {price} TK</p>
          <p className="text-sm text-gray-500">{quantity} Units Left</p>
        </div>

        {/* Purchase Button */}
        <Button
          onClick={handlePurchaseClick}
          label={quantity > 0 ? "Buy Now" : "Out of Stock"}
          className="w-full py-3 text-lg"
        />
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        refetch={refetch}
        plant={plant}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </div>
  );
};

export default PlantDetails;
