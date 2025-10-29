import { axiosInstance } from "./axiosInstance";

export async function getExperiences() {
  try {
    const response = await axiosInstance.get("/experiences")
    const data = response?.data?.data;
    if (!data) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching experiences:", error.message);
    throw new Error("Unable to load experiences. Please try again later aftere some time!");
  }
}
