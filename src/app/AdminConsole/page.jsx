"use client";
import { useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import RentalsTable from "@/components/RentalsTable";
import VehiclesTable from "@/components/VehiclesTable";
import CarRecTable from "@/components/CarRecTable";
import UsersRecTable from "@/components/UsersRecTable";
import HelpForm from "@/components/HelpForm";
import axios from "axios";
import Alerts from "@/components/Alerts";
import { useTranslation } from "react-i18next";
import { withAuth } from "@/withAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MonthGraph = dynamic(() => import("@/components/MonthGraph"), {
  ssr: false,
});

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

function AdminMain() {
  const [aux, setAux] = useState(false);

  const router = useRouter();

  const initialState = {
    graphVisibility: true,
    rentalsVisibility: false,
    vehiclesVisibility: false,
    formVisibility: false,
    usersRecVisibility: false,
    carRecVisibility: false,
  };

  const falseState = {
    graphVisibility: false,
    rentalsVisibility: false,
    vehiclesVisibility: false,
    formVisibility: false,
    usersRecVisibility: false,
    carRecVisibility: false,
  };

  const [alertsVisibility, setAlertsVisibility] = useState(false);
  const [alertsRecVisibility, setRecAlertsVisibility] = useState(false);
  const [visibility, setVisibility] = useState(initialState);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const { t } = useTranslation();

  if (visibility === falseState) {
    setVisibility(initialState);
  }

  function handleVisibility(name) {
    setVisibility({
      ...falseState,
      [name]: !visibility[name],
    });
  }

  function handleReload() {
    router.push("/AdminConsole");
    router.refresh();
    setAux(!aux);
    // router.reload();
  }

  async function handleDeletion() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ capacity: 0 }));
    const res = await axios
      .put(`/api/products/${id}`, formData)
      .then((res) => console.log(res));
    setAlertsVisibility(false);
    handleReload();
  }

  function handleAlertsVisibility(dataId) {
    setAlertsVisibility(!alertsVisibility);
    document.body.classList.toggle("stopScroll");
    setId(dataId);
  }

  function handleAlertsRecVisibility(category, dataID = "") {
    setRecAlertsVisibility(!alertsRecVisibility);
    document.body.classList.toggle("stopScroll");
    setId(dataID);
    setCategory(category);
  }

  async function handleVehicleRecovery() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ capacity: 5 }));
    const res = await axios
      .put(`/api/products/${id}`, formData)
      .then((res) => console.log(res));
    setRecAlertsVisibility(!alertsRecVisibility);
    handleReload();
  }

  async function handleUserRecovery() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ isActive: null }));
    const res = await axios
      .put(`/api/users/${id}`, formData)
      .then((res) => console.log(res));
    handleReload();
    setRecAlertsVisibility();
  }

  return (
    <div className="grid bg-gris_frente dark:bg-dark_frente overflow-x-hidden text-black dark:text-white">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo  relative ${rubik} space-y-0 space-x-2.5 p-10 md:text-[1.4em] h-[175px] flex items-center overflow-x-clip`}>
        <h1 className=" text-[1.2em] sm:text-[2em]  leading-6 pl-6">
          {t("consoleAdmin")}
        </h1>
      </header>
      <div className="flex flex-wrap ">
        <main
          className={`pl-4 lg:w-[20%] h-max pt-4 ${rubik} mx-[auto] grow-0 text-[0.8em] bg-gris_frente dark:bg-dark_frente pb-12 sm:text-[1.2em]`}>
          <h2 className="text-[1.5em] pl-2 mb-6">{t("welcomeAdmin")}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 sticky top-[150px]">
            <h3
              onClick={() => handleVisibility("graphVisibility")}
              className={
                !visibility.graphVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              {t("graph")}
            </h3>

            <h3
              onClick={() => handleVisibility("rentalsVisibility")}
              className={
                !visibility.rentalsVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              {t("rented")}
            </h3>

            <h3
              onClick={() => handleVisibility("vehiclesVisibility")}
              className={
                !visibility.vehiclesVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              {t("manageCars")}
            </h3>
            <h3
              onClick={() => handleVisibility("carRecVisibility")}
              className={
                !visibility.carRecVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              Vehículos dados de baja
            </h3>
            <h3
              onClick={() => handleVisibility("usersRecVisibility")}
              className={
                !visibility.usersRecVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              Usuarios dados de baja
            </h3>
            <h3
              onClick={() => handleVisibility("formVisibility")}
              className={
                !visibility.formVisibility
                  ? `text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                  : `text-center text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
              }>
              Solicitar ayuda
            </h3>
          </div>
        </main>
        <figure className="w-full lg:w-[75%] flex flex-wrap justify-center py-6">
          <MonthGraph visible={visibility.graphVisibility} />
          <RentalsTable visible={visibility.rentalsVisibility} />
          <VehiclesTable
            visible={visibility.vehiclesVisibility}
            handleAlertsVisibility={handleAlertsVisibility}
          />
          <UsersRecTable
            visible={visibility.usersRecVisibility}
            handleRecAlertsVisibility={handleAlertsRecVisibility}
          />
          <CarRecTable
            visible={visibility.carRecVisibility}
            handleAlertsVisibility={handleAlertsRecVisibility}
            handleReload={handleReload}
          />
          <HelpForm visible={visibility.formVisibility} />
        </figure>
      </div>
      <Alerts visible={alertsVisibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[1em] px-4">{t("deleteCar")}</p>
        <p className="text-[0.8em] mt-[-6px] px-4">{t("deleteCarRest")}</p>

        <div className="flex w-1/2 justify-evenly">
          <button
            onClick={handleAlertsVisibility}
            className={` bg-negro_fondo ${rubik} text-white text-[1em] px-4 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            {t("close")}
          </button>
          <button
            onClick={handleDeletion}
            className={` bg-naranja_enf ${rubik} text-white text-[1em] px-4 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            {t("delete")}
          </button>
        </div>
      </Alerts>
      <Alerts visible={alertsRecVisibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          Alerta
        </p>
        <p className="text-[1em] px-4">
          ¿Estás seguro de recuperar este {category}?
        </p>
        <div className="flex w-full justify-evenly">
          <button
            onClick={handleAlertsRecVisibility}
            className={` bg-negro_fondo ${rubik} text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            Cerrar
          </button>
          <button
            onClick={
              category === "vehículo"
                ? handleVehicleRecovery
                : handleUserRecovery
            }
            className={` bg-naranja_enf ${rubik} text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            Recuperar
          </button>
        </div>
      </Alerts>
    </div>
  );
}

export default withAuth(AdminMain);
