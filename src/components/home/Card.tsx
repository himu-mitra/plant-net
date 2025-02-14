import Image from "next/image";
import Link from "next/link";

const Card = ({ plant }: any) => {
  const { name, category, quantity, price, image, _id } = plant || {};

  return (
    <Link
      href={`/plant/${_id}`}
      className="col-span-1 cursor-pointer group shadow-lg rounded-xl transition-transform transform hover:scale-105"
    >
      <div className="flex flex-col gap-3 w-full p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all">
        {/* Plant Image */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300"
            src={image || "/default-plant.jpg"} // Fallback to default image
            alt="Plant Image"
            height={184}
            width={184}
          />
        </div>

        {/* Plant Name */}
        <div className="font-semibold text-xl text-gray-800 truncate">
          {name}
        </div>

        {/* Category */}
        <div className="font-medium text-gray-500 text-sm">{category}</div>

        {/* Quantity */}
        <div className="font-medium text-gray-600 text-sm">
          Available: {quantity} left
        </div>

        {/* Price with new color */}
        <div className="text-green-600 text-xl font-semibold">
          Price: {price} Tk
        </div>
      </div>
    </Link>
  );
};

export default Card;
