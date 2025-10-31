"use client";
import { useState } from "react";
import ExperincesCard from "./ExperincesCard";

export default function CardsDiv({ data, search }) {
  const [page, setPage] = useState(1);
  const maxItems = 8; 

  const searchTerm = search?.trim();
  let filtered = [];

  if (!Array.isArray(data) || data.length === 0)
    return <p className="textColor text-center mt-80">No experiences found!</p>;

  if (!searchTerm) filtered = data;
  else {
    const sanitizeSearch = searchTerm.toLowerCase();
    filtered = data.filter((item) =>
      item.location?.toLowerCase().includes(sanitizeSearch)
    );
  }

  if (filtered.length === 0)
    return <p className="textColor text-center mt-80">No experiences found!</p>;
  
  const totalPages = Math.ceil(filtered.length / maxItems);
  const start = (page - 1) * maxItems;
  const paginatedData = filtered.slice(start, start + maxItems);

  return (
    <div className="flex flex-col items-center gap-6">

      {/* displaying 8 cards per page for better UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:w-fit lg:grid-cols-4 gap-6 p-6">
        {paginatedData.map((experience) => (
          <ExperincesCard key={experience.id} experience={experience} />
        ))}
      </div>

      {/* buttons to change page */}
      <div className="flex items-center gap-4 mb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded disabled:opacity-50 textColor buttonColor cursor-pointer hover:bg-amber-400 ease-in-out duration-300 "
        >
          Prev
        </button>

        <span className="text-sm textColor">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2  rounded disabled:opacity-50 textColor buttonColor cursor-pointer hover:bg-amber-400 ease-in-out duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
