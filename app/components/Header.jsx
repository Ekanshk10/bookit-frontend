import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="headerBackground w-full flex flex-col md:flex-row md:justify-between md:items-center px-8 py-4 gap-4 md:gap-0 text-black shadow-[0_2px_16px_0_#0000001A]">
      <div className="w-[100px] h-[55px] flex items-center mx-auto md:mx-0">
        <Image
          src="/logo.webp"
          alt="Company Logo"
          width={100}
          height={55}
          priority
        />
      </div>
      <div className="flex w-full md:w-[433px] h-[42px] gap-3 justify-center md:justify-end">
        <input
          type="text"
          placeholder="Search experiences"
          className="w-full  md:w-[340px] h-[42px] rounded-sm searchBackground px-4 py-3 font-normal text-sm leading-4.5 focus:placeholder:text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <button className="buttonColor py-3 px-5 w-[87px] h-[42px] font-medium rounded-lg text-sm leading-4.5 hover:bg-amber-400 ease-in-out duration-300 cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
