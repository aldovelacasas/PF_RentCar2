import { Rubik, Poppins } from "next/font/google";
import { rentas } from "@/libs/placeholdersAdmin";
import { sliceData, slicePage } from "@/libs/functions";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import RentalDetail from "./RentalDetail";

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

function RentalsTable({ visible }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [rentalDetailVisibility, setRentalDetailVisibility] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [category, setCategory] = useState("vehiculo");
  const [aux, setAux] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [rentas]);

  let dataToShow = rentas;
  let quantityPerPage = 10;
  let max = Math.ceil(dataToShow.length / quantityPerPage);
  let pages = [];
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }

  useEffect(() => {
    setData(sliceData(dataToShow, currentPage, quantityPerPage));
  }, [currentPage]);

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

  const handleRentVisibility = (data) => {
    if (data) {
      setDetailData(data);
    }
    setRentalDetailVisibility(!rentalDetailVisibility);
    document.body.classList.toggle("stopScroll");
  };

  function handleSearch(e) {
    setSearch(e.target.value);
    setData(
      dataToShow.filter((d) =>
        d[category].toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setCurrentPage(1);
  }

  function handleSearchCategory(e) {
    setCategory(e.target.value);
  }

  function handleSort(sortCategory) {
    let order = "asc";
    if (order === "asc") {
      let ordenated = dataToShow.sort((a, b) => {
        if (a[sortCategory] < b[sortCategory]) {
          return -1;
        }
        if (a[sortCategory] > b[sortCategory]) {
          return 1;
        }
        return 0;
      });
      setData(sliceData(ordenated, currentPage, quantityPerPage));
      setCurrentPage;
      setAux(!aux);
    } else {
      setData(data.sort((a, b) => b[sortCategory] - a[sortCategory]));
    }
  }

  let total = 0;
  dataToShow.forEach((d) => (total += parseFloat(d.monto.slice(1))));
  total = total * 2;
  if (visible === false) return null;
  return (
    <section className="text-[12px] md:text-[16px]">
      <figure className="bg-white grid place-content-center sm:px-2 md:px-8 py-4 rounded-2xl">
        <h3 className="text-[1.2em]">
          Rentas
          <span
            className={`${poppins} text-[0.8em] bg-gris_fondo ml-2 py-1 px-2 rounded-full`}>
            {dataToShow.length}
          </span>
        </h3>
        <p className={`${poppins} text-[0.9em]`}>Vista de las rentas del mes</p>
        <div className="flex flex-wrap">
          <label htmlFor="search" className="shrink-0 basis-[100%]">
            Búsqueda:
          </label>
          <input
            name="search"
            className={`${poppins} pl-2 basis-[50%] text-[0.8em] max-w-[50%] border-2 border-black rounded-md mr-4`}
            placeholder={`Búsqueda por ${category}`}
            value={search}
            onChange={handleSearch}
          />
          <select
            className="max-w-[30%]  bg-naranja_enf text-white px-2 rounded-full cursor-pointer shadow-sm shadow-black hover:shadow-md hover:shadow-black"
            onChange={handleSearchCategory}>
            <option value="vehiculo">Vehiculo</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>

        <table className={`${poppins} bg-white mt-6`}>
          <tbody className="">
            <tr className="">
              {pantalla === "chica" ? (
                <>
                  <th
                    onClick={() => handleSort("id")}
                    className={`${rubik} px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    #ID
                  </th>
                  <th
                    onClick={() => handleSort("vehiculo")}
                    className={`${rubik} px-1 md:px-4 text-left break-all hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Vehículo
                  </th>
                  <th
                    onClick={() => handleSort("estado")}
                    className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Estado
                  </th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Detalle</th>
                </>
              ) : (
                <>
                  <th
                    onClick={() => handleSort("id")}
                    className={`${rubik} px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    #ID
                  </th>
                  <th
                    onClick={() => handleSort("usuario")}
                    className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Usuario
                  </th>
                  <th
                    onClick={() => handleSort("vehiculo")}
                    className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Vehículo
                  </th>
                  <th
                    onClick={() => handleSort("estado")}
                    className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Estado
                  </th>
                  <th
                    onClick={() => handleSort("monto")}
                    className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    Monto
                  </th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>Detalle</th>
                </>
              )}
            </tr>
            {data?.map((d) => {
              let ultimo;
              let estado = d.estado
                .charAt(0)
                .toUpperCase()
                .concat(d.estado.slice(1));
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
                      <td className=" p-4">{d.id}</td>
                      <td className=" p-4 break-all">{d.vehiculo}</td>
                      <td className="p-4">
                        <span
                          className={
                            d.estado === "activo"
                              ? "bg-[#d1fae5] text-[#047857] inline px-2 rounded-md"
                              : d.estado === "terminado"
                              ? "bg-[#f3f4f6] inline px-2 rounded-md"
                              : "bg-[#ffe4e6] text-[#be123c] inline px-2 rounded-md"
                          }>
                          {estado}
                        </span>
                      </td>
                      <td className=" p-4">
                        <button
                          onClick={() => handleRentVisibility(d)}
                          className="px-2 py-1 border-[1px] rounded-md border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          Detalle
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className=" p-4">{d.id}</td>
                      <td className=" p-4">{d.usuario}</td>
                      <td className=" p-4">{d.vehiculo}</td>
                      <td className="p-4">
                        <span
                          className={
                            d.estado === "activo"
                              ? "bg-[#d1fae5] text-[#047857] inline px-2 rounded-md"
                              : d.estado === "terminado"
                              ? "bg-[#f3f4f6] inline px-2 rounded-md"
                              : "bg-[#ffe4e6] text-[#be123c] inline px-2 rounded-md"
                          }>
                          {estado}
                        </span>
                      </td>
                      <td className=" p-4 text-right">{d.monto}</td>
                      <td className=" p-4">
                        <button
                          onClick={() => handleRentVisibility(d)}
                          className="px-2 py-1 border-[1px] rounded-md border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          Detalle
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
        {data?.length === 0 && (
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
      <p className="text-1.2em text-center pb-8">
        Total del mes:{" "}
        <span className="bg-white px-4 py-1 border-2 border-black">
          ${total.toLocaleString()}
        </span>
      </p>
      <RentalDetail
        visible={rentalDetailVisibility}
        data={detailData}
        handleVisible={handleRentVisibility}
      />
    </section>
  );
}

export default RentalsTable;
