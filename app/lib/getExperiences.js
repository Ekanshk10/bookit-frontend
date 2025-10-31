import { axiosInstance } from "./axiosInstance";

export async function getExperiences() {
  try {
    const response = await axiosInstance.get("/experiences");
    const data = response?.data?.data;
    if (!data) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    console.log("Error fetching experiences:", error.message);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
