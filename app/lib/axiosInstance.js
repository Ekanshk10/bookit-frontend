import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
})