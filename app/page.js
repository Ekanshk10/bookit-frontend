import CardsDiv from "./components/CardsDiv";
import { Suspense } from "react";
import CardLoder from "./components/CardLoder";
import { getExperiences } from "./lib/getExperiences.js";



export default async function Page({ searchParams }) {
  const params = await searchParams;
  const search = params?.q || "";
    const data = await getExperiences();
  return (
    <>
      <Suspense fallback={<CardLoder/>}>
        <CardsDiv data = {data}  search={search}/>
      </Suspense>
    </>
  );
}
