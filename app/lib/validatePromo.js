import { axiosInstance } from "./axiosInstance.js";

export async function validatePromo(promo, bookingValue) {
  try {
    const response = await axiosInstance.post("/promo/validate", {
      code: promo,
      bookingValue,
    });

    return { success: true, data: response.data }; 
  } catch (error) {
    if (error.response) {
      console.error(" Promo validation error:", error.response.data.message);
       return { success: false, message: error.response.data.message };
    } else {
    return { success: false, message: "Something went wrong. Please try again." };
    }
  }
}
