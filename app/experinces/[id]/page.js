import React, { Suspense } from "react";
import MainDetails from "./components/MainDetails";
import DetailsLoder from "./components/DetailsLoder";
const page = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<DetailsLoder/>}>
        <MainDetails id={id} />
      </Suspense>
    </>
  );
};

export default page;
