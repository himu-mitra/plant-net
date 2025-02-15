import { TbFidgetSpinner } from "react-icons/tb";

const AddPlantForm = ({
  handleSubmit,
  uploadButtonText,
  setUploadButtonText,
  loading,
}: any) => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-10 bg-emerald-500 py-3 rounded-xl">Add a New Plant</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Plant Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                name="name"
                id="name"
                type="text"
                placeholder="Plant Name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-700 font-medium">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                name="category"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-700 font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block w-full h-32 px-4 py-3 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                name="description"
              ></textarea>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price & Quantity */}
            <div className="flex gap-6">
              {/* Price */}
              <div className="space-y-1 text-sm flex-1">
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Price ($)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm flex-1">
                <label htmlFor="quantity" className="block text-gray-700 font-medium">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-1 text-sm">
              <label htmlFor="image" className="block text-gray-700 font-medium">
                Upload Plant Image
              </label>
              <div className="file_upload px-5 py-4 bg-white border-4 border-dotted border-emerald-500 rounded-lg text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const fileName = e.target.files[0].name;
                        const shortName = fileName.length > 25 ? fileName.slice(0, 25) + "..." : fileName;
                        setUploadButtonText(shortName);
                      }
                    }}
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    required
                    hidden
                  />
                  <div className="bg-emerald-500 text-white rounded-lg p-2 px-4 cursor-pointer hover:bg-emerald-600">
                    {uploadButtonText}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-emerald-500 hover:bg-emerald-600 rounded-md shadow-md font-semibold mt-6"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
