import React from "react";

const CardLoder = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 md:w-fit lg:grid-cols-4 gap-6 p-6 mx-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="skeletonLoader" key={index}></div>
      ))}
    </div>
  );
};

export default CardLoder;
