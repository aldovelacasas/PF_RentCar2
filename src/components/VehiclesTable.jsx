import { Rubik, Poppins } from "next/font/google";
import { vehiculos } from "@/libs/placeholdersAdmin";
import { sliceData, slicePage } from "@/libs/functions";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import VehicleDetail from "./VehicleDetail";

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

let pantalla;

if (window.innerWidth <= 870) {
  pantalla = "chica";
} else if (window.innerWidth > 870) {
  pantalla = "grande";
}

function VehiclesTable({ visible }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [vehiclesDetailVisibility, setVehiclesDetailVisibility] =
    useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [vehiculos]);

  useEffect(() => {
    setCurrentPage(1);
  }, [vehiculos]);

  let dataToShow = vehiculos;
  let quantityPerPage = 10;
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

  const handleVehiclesVisibility = (data) => {
    console.log("out");
    if (data) {
      console.log("in");

      setDetailData(data);
    }
    setVehiclesDetailVisibility(!vehiclesDetailVisibility);
    document.body.classList.toggle("stopScroll");
  };

  if (visible === false) return null;
  return (
    <section className="text-[12px] md:text-[16px]">
      <figure className="bg-white grid place-content-center sm:px-2 md:px-8 py-4 rounded-2xl">
        <h3 className="text-[1.2em] pl-2">
          Vehículos
          <span
            className={`${poppins} text-[0.8em] bg-gris_fondo ml-2 py-1 px-2 rounded-full`}>
            {dataToShow.length}
          </span>
        </h3>
        <p className={`${poppins} text-[0.9em] pl-2`}>
          Vista de los vehículos de la empresa
        </p>
        <table className={`${poppins} bg-white mt-6`}>
          <tbody className="">
            <tr className="">
              {pantalla === "chica" ? (
                <>
                  <th className={`${rubik} px-2 md:px-4 text-left`}>Nombre</th>
                  <th className={`${rubik} px-1 md:px-4 text-left break-all`}>
                    Modelo
                  </th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Precio</th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>
                    Acciones
                  </th>
                </>
              ) : (
                <>
                  <th className={`${rubik} px-2 md:px-4 text-left`}>Nombre</th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Modelo</th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Tipo</th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Precio</th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>
                    Acciones
                  </th>
                </>
              )}
            </tr>
            {data.map((d) => {
              let ultimo;

              if (data.at(quantityPerPage) === d || data.at(-1) === d) {
                ultimo = true;
              } else {
                ultimo = false;
              }
              return (
                <tr
                  key={d.id}
                  className={
                    ultimo
                      ? "hover:bg-gris_frente "
                      : "border-b-2 hover:bg-gris_frente "
                  }>
                  {pantalla === "chica" ? (
                    <>
                      <td className=" p-4">{d.name}</td>
                      <td className=" break-all">{d.model}</td>
                      <td className="p-4 text-right"> ${d.price}</td>
                      <td className=" p-4">
                        <button
                          onClick={() => handleVehiclesVisibility(d)}
                          className="px-1 py-1 border-[1px] rounded-md bg-gris_fondo border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsPencilFill />
                        </button>
                        <button
                          onClick={() => handleVehiclesVisibility(d)}
                          className="px-1 py-1 border-[1px] rounded-md bg-red-500 text-white border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsFillTrash3Fill />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className=" p-4">{d.name}</td>
                      <td className=" p-4">{d.model}</td>
                      <td className=" p-4">{d.type}</td>
                      <td className="p-4 text-right">${d.price}</td>
                      <td className=" p-4">
                        <button
                          onClick={() => handleVehiclesVisibility(d)}
                          className="px-2 py-1 border-[1px] rounded-md bg-gris_fondo border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsPencilFill />
                        </button>
                        <button
                          onClick={() => handleVehiclesVisibility(d)}
                          className="px-2 ml-2 py-1 border-[1px] rounded-md bg-red-500 text-white border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsFillTrash3Fill />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </figure>
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
      <VehicleDetail
        visible={vehiclesDetailVisibility}
        data={detailData}
        handleVisible={handleVehiclesVisibility}
      />
    </section>
  );
}

export default VehiclesTable;
