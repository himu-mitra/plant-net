"use client";

import Banner from "@/components/home/Banner";
import Plants from "@/components/home/Plants";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto my-5">
      <Banner></Banner>
      <Plants />
    </div>
  );
}
