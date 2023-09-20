/* eslint-disable react-hooks/exhaustive-deps */
import { Rubik, Poppins } from "next/font/google";
import { sliceData, slicePage } from "@/libs/functions";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { RiRecycleFill } from "react-icons/ri";
import { PiPlusCircleBold } from "react-icons/pi";
import UserDetail from "./UserDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRental, getCars, getUser } from "@/store/slices/rental";
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

let completeRentals = {};
let dataToShow;

function CarRecTable({ visible, handleRecAlertsVisibility }) {
  const arrowInitialState = {
    id: false,
    nombre: false,
    pasaporte: false,
    correo: false,
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [vehiclesDetailVisibility, setVehiclesDetailVisibility] =
    useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [category, setCategory] = useState("name");
  const [aux, setAux] = useState(false);
  const [arrow, setArrow] = useState(arrowInitialState);

  useEffect(() => {
    dispatch(getRental());
    dispatch(getCars());
    dispatch(getUser());
  }, [aux]);

  let allUsers = useSelector((state) => state.rental.deletedUsers);
  let allCars = useSelector((state) => state.rental.allCars);
  let allRentals = useSelector((state) => state.rental.allRentals);

  function createRentalsComplete() {
    completeRentals = allUsers.map((u) => {
      let rentals = allRentals.filter((r) => r.userID == u.id);
      rentals = rentals.map((r) => {
        let vehicle = allCars.filter((c) => c.id == r.productID)[0].model;
        return {
          ...r,
          vehicle,
        };
      });
      if (rentals) {
        return {
          ...u,
          rentals,
        };
      }
    });
  }
  useEffect(() => {
    if (!allUsers.length || !allRentals.length || !allCars.length) {
      setAux(true);
    }
  }, [allRentals, allCars, allUsers]);

  if (aux === true && allCars.length) {
    createRentalsComplete();
    if (completeRentals && completeRentals[0] !== undefined) {
      setAux(false);
    }
  }

  function handleReload() {
    router.push("/AdminConsole");
    router.refresh();
    setAux(!aux);
    // handleVehiclesVisibility();
    // router.reload();
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [completeRentals]);

  useEffect(() => {
    dataToShow = completeRentals;
  }, [completeRentals]);

  let quantityPerPage = 5;
  let pages = [];
  let max = 1;
  if (dataToShow) {
    max = Math.ceil(dataToShow.length / quantityPerPage);
  }
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }
  useEffect(() => {
    if (dataToShow && dataToShow[0]) {
      setData(sliceData(dataToShow, currentPage, quantityPerPage));
    }
  }, [completeRentals, currentPage]);

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
    dataToShow = completeRentals;
    let results = dataToShow.filter((d) =>
      d[category].toLowerCase().includes(e.target.value.toLowerCase())
    );
    dataToShow = results;
    setData(sliceData(results, currentPage, quantityPerPage));
    setCurrentPage(1);
  }

  function handleSearchCategory(e) {
    setCategory(e.target.value);
  }

  function handleSort(sortCategory) {
    let ordenated = dataToShow.sort((a, b) => {
      if (a[sortCategory] < b[sortCategory]) {
        return -1;
      }
      if (a[sortCategory] > b[sortCategory]) {
        return 1;
      }
      return 0;
    });
    dataToShow = ordenated;
    setAux(!aux);
    setData(sliceData(ordenated, currentPage, quantityPerPage));
    setCurrentPage(1);
    setArrow({ ...arrowInitialState, [sortCategory]: true });
  }

  if (visible === false) return null;
  return (
    <section className="text-[10px] text-black dark:text-white sm:text-[12px] md:text-[16px]">
      <figure className="bg-white dark:bg-dark_blanco grid place-content-center sm:px-2 md:px-8 py-4 rounded-2xl">
        <div className="flex justify-between flex-wrap mr-6">
          <h3 className="text-[1.2em] pl-2">
            {t("users")}
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
        <p className={`${poppins} text-[0.9em] pl-2`}>{t("view-users")}</p>
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
            <option value="nombre">{t("name")}</option>
            <option value="pasaporte">{t("passport")}</option>
          </select>
        </div>
        <table className={`${poppins} mt-6`}>
          <tbody className="">
            <tr className="">
              <th
                onClick={() => handleSort("id")}
                className={`${rubik} min-w-[50px] sm:min-w-[100px] px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.id ? "#Id ▼" : "#Id"}
              </th>
              <th
                onClick={() => handleSort("nombre")}
                className={`${rubik} min-w-[90px] sm:min-w-[150px] px-2 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.nombre ? "Nombre ▼" : "Nombre"}
              </th>
              <th
                onClick={() => handleSort("pasaporte")}
                className={`${rubik} min-w-[60px] sm:min-w-[150px] px-1 md:px-4 text-left break-all hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.pasaporte ? "Pasaporte ▼" : "Pasaporte"}
              </th>
              <th
                onClick={() => handleSort("correo")}
                className={`${rubik} min-w-[60px] sm:min-w-[200px] px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.correo ? "Correo ▼" : "Correo"}
              </th>
              <th className={`${rubik} px-1 md:px-4 text-left`}>
                {t("actions")}
              </th>
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
                  <td className=" p-4">{d.id}</td>
                  <td className=" break-all">{d.username}</td>
                  <td className="p-4 text-right"> {d.passport}</td>
                  <td className="p-4 text-right"> {d.emailUser}</td>
                  <td className=" p-4">
                    <button
                      onClick={() => handleVehiclesVisibility(d)}
                      className="px-2 py-1 border-[1px] rounded-md bg-gris_fondo dark:bg-dark_fondo border-negro_fondo hover:bg-negro_fondo hover:text-white">
                      <PiPlusCircleBold />
                    </button>
                    <button
                      onClick={() => handleRecAlertsVisibility("usuario", d.id)}
                      className="px-2 ml-2 py-1 border-[1px] rounded-md bg-green-500 text-white border-negro_fondo hover:bg-negro_fondo hover:text-white">
                      <RiRecycleFill />
                    </button>
                  </td>
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
            currentPage === max || max === 0
              ? "px-3 py-1 shadow-sm shadow-black bg-negro_fondo text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
              : "px-3 py-1 shadow-sm shadow-black bg-naranja_enf text-white rounded-md hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
          }>
          <FiChevronRight className="symbolSearch" />
        </button>
      </div>
      <UserDetail
        visible={vehiclesDetailVisibility}
        data={detailData}
        handleVisible={handleVehiclesVisibility}
      />
    </section>
  );
}

export default CarRecTable;
