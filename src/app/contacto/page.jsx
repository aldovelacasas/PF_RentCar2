"use client";
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

function page() {
  return (
    <div className="grid bg-gris_frente md:text-[2em]">
      <header
        className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] md:800px]:text-[2em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1.2em] mt-2 pl-4`}>Contáctanos</p>
      </header>
      <form
        className={`md:w-4/5 pt-2 ${poppins} text-[0.8em] sm:text-[1em]  px-[25%] justify-self-center bg-gris_frente pb-12`}>
        <p className={`text-[0.8em] ${rubik} mb-2 text-center mt-6`}>
          ¿Necesitas más información?
        </p>
        <p className={`text-[1em] ${rubik} mb-6 text-center`}>
          Cuéntanos tus dudas y te responderemos al momento
        </p>

        <fieldset className="justify-self-center">
          <label htmlFor="nombre" className="">
            Nombre y apellido
          </label>
          <br />
          <input
            name="nombre"
            placeholder="Juan Pérez"
            className="bg-gris_fondo w-full mb-4 text-[0.9em] placeholder:text-grey pl-1"
          />
          <br />
        </fieldset>
        <fieldset className="justify-self-center">
          <label htmlFor="email" className="">
            Email
          </label>
          <br />
          <input
            className="bg-gris_fondo w-full mb-4 text-[0.9em] placeholder:text-grey pl-1"
            name="email"
            placeholder="juanperez@correo.com"
          />
          <br />
        </fieldset>
        <fieldset className="justify-self-center">
          <label htmlFor="fechaFin" className="">
            Comentarios o dudas
          </label>
          <br />
          <textarea
            draggable="false"
            placeholder="Escribe tus comentarios o dudas"
            className="bg-gris_fondo w-full h-[100px] resize-none mb-2 text-[0.9em] placeholder:text-grey pl-1"
          />
          <br />
        </fieldset>
        <button
          className={`bg-naranja_enf w-full justify-self-center text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default page;
