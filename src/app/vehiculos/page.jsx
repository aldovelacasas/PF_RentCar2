"use client";
import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Rubik, Poppins } from "next/font/google";
import axios from "axios";
import { slicePage, sliceData } from "@/libs/functions";
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
  return await data;
}

function Vehiculos() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    loadProducts().then((data) => setAllProducts(data));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  let dataToShow = allProducts;
  let quantityPerPage = 12;
  let max = Math.ceil(dataToShow.length / quantityPerPage);
  let pages = [];
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }

  let data = sliceData(dataToShow, currentPage, quantityPerPage);
  let currentPages = slicePage(pages, currentPage, 2);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < max) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.innerHTML));
  };

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
              <option defaultValue={true} className="">
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
              <option defaultValue={true} className="">
                {" "}
              </option>
              {categorias.map((c) => (
                <option key={c.tipo}>{c.tipo}</option>
              ))}
            </select>
          </div>
        </form>
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 place-items-center grid w-[95%]`}>
        <div className=" min-[1300px]:w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-[1300]:place-items-center gap-2 gap-y-10">
          {data &&
            data.map((product) => (
              <CarCard key={product.id} product={product} />
            ))}
        </div>
        <div className="w-full flex justify-center gap-2 mt-8">
          {data.length === 0 && <p className="text-2xl">Nada que mostrar</p>}
          <button
            onClick={handlePrevious}
            className={
              currentPage === 1
                ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
            }>
            <FiChevronLeft className="symbolSearch" />
          </button>
          {currentPage && (
            <button
              onClick={() => setCurrentPage(1)}
              className={
                currentPage === 1
                  ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                  : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
              }>
              1
            </button>
          )}
          {currentPage > 4 && pages.length > 13 && <span>...</span>}
          {currentPages
            .filter((p) => p > 0 && p <= max)
            .map((p) => {
              return (
                <button
                  onClick={handlePageChange}
                  className={
                    currentPage === p
                      ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                      : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
                  }
                  key={p}>
                  {p}
                </button>
              );
            })}
          {currentPage + 3 < max ? (
            <>
              <span>...</span>
              <button
                onClick={() => setCurrentPage(max)}
                className="px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md">
                {max}
              </button>
            </>
          ) : (
            currentPage + 3 <= max && (
              <button
                onClick={() => setCurrentPage(max)}
                className="px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md">
                {max}
              </button>
            )
          )}
          <button
            onClick={handleNext}
            className={
              currentPage === max
                ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
            }>
            <FiChevronRight className="symbolSearch" />
          </button>
        </div>
      </section>
    </>
  );
}

export default Vehiculos;
