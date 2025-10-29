"use client";
import React from "react";
import { useFetch } from "../hooks/useFetch.js";
import Image from "next/image.js";
const CardsDiv = () => {
  const { data, loading, error } = useFetch("/experiences");

  if (loading) return <p className="text-background">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <ul className="text-black">
        {data.map((experience) => (
          <li key={experience.id} className="border-b py-2">
            {experience.location}
            <Image src={experience.imageUrl} width={100} height={100} alt="images"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardsDiv;
