import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function BigLoader() {
  return (
    <div className="w-full h-screen flex-colo">
      <div className="flex flex-col items-center justify-center">
        <BiLoaderCircle className="animate-spin text-subMain text-6xl" />
        <h1 className="text-white text-2xl font-bold mt-4">Loading...</h1>
        <div className="w-48 h-1 bg-dry rounded-full mt-3 overflow-hidden">
          <div className="w-full h-full bg-subMain animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default BigLoader;
