"use client";
import { Rubik, Poppins } from "next/font/google";
import { aboutUs } from "@/libs/aboutUs";
import { PiCar, PiMapPinBold, PiMoney } from "react-icons/pi";

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
  return (
    <div className="grid bg-gris_frente md:text-[2em]">
      <header
        className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] sm:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1.2em] mt-2 pl-4`}>Nuestro Equipo</p>
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] w-3/4 text-[0.8em] bg-gris_frente pb-10 sm:text-[1.5em]`}>
        <p className={`text-[0.8em] ${rubik} text-center`}>¿Quiénes somos?</p>
        <p className={`text-[1em] ${rubik} text-center`}>Auto Connect</p>
        <p className="pt-4 mb-2 px-8 text-[0.8em]">
          Somos una empresa con más de 5 años de experiencia en el negocio de
          renta de vehículos, cuya misión ese la de brindarte a ti y a tus
          acompañantes un excelente servicio, autos de alta calidad y limpieza
          así como toda la infomación que necesites para que puedas comenzar tu
          próximo viaje sin preocupaciones.
        </p>
        <div className="flex items-baseline">
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a]  rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiCar className="text-[50px] text-naranja_enf stroke-2" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>80</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              Vehículos
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3 my-10">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiMoney className="text-[50px] text-naranja_enf font-thin" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>+500</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              Rentas exitosas
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
              <PiMapPinBold className="text-[50px] text-naranja_enf stroke-2" />
            </figure>
            <p className={`text-[1.2em] ${rubik}`}>7</p>
            <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
              Puntos de servicio
            </p>
          </div>
        </div>
      </section>
      <section className="p-4 pb-[90px] grid justify-self-center">
        <p className={`text-[1em] ${rubik} mb-6 text-center md:text-[1.5em]`}>
          Nuestro Equipo
        </p>
        <div className="grid w-4/5 place-self-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
          {aboutUs.map((i) => {
            return (
              <figure
                key={i.nombre}
                className="rounded-md p-2 shadow-md shadow-black flex flex-col flex-wrap bg-white">
                <img
                  src={i.imagen}
                  alt={`perfil de ${i.nombre}`}
                  className="rounded-t-[4px]"
                />
                <div>
                  <p className="bg-negro_fondo text-white text-center">
                    <strong>{i.nombre} </strong>
                  </p>
                  <p>
                    <strong>Área: </strong>
                    {i.area}
                  </p>
                </div>
                <div className="flex justify-between py-2 px-2 md:justify-around">
                  <a href={i.linkedIn} target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
                      alt="linkedin logo"
                      className="shadow-sm w-[35px] md:w-[50px] shadow-black rounded-md hover:shadow-md hover:shadow-black"
                    />
                  </a>
                  <a href={i.github} target="_blank">
                    <img
                      src="data:image/png;base64,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"
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
