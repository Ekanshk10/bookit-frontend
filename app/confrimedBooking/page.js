"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();

  const [id, setId] = useState(null);

  useEffect(() => {
    const bookingId = sessionStorage.getItem("bookingId");
    if (!bookingId) {
      toast.error("Please Create a booking to access this page");
      router.push("/");
    } else {
      setId(bookingId);
    }
  }, [router]);

  if (!id) return null;

  return (
    <div className="mx-auto flex flex-col items-center justify-center w-full gap-7 mt-8">
      <Image
        src={"/tick.svg"}
        height={80}
        width={80}
        sizes="100"
        alt="tick-svg"
        priority
      />
      <div className="text-center">
        <h3 className="text-[32px] textColor font-medium">Booking Confrimed</h3>
        <h3 className="text-[20px] font-normal text-[#656565]">Ref ID: {id}</h3>
      </div>
      <button
        className="w-[138px] h-9 bg-[#E3E3E3] text-[#656565] rounded-sm cursor-pointer"
        onClick={() => {
          router.push("/");
          sessionStorage.removeItem("bookingId");
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default page;
