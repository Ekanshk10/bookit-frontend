import { axiosInstance } from "./axiosInstance";

export async function getExperienceById(id) {
  try {

     if (!id || isNaN(id)) {
      throw new Error("Invalid experience Id.");
    }

    const response = await axiosInstance.get(`/experiences/${id}`);
    const data = response?.data?.data;

    if (!data) {
      throw new Error("Experinces Details are not found");
    }
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Experience not found. It may have been removed.");
    }
    console.error("Error fetching experience:", error);
    throw new Error(
      "Unable to load Experience Details. Please try again later aftere some time!"
    );
  }
}
