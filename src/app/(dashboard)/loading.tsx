import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="text-4xl bg-gray-100 rounded-2xl w-screen h-screen flex justify-center items-center my-auto">
      <LoaderCircle size={60} className="text-sky-500 animate-spin " />
    </div>
  );
};

export default loading;
