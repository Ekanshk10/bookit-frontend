"use client";

import { useEffect, useState } from "react";
import { getExperienceById } from "@/app/lib/getExperienceById";
import ClientWrapper from "./ClientWrapper.jsx";

const MainDetails = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await getExperienceById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading experience...</p>;
  if (!data) return <p className="text-center mt-10">Experience not found.</p>;

  return (
    <ClientWrapper
      data={data}
      slotsAvaliable={data.slots}
      packagePrice={data.price}
    />
  );
};

export default MainDetails;
