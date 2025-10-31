"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SummaryCard from "./SummaryCard";
import SlotSelection from "./SlotSelection";
import { useState } from "react";

const ClientWrapper = ({ data, slotsAvaliable, packagePrice }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="mx-auto flex textColor md:w-fit flex-col gap-6 px-4 mb-60">
      <Link className="flex gap-1 mt-6" href={"/"}>
        <ArrowLeft size={20} className="textColor" />
        <h4 className="text-[14px] font-medium">Details</h4>
      </Link>

      <div className="flex flex-col gap-10 xl:flex-row items-center xl:items-start">
        <div className="lg:w-[765px] h-full flex flex-col gap-8" id="maindiv">
          <div className="relative w-full h-[381px] rounded-xl">
            <Image
              src={data.imageUrl || "/fallback.webp"}
              alt={"Experience Image"}
              fill
              priority
              loading="eager"
              className="rounded-xl"
              sizes="100"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-[24px] font-medium leading-8">
                {data.experienceName} - {data.location}
              </h4>
              <p className="text-[16px] descriptionColor font-normal leading-6">
                {data.description}
              </p>
            </div>

            <div className="flex gap-6 flex-col">
              <SlotSelection
                slots={slotsAvaliable}
                onSlotSelect={setSelectedSlot}
              />
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-lg">About</h3>
                <div className="aboutCard text-xs font-normal px-2 py-2 rounded-sm">
                  {data.about}
                  {console.log("about> ", data)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SummaryCard
          packagePrice={packagePrice}
          id={data.id}
          locationName = {data.location}
          selectedSlot={selectedSlot}
        />
      </div>
    </div>
  );
};

export default ClientWrapper;
