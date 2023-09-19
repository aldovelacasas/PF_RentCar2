/* eslint-disable react-hooks/exhaustive-deps */
import { Rubik, Poppins } from "next/font/google";
import { sliceData, slicePage } from "@/libs/functions";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import RentalDetail from "./RentalDetail";
import { useDispatch, useSelector } from "react-redux";
import { getRental, getCars, getUser } from "@/store/slices/rental";
import axios from "axios";

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

function RentalsTable({ visible }) {
  const arrowInitialState = {
    id: false,
    user: false,
    vehicle: false,
    status: false,
    monto: false,
  };

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [rentalDetailVisibility, setRentalDetailVisibility] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [category, setCategory] = useState("vehicle");
  const [aux, setAux] = useState(false);
  const [arrow, setArrow] = useState(arrowInitialState);

  useEffect(() => {
    dispatch(getRental());
    dispatch(getCars());
    dispatch(getUser());
  }, []);

  let allUsers = useSelector((state) => state.rental.allUsers);
  let allCars = useSelector((state) => state.rental.allCars);
  let allRentals = useSelector((state) => state.rental.allRentals);

  function createRentalsComplete() {
    completeRentals = allRentals.map((r) => {
      let user = allUsers.filter((u) => u.id == r.userID)[0];
      let vehicle = allCars.filter((c) => c.id === r.productID)[0];
      if (user && vehicle) {
        return {
          ...r,
          user: user.userName ?? user.emailUser,
          vehicle: vehicle.name,
          image: vehicle.image,
          status:
            r.statusB == 1 && new Date() > new Date(r.fecha_fin)
              ? "terminado"
              : r.statusB == 1 && new Date() < new Date(r.fecha_fin)
              ? "activo"
              : "cancelado",
        };
      }
    });
  }

  useEffect(() => {
    if (!allUsers.length || !allRentals.length || !allCars.length) {
      setAux(true);
    }
  }, [allRentals, allCars, allUsers]);
  if (aux === true) {
    createRentalsComplete();
    if (completeRentals && completeRentals[1] !== undefined) {
      setAux(!aux);
    }
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [completeRentals]);

  useEffect(() => {
    dataToShow = completeRentals;
  }, [completeRentals]);

  let quantityPerPage = 10;
  let max = Math.ceil(dataToShow?.length / quantityPerPage);
  let pages = [];
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

  const handleRentVisibility = (data) => {
    if (data) {
      setDetailData(data);
    }
    setRentalDetailVisibility(!rentalDetailVisibility);
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

  console.log(dataToShow);
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
    // setAux(!aux);
    setData(sliceData(ordenated, currentPage, quantityPerPage));
    setCurrentPage(1);
    setArrow({ ...arrowInitialState, [sortCategory]: true });
  }

  let total = 0;
  if (data && data.length) {
    dataToShow.forEach((d) => (total += 5));
    total = total * 2;
  }

  async function handleCancel(id) {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ statusB: 0 }));
    const res = await axios
      .put(`/api/bookings/${id}`, formData)
      .then((res) => console.log(res));
  }

  async function handleActive(id) {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ statusB: 1 }));
    const res = await axios
      .put(`/api/bookings/${id}`, formData)
      .then((res) => console.log(res));
  }

  if (visible === false) return null;
  return (
    <section className="text-[10px] sm:text-[12px] md:text-[16px] text-black dark:text-white">
      <figure className="bg-white dark:bg-dark_blanco grid place-content-center sm:px-2 md:px-8 py-4 rounded-2xl">
        <h3 className="text-[1.2em]">
          Rentas
          <span
            className={`${poppins} text-[0.8em] bg-gris_fondo dark:bg-dark_fondo ml-2 py-1 px-2 rounded-full`}>
            {dataToShow?.length}
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
            <option value="vehicle">Vehiculo</option>
            <option value="user">Usuario</option>
          </select>
        </div>

        <table className={`${poppins} bg-white dark:bg-dark_blanco mt-6`}>
          <tbody className="">
            <tr className="">
              <th
                onClick={() => handleSort("id")}
                className={`${rubik} sm:px-2 md:px-4 md:min-w-[80px] text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                {arrow.id ? "#Id ▼" : "#Id"}
              </th>
              <th
                onClick={() => handleSort("user")}
                className={`${rubik} hidden md:table-cell sm:px-1 md:px-4 md:min-w-[160px] lg:min-w-[200px] text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo`}>
                {arrow.user ? "Usuario ▼" : "Usuario"}
              </th>
              <th
                onClick={() => handleSort("vehicle")}
                className={`${rubik} sm:px-1 md:px-4 md:min-w-[175px] text-left lg:min-w-[200px] hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.vehicle ? "Vehiculo ▼" : "Vehiculo"}
              </th>
              <th
                onClick={() => handleSort("status")}
                className={`${rubik} hidden md:table-cell sm:px-1 md:px-4 md:min-w-[150px] text-left lg:min-w-[150px] hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.status ? "Estado ▼" : "Estado"}
              </th>
              <th
                onClick={() => handleSort("monto")}
                className={`${rubik} px-1 md:px-4 text-left hover:text-naranja_enf cursor-pointer hover:bg-gris_fondo `}>
                {arrow.monto ? "Monto ▼" : "Monto"}
              </th>
              <th className={`${rubik} px-1 md:px-4 text-left `}>Detalle</th>
            </tr>
            {data?.map((d) => {
              let ultimo;
              let estado = d.status
                .charAt(0)
                .toUpperCase()
                .concat(d.status.slice(1));
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
                  <td className=" p-4">{d.id}</td>
                  <td className=" p-4 hidden md:table-cell">{d.user}</td>
                  <td className=" p-4 hidden md:table-cell">{d.vehicle}</td>
                  <td className="p-4">
                    <span
                      className={
                        d.status === "activo"
                          ? "bg-[#d1fae5] text-[#047857] inline px-2 rounded-md"
                          : d.status === "terminado"
                          ? "bg-[#f3f4f6] inline px-2 rounded-md text-black"
                          : "bg-[#ffe4e6] text-[#be123c] inline px-2 rounded-md"
                      }>
                      {estado}
                    </span>
                  </td>
                  <td className=" p-4 text-right">{d.monto}</td>
                  <td className=" p-4">
                    <button
                      onClick={() => handleRentVisibility(d)}
                      className="px-2 md:px-4 py-1 border-[1px] rounded-md border-negro_fondo dark:bg-dark_fondo hover:bg-negro_fondo hover:text-white">
                      Detalle
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
        <span className="bg-white dark:bg-dark_blanco px-4 py-1 border-2 border-black">
          ${total.toLocaleString()}
        </span>
      </p>
      <RentalDetail
        visible={rentalDetailVisibility}
        data={detailData}
        handleVisible={handleRentVisibility}
        handleActive={handleActive}
        handleCancel={handleCancel}
      />
    </section>
  );
}

export default RentalsTable;
