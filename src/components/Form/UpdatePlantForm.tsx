const UpdatePlantForm = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white p-2 rounded-xl">
      <form className="w-full ">
        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              🌿 Plant Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="name"
              id="name"
              type="text"
              placeholder="Enter plant name..."
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-gray-700 font-medium">
              🏷️ Category
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="category"
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Succulent">Succulent</option>
              <option value="Flowering">Flowering</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-gray-700 font-medium">
              📝 Description
            </label>
            <textarea
              id="description"
              placeholder="Write plant description here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="description"
            ></textarea>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="block text-gray-700 font-medium">
                💲 Price
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                name="price"
                id="price"
                type="number"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-gray-700 font-medium">
                📦 Quantity
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                name="quantity"
                id="quantity"
                type="number"
                placeholder="Available quantity"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center border border-gray-300 rounded-md p-4">
            <label className="block text-gray-700 font-medium mb-2">📸 Upload Image</label>
            <label className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
              Choose File
              <input type="file" name="image" id="image" accept="image/*" hidden />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 mt-5 text-center font-medium text-white bg-emerald-500 rounded-md shadow-md hover:bg-emerald-600 transition"
          >
            Update Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
