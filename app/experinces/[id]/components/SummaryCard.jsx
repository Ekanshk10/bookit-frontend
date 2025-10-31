"use client";
import { format, setHours, setMinutes } from "date-fns";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState, useMemo, useEffect, Activity } from "react";
import { toast } from "react-toastify";
const TAX_RATE = 0.05;

const SummaryCard = ({ packagePrice, id, selectedSlot, experienceName }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const avaliableSlots = selectedSlot?.avaliableSlots;
  console.log("avaliable: ", avaliableSlots)

  useEffect(() => {
    if (avaliableSlots !== undefined && quantity > avaliableSlots) {
      toast.warning(`Quantity adjusted to available slots: ${avaliableSlots}`);
      setQuantity(avaliableSlots);
    }
  }, [avaliableSlots, quantity, selectedSlot]);

  // for performance i used useMemo to memoize the calculation
  const { subtotal, taxes, total } = useMemo(() => {
    const calculatedSubtotal = quantity * packagePrice;
    const calculatedTaxes = Math.round(calculatedSubtotal * TAX_RATE);
    const calculatedTotal = calculatedSubtotal + calculatedTaxes;

    return {
      subtotal: calculatedSubtotal,
      taxes: calculatedTaxes,
      total: calculatedTotal,
    };
  }, [quantity, packagePrice]);

  const handleQuantityChange = (changeQty) => {
    setQuantity((prevQty) => {
      const newQty = prevQty + changeQty;
      if (newQty < 1) return 1;
      if (newQty > 10) {
        toast.warning("Maximum 10 Slots can be booked at once!");
        return prevQty;
      }

      if (newQty > avaliableSlots) {
        toast.warning(`Only ${avaliableSlots} Slots available!`);
        return prevQty;
      }

      return newQty;
    });
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    try {
      if (!selectedSlot) {
        toast.error("Please select a slot first");
        return;
      }

      console.log("selectedSlot: ", selectedSlot);

      const bookingData = {
        slotDate: selectedSlot.date, // "2025-11-01"
        slotTime: selectedSlot.time, // "09:00 AM"
        quantity,
        subtotal,
        taxes,
        total,
        bookingDate: new Date().toISOString(),
        experinceId: id,
        experienceName,
      };

      sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
      router.push("/booking");

      console.log(bookingData);
    } catch (error) {
      console.log("something is wrong:", error.message);
      toast.error("Something went wrong");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className=" w-full md:w-[80%] xl:w-[387px] h-[330px] summaryCard rounded-xl p-6 gap-6 flex flex-col">
      <div className="w-full flex flex-col gap-4 ">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2  gap-x-[55%] md:gap-x-[75%]  lg:gap-x-[60%] gap-y-5 w-full h-[130px]">
            <h3 className="text-[16px] summaryText font-normal">Starts at</h3>
            <h3 className="text-[18px] textColor font-normal mx-auto">
              ₹{packagePrice}
            </h3>

            <h3 className="text-[16px] summaryText font-normal">Quantity</h3>

            <div className="flex justify-between items-center gap-2 mx-auto">
              <div className="flex items-center rounded-sm w-14 h-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-4.5 h-4.5 text-sm border border-[#C9C9C9] hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  disabled={quantity <= 1}
                >
                  &minus;
                </button>
                <span className="w-4.5 text-center text-gray-800  font-normal text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-4.5 h-4.5 text-sm border border-[#C9C9C9] hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  &#43;
                </button>
              </div>
            </div>

            <h3 className="text-[16px] summaryText font-normal">Subtotal</h3>
            <h3 className="text-[18px] textColor font-normal mx-auto">
              ₹{subtotal}
            </h3>
            <h3 className="text-[16px] summaryText font-normal">Taxes</h3>
            <h3 className="text-[18px] textColor font-normal mx-auto">
              ₹{taxes}
            </h3>
          </div>
          <hr className="h-px bg-[#D9D9D9] border-0 mt-1" />
        </div>

        <div className="h-6 flex justify-between pr-2">
          <h3 className="textColor text-[20px]  font-medium">Total</h3>
          <h3 className="textColor text-[20px]  font-medium">₹{total}</h3>
        </div>
      </div>

      <button
        onClick={handleConfirm}
      disabled={!selectedSlot || !selectedSlot.time || !selectedSlot.date || isConfirming}

        className={`${
          selectedSlot?.time
            ? "buttonColor textColor  hover:bg-amber-400 transition-all duration-300 cursor-pointer"
            : "summaryNotConfirm cursor-not-allowed"
        } w-full h-11 rounded-lg text-[16px] font-medium`}
      >
        {isConfirming ? (
          <Loader size={20} className="animate-spin mx-auto" />
        ) : (
          "Confrim"
        )}
      </button>
    </div>
  );
};

export default SummaryCard;
