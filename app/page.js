import CardsDiv from "./components/CardsDiv";
import { Suspense } from "react";
import CardLoder from "./components/CardLoder";

export default function Home() {
  return (
    <>
      <Suspense fallback={<CardLoder/>}>
        <CardsDiv />
      </Suspense>
    </>
  );
}
