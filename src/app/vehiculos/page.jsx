import { Rubik, Poppins } from "next/font/google";
import axios from "axios";
import {
  BsChevronCompactRight,
  BsCheckCircleFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";

import { categorias } from "../../libs/categorias.js";
import CarCard from "@/components/CarCard.jsx";

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

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
  // const result=await conn.query('SELECT * FROM product')
  // console.log(result);
}

async function vehiculos() {
  const products = await loadProducts();
  return (
    <>
      <header
        className={`bg-gris_fondo ${rubik} space-y-0 space-x-2.5 p-10 text-center`}>
        <p className="text-[2em]  leading-6">
          <span className="text-naranja_enf">Nuestros </span>
          vehículos
        </p>
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[1rem] ${rubik} mb-2 text-center`}>
          Encuentra el vehículo ideal
        </p>
        <form
          className={`pt-2 ${rubik} text-[0.8em] bg-negro_fondo pb-5 rounded-xl flex w-[95%] mx-auto pl-4 justify-center items-center`}>
          <div className={`flex flex-col mr-10 w-[20%]`}>
            <label htmlFor="busqueda" className={`text-[1rem] text-white mb-1`}>
              Búsqueda
            </label>
            <input
              type="text"
              className={`bg-gris_fondo min-w-[80px] w-[90%] rounded px-2 py-1`}
            />
          </div>
          <div className={`flex flex-col mr-10 w-[20%]`}>
            <label
              htmlFor="categoria"
              className={`text-[1rem] text-white mb-1`}>
              Categoría
            </label>
            <select
              className={`bg-gris_fondo min-w-[80px] w-[90%] rounded px-2 py-1`}
              name="categoría">
              <option selected className="">
                {" "}
              </option>
              {categorias.map((c) => (
                <option key={c.tipo}>{c.tipo}</option>
              ))}
            </select>
          </div>
          <div className={`flex flex-col mr-10 w-[20%]`}>
            <label
              htmlFor="categoria"
              className={`text-[1rem] text-white mb-1`}>
              Capacidad
            </label>
            <select
              className={`bg-gris_fondo min-w-[80px] w-[90%] rounded px-2 py-1`}
              name="capacidad">
              <option selected className="">
                {" "}
              </option>
              {categorias.map((c) => (
                <option key="categoria">{c.tipo}</option>
              ))}
            </select>
          </div>
        </form>
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 place-items-center w-[95%]`}>
        <div className="  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 gap-y-10">
          {products.map((product) => (
            <CarCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default vehiculos;
