/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Rubik, Poppins } from "next/font/google";
import TestCard from "@/components/TestCard";
import OpinionForm from "@/components/OpinionForm";
import axios from "axios";
import { getTest } from "@/store/slices/testimonio";
import Reviews from "@/components/Reviews";

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

async function getCars() {
  const { data } = await axios("/api/products");

  const cars = [];
  data.map((car) => {
    cars.push({ name: car.name, model: car.model, id: car.id });
  });
  return cars;
}

async function Testimoniales() {
  try {
    var cars = await getCars();
    var testimonios = useSelector((state) => state.testimonies.testimonies);
    testimonios = testimonios.slice(0, 14);
  } catch (error) {
    console.log(error.message);
  }
  return (
    <div className="bg-white">
      <div>
        <header
          className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] px-[10%] space-y-0 space-x-2.5`}>
          <p className={`text-[1.9em] mt-2 pl-4`}>Testimoniales</p>
          <img
            src="https://drive.google.com/uc?export=download&id=18hd72ccmFxNZhgHNgcH0T3zFAUw4gNmU"
            className=" float-right h-[10vh] md:h-[25vh] lg:h-[29vh] absolute right-[10%] top-[8%] z-1"
          />
        </header>
      </div>
      <p className={`${rubik} text-center text-[2em] pt-8`}>Prueba social</p>
      <p className={`${rubik} text-center text-[1.2em] py-6`}>
        No tomes sólo nuestra palabra, lee las reseñas que nuestros clientes nos
        han dejado
      </p>
      <Reviews> </Reviews>
      <OpinionForm cars={cars} />
    </div>
  );
}

export default Testimoniales;
