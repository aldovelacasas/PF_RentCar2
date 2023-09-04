import { useState } from "react";
import { categorias } from "@/libs/categorias.js";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

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

const today = new Date().toISOString().split("T")[0];

function FormRent({ visible, cat, dat, isAuth, handleVisible }) {
  const [category, setCategory] = useState(cat);
  const [dates, setDate] = useState(dat);

  function handleOption(e) {
    setCategory(e.target.value);
  }

  function handleDateChange(e) {
    setDate({ ...dates, [e.target.name]: e.target.value });
  }

  if (visible === false) return null;
  return (
    <div
      className={`fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] grid ${poppins}`}>
      <form className="fixed w-3/4 justify-self-center top-[20%] flex flex-col items-center bg-white border-[2px] border-black rounded-2xl pb-6">
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px] mb-4`}>
          Renta tu vehículo
        </p>
        <fieldset>
          <label htmlFor="category" className="">
            <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige una
            categoría
          </label>
          <br />
          <select
            className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="category"
            onChange={handleOption}
            value={category}>
            {categorias.map((c) => (
              <option key={c.tipo}>{c.tipo}</option>
            ))}
          </select>
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="fechaInicio" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
            inicio
          </label>
          <br />
          <input
            className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="startDate"
            type="date"
            min={today}
            value={dates.startDate}
            onChange={handleDateChange}
          />
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="endDate" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
            fin
          </label>
          <br />
          <input
            className="bg-gris_fondo w-[200px] text-[0.9em] md:w-[500px]"
            name="endDate"
            type="date"
            min={dates.startDate}
            value={dates.endDate}
            onChange={handleDateChange}
          />{" "}
          <br />
        </fieldset>
        {isAuth === false && (
          <fieldset className="py-4 grid">
            <hr />
            <p className="w-full text-[0.8em]">
              Para poder rentar un vehículo, necesitas estar registrado
            </p>
            <button
              className={` bg-naranja_enf w-1/2 max-w-[600px] place-self-center ${rubik} text-white text-[0.8em] mt-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Inicia Sesión
            </button>
          </fieldset>
        )}
        <fieldset className="flex justify-evenly w-1/2 py-6">
          <button
            type="button"
            className={
              isAuth
                ? ` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`
                : ` bg-gris_fondo ${rubik} text-slate-500 text-[0.8em] px-4 rounded-lg cursor-default`
            }>
            Rentar
          </button>
          <button
            type="button"
            onClick={handleVisible}
            className={` bg-gris_fondo ${rubik} text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Cancelar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default FormRent;
