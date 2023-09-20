"use client";

import { useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import CarRecTable from "@/components/CarRecTable";
import UsersRecTable from "@/components/UsersRecTable";
import HelpForm from "@/components/HelpForm";
import { useRouter } from "next/navigation";
import Alerts from "@/components/Alerts";
import { withAuth } from "@/withAuth";
import { useTranslation } from "react-i18next";
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

let validation = true;

function Recoveries() {
  let router = useRouter();
  const { t } = useTranslation();
  const initialState = {
    rentalsVisibility: true,
    vehiclesVisibility: false,
    formVisibility: false,
  };

  const falseState = {
    rentalsVisibility: false,
    vehiclesVisibility: false,
    formVisibility: false,
  };

  const [alertsVisibility, setAlertsVisibility] = useState(false);
  const [visibility, setVisibility] = useState(initialState);
  const [category, setCategory] = useState("");
  const [id, setId] = useState(null);
  const [aux, setAux] = useState(false);

  function handleVisibility(name) {
    setVisibility({
      ...falseState,
      [name]: !visibility[name],
    });
  }

  async function handleVehicleRecovery() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ capacity: 5 }));
    const res = await axios
      .put(`/api/products/${id}`, formData)
      .then((res) => console.log(res));
    handleReload();
  }

  async function handleUserRecovery() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ isActive: null }));
    const res = await axios
      .put(`/api/users/${id}`, formData)
      .then((res) => console.log(res));
    handleReload();
  }

  function handleAlertsVisibility(category, dataId) {
    setAlertsVisibility(!alertsVisibility);
    document.body.classList.toggle("stopScroll");
    setId(dataId);
    setCategory(category);
  }

  function handleReload() {
    router.push("/AdminConsole/Recoveries");
    router.refresh();
    setAux(!aux);
    // router.reload();
  }

  if (!validation) {
    router.push("/");
    return null;
  }
  return (
    <div className="grid bg-gris_frente dark:bg-dark_frente overflow-x-hidden text-black dark:text-white">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo relative ${rubik} space-y-0 space-x-2.5 p-10 md:text-[1.4em] h-[175px] flex items-center overflow-x-clip`}>
        <h1 className=" text-[1.2em] sm:text-[2em]  leading-6 pl-6">
          {t("consoleAdmin")}
        </h1>
      </header>
      <main
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente dark:bg-dark_frente pb-12 sm:text-[1.2em] grid gap-[12px]`}>
        <h2 className="text-[1.5em] pl-2">{t("recup-admin")}</h2>
        <div
          className={
            visibility.rentalsVisibility
              ? "bg-gris_fondo dark:bg-dark_fondo px-2 rounded-2xl break-words grid place-items-center"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("rentalsVisibility")}
            className={
              !visibility.rentalsVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Vehículos dados de baja ▼
          </h3>
          <CarRecTable
            visible={visibility.rentalsVisibility}
            handleAlertsVisibility={handleAlertsVisibility}
            handleReload={handleReload}
          />
        </div>
        <div
          className={
            visibility.vehiclesVisibility
              ? "bg-gris_fondo dark:bg-dark_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("vehiclesVisibility")}
            className={
              !visibility.vehiclesVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Usuarios dados de baja ▼
          </h3>
          <UsersRecTable
            visible={visibility.vehiclesVisibility}
            handleAlertsVisibility={handleAlertsVisibility}
          />
        </div>
        <div
          className={
            visibility.formVisibility
              ? "bg-gris_fondo dark:bg-dark_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("formVisibility")}
            handleAlertsVisibility={handleAlertsVisibility}
            className={
              !visibility.formVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo dark:bg-dark_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo dark:bg-dark_blanco text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Solicitar ayuda ▼
          </h3>
          <HelpForm visible={visibility.formVisibility} />
        </div>
      </main>
      <Alerts visible={alertsVisibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          Alerta
        </p>
        <p className="text-[1em] px-4">
          ¿Estás seguro de recuperar este {category}?
        </p>
        <div className="flex w-full justify-evenly">
          <button
            onClick={handleAlertsVisibility}
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

export default withAuth(Recoveries);
