/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Rubik, Poppins } from "next/font/google";
import { aboutUs } from "@/libs/aboutUs";
import { PiCar, PiMapPinBold, PiMoney } from "react-icons/pi";
import Map from "@/components/maps";
import { useTranslation } from "react-i18next";

const mapURL = `http://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.mapsKey}`;

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

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="grid bg-gris_frente dark:bg-dark_frente md:text-[1.5em] text-black dark:text-white">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo flex items-center h-[175px] ${rubik} text-[1em] sm:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1.2em] mt-2 pl-4`}>{t("team")}</p>
        <img
          src="https://drive.google.com/uc?export=download&id=1NW9G16ClvYbufG9oBwPhKfgqBc_zg8r0"
          className=" float-right h-[10vh] md:h-[30vh] lg:h-[35vh] absolute right-[10%] scale-x-[-1] top-[10%] z-1"
        />
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] w-3/4 text-[0.8em] bg-gris_frente dark:bg-dark_frente pb-10 mt-8 sm:text-[1.5em]`}>
        <p className={`text-[0.8em] ${rubik} text-center`}>{t("somos")}</p>
        <p className={`text-[1em] ${rubik} text-center text-naranja_enf`}>
          Auto Connect
        </p>
        <p className="pt-4 mb-2 px-8 text-[0.8em]">{t("textabout")}</p>
        <br />
        <p className={`text-[0.8em] ${rubik} pb-10 text-center`}>
          {t("donde")}
        </p>
        <Map
          googleMapURL={mapURL}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "50vh" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
        <div className="flex items-baseline">
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a]  rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiCar className="text-[50px] text-naranja_enf stroke-2" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>80</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              {t("cars")}
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3 my-10">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiMoney className="text-[50px] text-naranja_enf font-thin" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>+500</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              {t("exitosas")}
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiMapPinBold className="text-[50px] text-naranja_enf stroke-2" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>7</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              {t("points")}
            </p>
          </div>
        </div>
        <br />
      </section>

      <section className="p-4 pb-[90px] grid justify-self-center">
        <p className={`text-[1em] ${rubik} mb-6 text-center `}>{t("team")}</p>
        <div className="grid w-4/5 place-self-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
          {aboutUs.map((i) => {
            return (
              <figure
                key={i.nombre}
                className="rounded-md p-2 shadow-md shadow-black flex flex-col flex-wrap bg-white dark:bg-dark_blanco h-fit">
                <img
                  src={i.imagen}
                  alt={`perfil de ${i.nombre}`}
                  className="rounded-t-[4px] lg:h-[300px]"
                />
                <div>
                  <p className="bg-negro_fondo text-white text-center">
                    <strong>{i.nombre} </strong>
                  </p>
                  <p>
                    <strong>{t("area")}: </strong>
                    {i.area}
                  </p>
                </div>
                <div className="flex py-2 px-2 justify-around">
                  <a href={i.linkedIn} target="_blank">
                    <img
                      src="LinkedIn.png"
                      alt="linkedin logo"
                      className="shadow-sm w-[35px] md:w-[45px] shadow-black rounded-md hover:shadow-md hover:shadow-black"
                    />
                  </a>
                  <a href={i.github} target="_blank">
                    <img
                      src="github.webp"
                      alt="github logo"
                      className="shadow-sm w-[35px] md:w-[50px] shadow-black rounded-full hover:shadow-md hover:shadow-black"
                    />
                  </a>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
