"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ExperincesCard = ({ experience }) => {
  return (
    <div
      key={experience.id}
      className="experinceCard rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden md:w-[280px]"
    >
      {/* displaying images of the card and having fallback image if no url presend */}
      <div className="relative w-full h-[170px]">
        <Image
          src={experience.imageUrl || "/fallback.webp"}
          alt={experience.title || "Experience image"}
          fill
          className="object-cover"
          loading="eager"
          sizes="100"
        />
      </div>

      {/* all the details are rendered fot the packages */}

      <div className="px-4 py-3 textColor h-[142px] flex flex-col gap-5">
        <div className="h-[68px] flex gap-3 flex-col">
          <div className="flex justify-between">
            <h4 className="font-medium text-[16px] truncate ">
              {experience.location}
            </h4>
            <div className="w-[74px] h-6 rounded-sm py-1 px-2 badge text-center">
              <h4 className="font-medium text-[11px] truncate">
                {experience.state}
              </h4>
            </div>
          </div>
          <p className="text-xs font-normal descriptionColor leading-4 line-clamp-3">
            {experience.description || "No description available"}
          </p>
        </div>

        <div className="h-[30px] flex justify-between">
          <span className="flex gap-1.5 items-center">
            <h4 className="text-[12px] font-normal">From</h4>
            <span className="text-[20px] font-medium">₹{experience.price}</span>
          </span>
          <Link
            href={`/experinces/${experience.id}`}
            className="w-[99px] h-[30px] flex items-center justify-center rounded-sm py-1.5 px-2 buttonColor text-[14px] font-medium text-center cursor-pointer hover:bg-amber-400 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperincesCard;
