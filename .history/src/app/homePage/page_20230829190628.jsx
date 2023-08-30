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
      <p className={`pt-12 ml-2.5`}>Planea tu viaje ahora</p>
      <p className="text-[1.3em] mb-0 pb-0">
        <span className="text-naranja_enf mb-0 pb-0">Ahorra </span>
        con nuestra
      </p>
      <p className="text-[3em] mt-0 pt-0">renta de vehículos</p>
      <div>
        <p className={`${poppins}`}>
          Renta el auto de tus sueños con precios imbatibles,
        </p>
        <p className={`${poppins}`}>
          km ilimitado, opciones flexibles y mucho más.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
