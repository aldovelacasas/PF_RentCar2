/* eslint-disable @next/next/no-img-element */
"use client";
import { useTranslation } from "react-i18next";

export default function CarCard({ car, handleVisibility, handleDetail }) {
  let rating = car.rating ?? 5;
  let x = 0;
  let ratingStars = [];
  let completingStars = [];
  while (x < rating) {
    x++;
    ratingStars.push(x);
  }
  if (ratingStars.length < 5) {
    let y = 5 - ratingStars.length;
    x = 0;
    while (x < y) {
      x++;
      completingStars.push(x);
    }
  }
  const { t } = useTranslation();
  return (
    <div
      key={car.id}
      className=" bg-white dark:bg-dark_blanco w-[290px] md:w-[28vw] lg:w-[22vw] shadow-sm shadow-black hover:cursor-pointer hover:scale-105 transform transition-transform duration-200 border rounded-md hover:shadow-md hover:shadow-black text-black dark:text-white">
      <main onClick={() => handleDetail(car)} className="group relative">
        <div className="absolute w-full h-0 bg-[#525252cc] items-center justify-center rounded-t-md group-hover:h-full flex group-hover:ease-in-out group-hover:duration-[350ms]">
          <p className="text-white hidden text-center group-hover:block">
            {t("more-info2")}
          </p>
        </div>
        <img
          src={car.image}
          alt={car.name}
          className=" w-[100%] px-3 py-3 mx-auto mb-4 h-[12rem] object-cover bg-white  rounded-t-lg"
        />
        <div>
          <div className="flex flex-wrap justify-between px-3 mb-0">
            <h2 className="text-lg font-semibold mb-0 ">{car.name}</h2>
            <p className=" font-bold text-xl mb-0">${car.price}</p>
          </div>
          <p className="flex flex-wrap justify-between font-normal px-3 mb-0">
            {car.model}
          </p>
          <div className="flex px-2 justify-between mb-2">
            <div className="flex ">
              {ratingStars.map((s) => (
                <span key={s} className="text-amarillo_status text-[1.5em]">
                  ★
                </span>
              ))}
              {completingStars.map((s) => (
                <span key={s} className="text-gris_fondo text-[1.5em]">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm font-light pr-2">{t("for-day")}</p>
          </div>
        </div>
        <hr className="my-3 mx-2" />
      </main>

      <div className=" flex justify-center pb-3">
        <button
          onClick={() => handleVisibility(car)}
          className={` w-[90%] bg-naranja_enf text-white text-[2em] px-4 py-3 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("rentar")}
        </button>
      </div>
    </div>
  );
}
