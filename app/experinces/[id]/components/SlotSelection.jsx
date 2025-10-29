"use client";
import React, { useEffect, useState } from "react";
import { format, addDays, setHours, setMinutes } from "date-fns";

const SlotSelection = ({ slots = [], onSlotSelect }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filteredTimeSlots, setfilteredTimeSlots] = useState([]);

  useEffect(() => {
    const currentDate = new Date();

    const availableDates = Array.from({ length: 5 }, (_, i) =>
      addDays(currentDate, i)
    );
    setDates(availableDates);
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    const selectedDateObj = new Date(selectedDate);

    // Filter slots that belong to the selected date
    const slotsForDate = slots.filter((slot) => {
      const slotDate = new Date(slot.date);
      return (
        slotDate.getDate() === selectedDateObj.getDate() &&
        slotDate.getMonth() === selectedDateObj.getMonth() &&
        slotDate.getFullYear() === selectedDateObj.getFullYear()
      );
    });

    const defaultTimeSlot = [7, 9, 11, 13];

    const finalTimeSlots = defaultTimeSlot.map((h) => {
      const dateTime = setMinutes(setHours(selectedDateObj, h), 0);

      // finding slot avalible in the data in database for dynamic slot value
      const existingTimeSlot = slotsForDate.find(
        (slot) => new Date(slot.date).getHours() === h
      );

      //if no slot found in backend added fallback slot to keep consistencies
      return (
        existingTimeSlot || {
          date: dateTime,
          avaliableSlots: 10,
          totalSlots: 10,
        }
      );
    });

    setfilteredTimeSlots(finalTimeSlots);
  }, [selectedDate, slots]);

  //   console.log(dates);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const combined = {
      date,
      time: selectedTime,
    };
    onSlotSelect?.(combined);
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
    const combined = {
      date: selectedDate,
      time: slot,
    };
    onSlotSelect?.(combined);
  };

  return (
    <div className="rounded-lg flex flex-col gap-6">
      {/* Date Selection badges */}
      <div>
        <h3 className="font-medium mb-3 text-lg">Choose Date</h3>
        <div className="flex gap-3 flex-wrap">
          {dates.map((date, index) => {
            const formattedDate = format(date, "MMM d");
            const isSelected =
              selectedDate &&
              format(new Date(selectedDate), "MMM d") === formattedDate;

            return (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`px-4 py-2 rounded-md font-normal text-[14px] ${
                  isSelected
                    ? "buttonColor textColor border-none"
                    : "hover:bg-gray-200 border notSelected"
                }`}
              >
                {formattedDate}
              </button>
            );
          })}
        </div>
      </div>
      {/* Time selection badges */}
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-lg">Choose time</h3>
        <div className="flex gap-3 flex-wrap">
          {filteredTimeSlots.map((slot, index) => {
            const timeLabel = format(new Date(slot.date), "h:mm a");
            const isselectedTime =
              selectedTime &&
              format(new Date(selectedTime.date), "h:mm a") === timeLabel;
            const isSlotZero = slot.avaliableSlots === 0;
            return (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot)}
                className={`border rounded-md px-4 py-2 flex justify-between items-center transition gap-1.5 ${
                  isselectedTime
                    ? "buttonColor textColor border-none"
                    : isSlotZero
                    ? "soldOut border-none"
                    : " notSelected hover:bg-gray-100 bg-white"
                } `}
                disabled={isSlotZero}
              >
                <span
                  className={`text-sm font-normal ${
                    isSlotZero ? "text-[#838383]" : "text-sm font-normal "
                  }`}
                >
                  {timeLabel}
                </span>
                <span
                  className={`${
                    isSlotZero
                      ? "text-[#6A6A6A] text-[10px] font-medium"
                      : "text-[10px] text-[#FF4C0A]"
                  }`}
                >
                  {isSlotZero ? "Sold out" : `${slot.avaliableSlots} left`}
                </span>
              </button>
            );
          })}
        </div>
        <p className="notSelected text-[12px] leading-4">
          All times are in IST (GMT +5:30)
        </p>
      </div>
      {selectedTime && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <b>Selected Date:</b> {format(selectedDate, "MMM d, yyyy")}
          </p>
          <p>
            <b>Selected Time:</b>{" "}
            {format(new Date(selectedTime.date), "h:mm a")}
          </p>
        </div>
      )}
    </div>
  );
};

export default SlotSelection;
