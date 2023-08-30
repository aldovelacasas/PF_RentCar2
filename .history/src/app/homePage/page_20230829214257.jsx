import { Rubik, Poppins } from "next/font/google";
import { BsChevronCompactRight, BsCheckCircleFill } from "react-icons/bs";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { PiCar, PiCarProfile, PiPhoneCallBold } from "react-icons/pi";

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

function HomePage() {
  return (
    <>
      <header className={`bg-gris_fondo ${rubik} space-y-0 space-x-2.5`}>
        <p className={`pt-12 ml-2.5 text-[0.8em] mb-2`}>
          Planea tu viaje ahora
        </p>
        <p className="text-[1.3em]  leading-6">
          <span className="text-naranja_enf">Ahorra </span>
          con nuestra
        </p>
        <p className="text-[1.3em] leading-6">renta de vehículos</p>
        <p className={`${poppins} text-[0.6em] mt-2`}>
          Renta el auto de tus sueños con precios imbatibles,
        </p>
        <p className={`${poppins} text-[0.6em] pb-4`}>
          km ilimitado, opciones flexibles y mucho más.
        </p>
        <div className="flex place-content-evenly w-3/4 mt-3 pb-10">
          <button
            className={`bg-naranja_enf text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Renta <BsCheckCircleFill className="inline pl-1" />
          </button>
          <button
            className={`bg-negro_fondo text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Conoce más
            <BsChevronCompactRight className="inline pl-1 stroke-slate-100 pr-0 mr-0" />
          </button>
        </div>
      </header>
      <form
        className={`pt-2 ${poppins} text-[0.8em] pl-16 bg-gris_frente pb-12`}>
        <p className={`text-[1rem] ${rubik} mb-2`}>Renta un auto</p>
        <label htmlFor="categoria" className="">
          <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige una
          categoría
        </label>
        <br />
        <input className="bg-gris_fondo w-[280px] mb-4" name="categoría" />{" "}
        <br />
        <label htmlFor="fechaInicio" className="">
          <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
          inicio
        </label>
        <br />
        <input className="bg-gris_fondo w-[280px] mb-4" name="fechaFin" />{" "}
        <br />
        <label htmlFor="fechaFin" className="">
          <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
          fin
        </label>
        <br />
        <input className="bg-gris_fondo w-[280px]" name="fechaFin" /> <br />
        <button
          className={`bg-naranja_enf text-white text-[0.7rem] px-4 py-1 mt-4 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          Buscar
        </button>
      </form>
      <section className={`pt-4 ${poppins} text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[0.8rem] ${rubik} mb-2 text-center`}>
          Planea tu viaje
        </p>
        <p className={`text-[1rem] ${rubik} mb-2 text-center`}>
          Alquila tu auto fácil y rápido
        </p>
        <div>
          <figure className="bg-[#ea4e398a] rounded-full h-[80px] w-[80px] flex justify-center items-center">
            <PiCar className="text-[50px] text-naranja_enf" />
          </figure>
          <PiPhoneCallBold />
          <PiCarProfile />
        </div>
      </section>
    </>
  );
}

export default HomePage;
