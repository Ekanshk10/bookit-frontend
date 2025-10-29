"use client";
import { getExperienceById } from "@/app/lib/getExperienceById.js";
import { useEffect } from "react";

const MainDetails = ({ id }) => {
  useEffect(() => {
    const fetchDetails = async () => {
      const experinceDetails = await getExperienceById(id);
      console.log(experinceDetails);
    };

    fetchDetails();
  }, [id]);

  return(
    <>
        <div className="mx-auto bg-pink-300 flex ">
            <div>
                {/* <Back */}
            </div>

            <div className="w-full lg:w-[765px] h-[400px]" id="maindiv">


            </div>
        </div>
    </>
  )
};

export default MainDetails;
