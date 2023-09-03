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
    <div className="grid bg-gris_frente md:text-[1.5em]">
      <header
        className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] sm:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1.2em] mt-2 pl-4`}>Nuestro Equipo</p>
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] w-3/4 text-[0.8em] bg-gris_frente pb-10 mt-8 sm:text-[1.5em]`}>
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
        <p className={`text-[1em] ${rubik} mb-6 text-center `}>
          Nuestro Equipo
        </p>
        <div className="grid w-4/5 place-self-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
          {aboutUs.map((i) => {
            return (
              <figure
                key={i.nombre}
                className="rounded-md p-2 shadow-md shadow-black flex flex-col flex-wrap bg-white h-fit">
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
                    <strong>Área: </strong>
                    {i.area}
                  </p>
                </div>
                <div className="flex py-2 px-2 justify-around">
                  <a href={i.linkedIn} target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/100px-LinkedIn_logo_initials.png"
                      alt="linkedin logo"
                      className="shadow-sm w-[35px] md:w-[45px] shadow-black rounded-md hover:shadow-md hover:shadow-black"
                    />
                  </a>
                  <a href={i.github} target="_blank">
                    <img
                      src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"
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
