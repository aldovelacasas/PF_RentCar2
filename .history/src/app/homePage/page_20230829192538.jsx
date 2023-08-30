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

function HomePage() {
  return (
    <div className={`bg-gris_fondo ${rubik} space-y-0 space-x-2.5`}>
      <p className={`pt-12 ml-2.5 text-[0.8em]`}>Planea tu viaje ahora</p>
      <p className="text-[1.3em]  leading-7">
        <span className="text-naranja_enf">Ahorra </span>
        con nuestra
      </p>
      <p className="text-[1.3em] mt-0 pt-0 leading-7">renta de vehículos</p>
      <div>
        <p className={`${poppins} text-[0.6em]`}>
          Renta el auto de tus sueños con precios imbatibles,
        </p>
        <p className={`${poppins} text-[0.6em]`}>
          km ilimitado, opciones flexibles y mucho más.
        </p>
        <div className="flex place-content-evenly w-3/4 mt-3 pb-8">
          <a
            href="#form"
            className={`bg-naranja_enf text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black`}>
            Renta
          </a>
          <a
            href="#form"
            className={`bg-negro_fondo text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black`}>
            Conoce más
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;