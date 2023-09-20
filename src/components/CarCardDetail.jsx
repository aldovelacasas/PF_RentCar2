/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Rubik, Poppins } from "next/font/google";

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
export default function CarCardDetail({
  product,
  visible,
  handleClose,
  handleRentVisibility,
}) {
  if (!visible) return null;
  const { t } = useTranslation();

  let rating = product.rating ?? 5;
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

  return (
    <section
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40 text-black dark:text-white`}>
      <div
        key={product.id}
        className=" w-full max-h-[78vh] bg-white dark:bg-dark_blanco max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <main className="overflow-y-auto max-h-[60vh]">
          <p
            className={` ${rubik} bg-naranja_enf sticky top-0 py-1 text-center font-bold text-white`}>
            {t("detail-car")}
          </p>
          <img
            src={product.image}
            alt={product.name}
            className="  mx-auto mb-4 max-h-[300px] object-cover"
          />
          <div>
            <div className="flex flex-wrap justify-between px-3 mb-0">
              <h2 className="text-lg font-semibold  mb-0 ">{product.name}</h2>
              <p className="text-begro_fondo font-bold text-xl mb-0">
                ${product.price}
              </p>
            </div>
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
            <div className="flex justify-between px-2 font-light">
              <p className="mb-2 ">
                <span className="font-bold">{t("model")}:</span> {product.model}
              </p>
              <p className="pr-2">
                <span className="font-bold">{t("year")}:</span>
                {product.year}
              </p>
            </div>
            <div className="flex justify-between px-2 font-light">
              <p className="mb-2">
                <span className="font-bold">
                  {t("cap")} ({t("users")}):
                </span>
                {product.capacity} {t("people")}
              </p>
              <p className="pr-2">
                <span className="font-bold">{t("type")}:</span> {product.type}
              </p>
            </div>
            <hr className="my-2" />
            <p className=" text-[1.2em] font-light px-2">
              <span className="font-bold">{t("descrip")}:</span>{" "}
              {product.description}
            </p>
          </div>
        </main>
        <hr className="my-3 mx-2" />
        <div
          className={` ${rubik} flex justify-evenly w-full lg:w-3/4 mx-[auto] text-[0.9em] py-2  pb-2 mb-4`}>
          <button
            onClick={handleClose}
            className={` bg-gris_fondo dark:bg-dark_fondo text-black dark:text-white text-[1em] px-6 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("close")}
          </button>
          <button
            onClick={() => handleRentVisibility(product)}
            className={` rounded-md px-8 py-2 bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("rentar")}
          </button>
        </div>
      </div>
    </section>
  );
}
