import CardsDiv from "./components/CardsDiv";
import { Suspense } from "react";
import CardLoder from "./components/CardLoder";


export default async function Page({ searchParams }) {
  const params = await searchParams;
  const search = params?.q || "";
  return (
    <>
      <Suspense fallback={<CardLoder/>}>
        <CardsDiv  search={search} />
      </Suspense>
    </>
  );
}
