import { Rubik, Poppins } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { sliceData, slicePage } from "@/libs/functions";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { BsPencilFill } from "react-icons/bs";
import { RiRecycleFill } from "react-icons/ri";
import { getCars } from "@/store/slices/car";
import { useEffect, useState } from "react";
import VehicleDetail from "./VehicleDetail";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { TbReload } from "react-icons/tb";

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
if (typeof window !== "undefined") {
  if (window.innerWidth <= 870) {
    pantalla = "chica";
  } else if (window.innerWidth > 870) {
    pantalla = "grande";
  }
}
function CarRecTable({ visible, handleAlertsVisibility }) {
  const arrowInitialState = {
    name: false,
    model: false,
    type: false,
    price: false,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [vehiclesDetailVisibility, setVehiclesDetailVisibility] =
    useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [category, setCategory] = useState("name");
  const [aux, setAux] = useState(false);
  const [arrow, setArrow] = useState(arrowInitialState);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getCars());
  }, [aux]);

  let vehiculosBorrados = useSelector((state) => state.cars.deletedCars);
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiculosBorrados]);

  let dataToShow = vehiculosBorrados;
  let quantityPerPage = 5;
  let max = Math.ceil(dataToShow.length / quantityPerPage);
  let pages = [];
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }

  useEffect(() => {
    setData(sliceData(dataToShow, currentPage, quantityPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiculosBorrados, currentPage]);

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
    if (data) {
      setDetailData(data);
    }
    setVehiclesDetailVisibility(!vehiclesDetailVisibility);
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

  function handleReload() {
    router.push("/AdminConsole/Recoveries");
    router.refresh();
    setAux(!aux);
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
      setArrow({ ...arrowInitialState, [sortCategory]: true });
    } else {
      setData(data.sort((a, b) => b[sortCategory] - a[sortCategory]));
    }
  }

  if (visible === false) return null;
  return (
    <section className="text-[10px] sm:text-[12px] md:text-[16px] text-black dark:text-white">
      <figure className="bg-white dark:bg-dark_blanco grid place-content-center sm:px-2 md:px-8 py-4 rounded-2xl">
        <div className="flex justify-between flex-wrap mr-6">
          <h3 className="text-[1.2em] pl-2">
            {t("cars")}
            <span
              className={`${poppins} text-[0.8em] bg-gris_fondo dark:bg-dark_fondo ml-2 py-1 px-2 rounded-full`}>
              {dataToShow.length}
            </span>
          </h3>
          <button
            onClick={handleReload}
            className="inline ml-12 bg-naranja_enf px-4 py-2 text-white rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
            <TbReload />
          </button>
        </div>
        <p className={`${poppins} text-[0.9em] pl-2`}>{t("view-unused")}</p>
        <div className="flex flex-wrap pl-2">
          <label htmlFor="search" className="shrink-0 basis-[100%]">
            {t("search")}:
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
            <option value="name">{t("name")}</option>
            <option value="model">{t("model")}</option>
          </select>
        </div>
        <table className={`${poppins} mt-6`}>
          <tbody className="">
            <tr className="">
              {pantalla === "chica" ? (
                <>
                  <th
                    onClick={() => handleSort("name")}
                    className={`${rubik} min-w-[90px] sm:min-w-[150px] px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.name ? "Nombre ▼" : "Nombre"}
                  </th>
                  <th
                    onClick={() => handleSort("model")}
                    className={`${rubik} min-w-[90px] sm:min-w-[250px] px-1 md:px-4 text-left break-all hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.model ? "Modelo ▼" : "Modelo"}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className={`${rubik} min-w-[60px] px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.price ? "Precio ▼" : "Precio"}
                  </th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>
                    {t("actions")}
                  </th>
                </>
              ) : (
                <>
                  <th
                    onClick={() => handleSort("name")}
                    className={`${rubik} md:min-w-[150px] px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.name ? "Nombre ▼" : "Nombre"}
                  </th>
                  <th
                    onClick={() => handleSort("model")}
                    className={`${rubik} md:min-w-[150px] px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.model ? "Modelo ▼" : "Modelo"}
                  </th>
                  <th
                    onClick={() => handleSort("type")}
                    className={`${rubik} md:min-w-[150px] px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                    {arrow.type ? "Tipo ▼" : "Tipo"}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className={`${rubik} md:min-w-[120px] px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                    {arrow.price ? "Precio ▼" : "Precio"}
                  </th>
                  <th className={`${rubik} px-1 md:px-4 text-left`}>
                    {t("actions")}
                  </th>
                </>
              )}
            </tr>
            {data?.map((d) => {
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
                      ? "hover:bg-gris_frente  "
                      : "border-b-2 hover:bg-gris_frente  "
                  }>
                  {pantalla === "chica" ? (
                    <>
                      <td className=" p-4">{d.name}</td>
                      <td className=" break-all">{d.model}</td>
                      <td className="p-4 text-right"> ${d.price}</td>
                      <td className=" p-4">
                        <button
                          onClick={() => handleVehiclesVisibility(d)}
                          className="px-1 py-1 border-[1px] rounded-md bg-gris_fondo dark:bg-dark_fondo border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsPencilFill />
                        </button>
                        <button
                          onClick={() =>
                            handleAlertsVisibility("vehículo", d.id)
                          }
                          className="px-1 py-1 border-[1px] rounded-md bg-green-500 text-white border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <RiRecycleFill />
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
                          className="px-2 py-1 border-[1px] rounded-md bg-gris_fondo dark:bg-dark_fondo border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <BsPencilFill />
                        </button>
                        <button
                          onClick={() =>
                            handleAlertsVisibility("vehículo", d.id)
                          }
                          className="px-2 ml-2 py-1 border-[1px] rounded-md bg-green-500 text-white border-negro_fondo hover:bg-negro_fondo hover:text-white">
                          <RiRecycleFill />
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
        <button
          onClick={handlePrevious}
          className={
            currentPage === 1
              ? "px-3 py-1 shadow-sm shadow-black bg-negro_fondo text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
              : "px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
          }>
          <FiChevronLeft className="symbolSearch" />
        </button>
        {currentPage && (
          <button
            onClick={() => setCurrentPage(1)}
            className={
              currentPage === 1
                ? "px-3 py-1 shadow-sm shadow-black bg-negro_fondo text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
                : "px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
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
                    ? "px-3 py-1 shadow-sm shadow-black bg-negro_fondo text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
                    : "px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
                }
                key={p}>
                {p}
              </button>
            );
          })}
        {currentPage + 4 < max ? (
          <>
            <span>...</span>
            <button
              onClick={() => setCurrentPage(max)}
              className="px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
              {max}
            </button>
          </>
        ) : (
          currentPage + 5 <= max && (
            <button
              onClick={() => setCurrentPage(max)}
              className="px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
              {max}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          className={
            currentPage === max
              ? "px-3 py-1 shadow-sm shadow-black bg-negro_fondo text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
              : "px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
          }>
          <FiChevronRight className="symbolSearch" />
        </button>
      </div>
      <VehicleDetail
        visible={vehiclesDetailVisibility}
        data={detailData}
        handleVisible={handleVehiclesVisibility}
        handleReload={handleReload}
      />
    </section>
  );
}

export default CarRecTable;
