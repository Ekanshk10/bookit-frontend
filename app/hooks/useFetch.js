import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../lib/axiosInstance";

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // function is memozied so that re-renders reduces and imporve performance
  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(endpoint);
      console.log(response);
      const result = response.data?.data ?? response.data;
      setData(result);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error};
};
