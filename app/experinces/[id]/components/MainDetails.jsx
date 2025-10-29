import { getExperienceById } from "@/app/lib/getExperienceById.js";
import ClientWrapper from "./ClientWrapper";

const MainDetails = async ({ id }) => {
  const data = await getExperienceById(id);
  const slotsAvaliable = data.slots;
  const packagePrice = data.price;

  return (
    <ClientWrapper data={data} slotsAvaliable={slotsAvaliable} packagePrice={packagePrice} />
  );
};

export default MainDetails;