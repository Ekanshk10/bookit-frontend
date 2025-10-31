"use client";
import React, { useEffect, useState } from "react";
import { format, addDays, isSameDay } from "date-fns";

const SLOT_HOURS = [7, 9, 11, 13];
const DISPLAY_TIME_LABELS = ["07:00 AM", "09:00 AM", "11:00 AM", "01:00 PM"];

const SlotSelection = ({ slots = [], onSlotSelect }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);

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

    // Filter slots only for selected date
    const slotsForSelectedDate = slots.filter((slot) =>
      isSameDay(new Date(slot.date), selectedDate)
    );

    console.log("slotsselecte: ", slotsForSelectedDate);
    const finalTimeSlots = SLOT_HOURS.map((hour, idx) => {
      const timeLabel = DISPLAY_TIME_LABELS[idx];

      const existingSlot = slotsForSelectedDate.find(
        (slot) => slot.time === timeLabel
      );

      let slotDateTime = new Date(selectedDate);
      slotDateTime.setHours(hour, 0, 0, 0);

      console.log("existingSlot: ", existingSlot);
      return (
        existingSlot || {
          date: slotDateTime.toISOString(),
          time: timeLabel, // ✅ must attach time string
          avaliableSlots: 10,
          totalSlots: 10,
        }
      );
    });

    console.log("finaltimeslot: ",finalTimeSlots);

    setFilteredTimeSlots(finalTimeSlots);
    setSelectedTime(null);
    onSlotSelect?.({ date: selectedDate, time: null });
  }, [selectedDate, slots]);

  const handleDateSelect = (date) => {
    if (!selectedDate || !isSameDay(selectedDate, date)) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (slot) => {
    setSelectedTime(slot);
    onSlotSelect?.({
      date: selectedDate,
      time: slot.time, 
      slotDate: slot.date, 
    });
  };

  return (
    <div className="rounded-lg flex flex-col gap-6">
      <div>
        <h3 className="font-medium mb-3 text-lg">Choose Date</h3>
        <div className="flex gap-3 flex-wrap">
          {dates.map((date, index) => {
            const formattedDate = format(date, "MMM d");
            const isSelected = selectedDate && isSameDay(selectedDate, date);

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
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-lg">Choose time</h3>
        <div className="flex gap-3 flex-wrap">
          {filteredTimeSlots.map((slot, index) => {
            const timeLabel = DISPLAY_TIME_LABELS[index];

            const isselectedTime =
              selectedTime && selectedTime.date === slot.date;

            const isSlotZero = slot.avaliableSlots === 0;
            const slotTime = new Date(slot.date);
            const now = new Date();
            const isPast = slotTime < now;

            const isDisabled = isSlotZero || isPast;
            const className = `border rounded-md px-4 py-2 flex justify-between items-center transition gap-1.5 ${
              isselectedTime
                ? "buttonColor textColor border-none"
                : isDisabled
                ? "soldOut border-none cursor-not-allowed text-[#838383]"
                : "notSelected bg-white hover:bg-gray-100"
            }`;

            return (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot)}
                className={className}
                disabled={isDisabled}
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
                  {isSlotZero
                    ? "Sold out"
                    : isPast
                    ? ""
                    : `${slot.avaliableSlots} left`}
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
            {selectedTime.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default SlotSelection;
