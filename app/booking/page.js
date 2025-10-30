"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UserInfo from "./components/UserInfo";
import SummaryCard from "../experinces/[id]/components/SummaryCard";

export default function BookingPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData");

    if (!storedData) {
      toast.error("Select slot and experince to access booking page");
      router.push("/");
      return;
    }

    setBookingData(JSON.parse(storedData));
  }, [router]);

  if (!bookingData) return null;

  return (
    <div className="mx-auto flex textColor md:w-fit flex-col gap-6 px-4 mb-6">
      <Link className="flex gap-1 mt-6" href={"/"}>
        <ArrowLeft size={20} className="textColor" />
        <h4 className="text-[14px] font-medium">Back</h4>
      </Link>

      <UserInfo bookingData={bookingData} />
    </div>
  );
}
