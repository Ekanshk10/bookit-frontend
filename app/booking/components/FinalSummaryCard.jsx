"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { compeleteBooking } from "@/app/lib/completeBooking.js";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
const FinalSummaryCard = ({ bookingData, userData, error }) => {
  const router = useRouter();

  const [isConfirming, setIsConfirming] = useState(false);
  const [inputValues, setInputValues] = useState(false);
  const {
    packagePrice,
    quantity,
    subtotal,
    taxes,
    total,
    experienceName,
    experinceId,
    slot,
  } = bookingData;
  const { name, email, promoDetails, isChecked } = userData;

  console.log("promo: ", promoDetails);

  //   console.log(promoCode)

  const discountedPrice =
    parseFloat(promoDetails?.data?.finalPrice) + parseFloat(taxes) || total;

  const dateString = format(new Date(slot), "yyyy-MM-dd");
  function toISTConditional(slot) {
    const date = new Date(slot);

    // Extract hour in 12hr format
    const hour = parseInt(format(date, "h"));

    const allowedHours = [7, 9, 11, 1];

    // If time is NOT allowed → add +5h30m
    if (!allowedHours.includes(hour)) {
      date.setHours(date.getHours() + 5);
      date.setMinutes(date.getMinutes() + 30);
    }

    return format(date, "hh:mm a");
  }

  // Usage
  const timeString = toISTConditional(slot);

  useEffect(() => {
    if (name && email && isChecked && !error.name && !error.email) {
      setInputValues(true);
    } else {
      setInputValues(false);
    }
  }, [isChecked, name, email, error.name, error.email]);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      console.log("slot: ", slot);
      const compeleteBookingdata = {
        name,
        email,
        codeId: promoDetails?.data?.codeId,
        bookingDate: new Date().toISOString(),
        finalPrice: discountedPrice,
        exprienceId: experinceId,
        slotTime: slot,
        quantity,
      };

      const res = await compeleteBooking(compeleteBookingdata);

      console.log("res:", res.data);

      if (res.success) {
        // console.log(res.success);
        toast.success("Booking Successful ! Redirecting...");
        sessionStorage.removeItem("bookingData");
        sessionStorage.setItem(
          "bookingId",
          JSON.stringify(res?.data?.data?.id)
        );
        setTimeout(() => {
          router.push("/confrimedBooking");
        }, 2000);
      } else {
        toast.error(res.message);
      }

      console.log(compeleteBookingdata);
    } catch (error) {
      console.log("something is wrong:", error.message);
      toast.error("Something went wrong");
    } finally {
      setIsConfirming(false);
    }
  };
  return (
    <div className=" w-full md:w-[80%] xl:w-[387px] h-[fit] summaryCard rounded-xl p-6 gap-6 flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Experience</h3>
            <h3 className="text-[18px] textColor font-normal">
              {experienceName}
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Date</h3>
            <h3 className="text-[18px] textColor font-normal">{dateString}</h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Time</h3>
            <h3 className="text-[18px] textColor font-normal">{timeString}</h3>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Quantity</h3>
            <h3 className="text-[18px] textColor font-normal">{quantity}</h3>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Subtotal</h3>
            <h3 className="text-[18px] textColor font-normal">₹{subtotal}</h3>
          </div>
          {promoDetails && (
            <div className="flex justify-between items-center">
              <h3 className="text-[16px] summaryText font-normal">
                Promo (
                {promoDetails?.data?.discount &&
                promoDetails?.data?.discountType === "FLAT"
                  ? `₹${promoDetails?.data.discountValue}`
                  : `%${promoDetails?.data.discountValue}`}
                )
              </h3>
              <h3 className="text-[18px] text-green-600 font-normal">
                ₹{promoDetails?.data?.discount}
              </h3>
            </div>
          )}
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] summaryText font-normal">Taxes</h3>
            <h3 className="text-[18px] textColor font-normal">₹{taxes}</h3>
          </div>
        </div>

        {/* Total */}
        <hr className="h-px bg-[#D9D9D9] border-0 mt-1" />
        <div className="h-6 flex justify-between pr-2">
          <h3 className="textColor text-[20px]  font-medium">Total</h3>
          {/* <h3 className="textColor text-[20px]  font-medium">₹{total}</h3> */}

          {promoDetails ? (
            <h3 className="textColor text-[20px]  font-medium">
              ₹{discountedPrice.toFixed(2)}
            </h3>
          ) : (
            <h3 className="textColor text-[20px]  font-medium">₹{total}</h3>
          )}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={!inputValues || isConfirming}
        className={`${
          inputValues
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

export default FinalSummaryCard;
