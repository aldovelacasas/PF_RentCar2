"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Rubik, Poppins } from "next/font/google";
import OpinionForm from "@/components/OpinionForm";
import axios from "axios";
import Reviews from "@/components/Reviews";
import { useTranslation } from "react-i18next";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const poppins = fontPoppins.className;
const rubik = fontRubik.className;

async function getCars() {
  const { data } = await axios(`${process.env.API_BASE_URL}/api/products`);

  const cars = [];
  data.map((car) => {
    cars.push({ name: car.name, model: car.model, id: car.id });
  });
  return cars;
}

async function Testimoniales() {
  const { t } = useTranslation();
  try {
    var cars = await getCars();
    var testimonios = useSelector((state) => state.testimonies.testimonies);
    testimonios = testimonios.slice(0, 14);
  } catch (error) {
    console.log(error.message);
  }
  return (
    <div className="bg-white dark:bg-dark_blanco text-black dark:text-white">
      <div>
        <header
          className={`bg-gris_fondo dark:bg-dark_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] px-[10%] space-y-0 space-x-2.5`}>
          <p className={`text-[1.9em] mt-2 pl-4`}>{t("testimonials")}</p>
          <img
            src="https://drive.google.com/uc?export=download&id=18hd72ccmFxNZhgHNgcH0T3zFAUw4gNmU"
            className=" float-right h-[10vh] md:h-[25vh] lg:h-[29vh] absolute right-[10%] top-[8%] z-1"
          />
        </header>
      </div>
      <p className={`${rubik} text-center text-[2em] pt-8`}>{t("reviews")}</p>
      <p className={`${rubik} text-center text-[1.2em] py-6`}>{t("lee-rev")}</p>
      <Reviews> </Reviews>
      <OpinionForm cars={cars} />
    </div>
  );
}

export default Testimoniales;
