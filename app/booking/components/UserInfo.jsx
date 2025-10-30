"use client";
import React, { useEffect, useMemo, useState } from "react";
import FinalSummaryCard from "./FinalSummaryCard";
import { toast } from "react-toastify";
import { validatePromo } from "@/app/lib/validatePromo";
import { Loader, Loader2 } from "lucide-react";

const UserInfo = ({ bookingData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [promoDetails, setPromoDetails] = useState(null);

  const [error, setErrors] = useState({
    name: "",
    email: "",
    checked: "",
  });

  const { total, taxes } = bookingData;

  const actualPrice = total - taxes;

  const userDate = useMemo(
    () => ({
      name,
      email,
      promoDetails,
      isChecked,
    }),
    [name, email, promoDetails, isChecked]
  );

  const validateName = (value) => {
    if (!value.trim()) return "Name is Required, Please Enter the name";
    if (value.length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) return "Enter a valid email";
    return "";
  };

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      name: validateName(name),
    }));
  }, [name]);

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(email),
    }));
  }, [email]);

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      checked: isChecked ? "" : "You must agree to continue",
    }));
  }, [isChecked]);

  const handleApplyPromo = async () => {
    setIsLoading(true);

    try {
      if (!promo.trim()) {
        toast.info("Please enter a promo code before applying");
        return;
      }
      if (!actualPrice) {
        toast.info("Something is wrong with total amount");
        return;
      }

      const res = await validatePromo(promo, actualPrice);

      console.log("res:", res.data);

      if (res.success) {
        toast.success("Promo Code applied successfully");
         setPromoDetails(res.data);
      } else {
        toast.error(res.message || "Failed to apply promo code");
        setPromoDetails("");
      }
    } catch (error) {
      console.log("Error in validating promo code: ", error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row">
      <div className="summaryCard lg:w-[765px]  h-[198px] rounded-xl p-5 flex flex-col gap-4">
        <div className="h-[68px] flex gap-6 items-center justify-between">
          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="font-normal text-sm text-[#5B5B5B]">Full Name</h3>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputTag rounded-md w-full h-[42px] py-3 px-4 mb-px"
                placeholder="Your Name"
              />
              {error.name && (
                <p className="text-[#FF4C0A] text-xs">{error.name}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <h3 className="font-normal text-sm text-[#5B5B5B]">Email</h3>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputTag rounded-md w-full h-[42px] py-3 px-4 mb-px"
                placeholder="Email"
              />
              {error.email && (
                <p className="text-[#FF4C0A] text-xs">{error.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="h-[42px]">
          <div className="flex gap-4">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="inputTag rounded-md w-full h-[42px] py-3 px-4"
              placeholder="Promo Code"
            />
            <button
              disabled={isLoading}
              className="text-white bg-[#161616] rounded-lg w-[71px] text-sm font-medium text-center cursor-pointer"
              onClick={handleApplyPromo}
            >
              {isLoading ? (
                <Loader2
                  size={20}
                  className="text-white animate-spin mx-auto"
                />
              ) : (
                "Apply"
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="h-4 flex gap-2 mb-px">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-[#161616] cursor-pointer"
            />
            <h3 className="text-[#5B5B5B] text-xs font-normal ">
              I agree to the terms and safety policy
            </h3>
          </div>
          {error.checked && (
            <p className="text-[#FF4C0A] text-xs">{error.checked}</p>
          )}
        </div>
      </div>

      <FinalSummaryCard bookingData={bookingData} userData={userDate} error= {error}/>
    </div>
  );
};

export default UserInfo;
