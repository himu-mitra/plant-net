"use client";

import coverImg from "@/assets/images/cover.jpg";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import avatarImg from "@/assets/images/placeholder.jpg";

const Profile = () => {
  const { sessionUser } = useAuth();
  console.log(sessionUser);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <Image
          src={coverImg}
          alt="cover photo"
          width={566}
          height={224}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <Image
              alt="profile"
              src={sessionUser?.image || avatarImg}
              width={96}
              height={96}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full mt-1">
            {sessionUser?.role.toUpperCase()}
          </p>
          {/* <p className="mt-2 text-xl font-medium text-gray-800 ">User Id:</p> */}
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name:
                <span className="font-bold text-black">
                  {sessionUser?.name}
                </span>
              </p>
              <p className="flex flex-col">
                Email:
                <span className="font-bold text-black ">
                  {sessionUser?.email}
                </span>
              </p>

              <div className="mt-3 md:mt-0">
                <button className="bg-lime-500 px-9 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800 block mb-1">
                  Update Profile
                </button>
                <button className="bg-lime-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-lime-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
