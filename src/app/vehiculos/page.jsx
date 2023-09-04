"use client";
import { sliceData, slicePage } from "@/libs/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "@/store/slices/car";
import FiltroVehiculos from "@/components/FiltroVehiculos";
import CarCard from "@/components/CarCard.jsx";
import { Rubik, Poppins } from "next/font/google";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

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

function Vehiculos() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const cars = useSelector((state) => state.cars.showCars);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [cars]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cars]);

  let dataToShow = cars;
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
        <FiltroVehiculos />
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 place-items-center w-[95%]`}>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 gap-y-10">
          {data?.map((car) => {
            return <CarCard key={car.id} car={car} />;
          })}
        </div>
      </section>
      <div className="w-full flex justify-center gap-2 mt-8 mb-8">
        {data.length === 0 && (
          <p className="text-[1em] text-center text-naranja_enf px-4 bg-gris_fondo py-2 rounded-full">
            Nada que mostrar
          </p>
        )}
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
    </>
  );
}

export default Vehiculos;
