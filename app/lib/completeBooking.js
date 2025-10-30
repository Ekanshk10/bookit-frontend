import { axiosInstance } from "./axiosInstance.js";

export async function compeleteBooking(data) {
  try {
    console.log("data: ", data);
    const response = await axiosInstance.post("/bookings", {
      data,
    });

    if (!response)
      return { success: false, message: "Booking Creation failed" };

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      console.error("Error Creating Booking:", error.response.data.message);
      return {
        success: false,
        message: error.response.data.message,
      };
    } else {
      console.error("Network error:", error.message);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }
}
