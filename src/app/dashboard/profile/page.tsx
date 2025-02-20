"use client";

import coverImg from "@/assets/images/cover.jpg";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import avatarImg from "@/assets/images/placeholder.jpg";

const Profile = () => {
  const { sessionUser } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-2xl">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl">
        {/* Cover Image */}
        <div className="relative">
          <Image
            src={coverImg}
            alt="Cover Photo"
            width={800}
            height={300}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Image
              src={sessionUser?.image || avatarImg}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mt-14 p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {sessionUser?.name || "User Name"}
          </h2>
          <p className="text-gray-500">
            {sessionUser?.email || "user@example.com"}
          </p>

          <span className="mt-2 px-4 py-1 text-sm font-medium text-white bg-emerald-500 rounded-full">
            {sessionUser?.role ? sessionUser.role : "USER"}
          </span>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition">
              Update Profile
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
