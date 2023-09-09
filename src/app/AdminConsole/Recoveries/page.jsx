"use client";

import { useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import CarRecTable from "@/components/CarRecTable";
import UsersRecTable from "@/components/UsersRecTable";
import HelpForm from "@/components/HelpForm";
import { useRouter } from "next/navigation";
import Alerts from "@/components/Alerts";

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

  function handleVisibility(name) {
    setVisibility({
      ...falseState,
      [name]: !visibility[name],
    });
  }

  function handleAlertsVisibility() {
    setAlertsVisibility(!alertsVisibility);
    document.body.classList.toggle("stopScroll");
  }

  if (!validation) {
    router.push("/");
    return null;
  }
  return (
    <div className="grid bg-gris_frente overflow-x-hidden">
      <header
        className={`bg-gris_fondo relative ${rubik} space-y-0 space-x-2.5 p-10 md:text-[1.4em] h-[175px] flex items-center overflow-x-clip`}>
        <h1 className=" text-[1.2em] sm:text-[2em]  leading-6 pl-6">
          Consola de administración
        </h1>
      </header>
      <main
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 sm:text-[1.2em] grid gap-[12px]`}>
        <h2 className="text-[1.5em] pl-2">
          Recuperación de elementos eliminados
        </h2>
        <div
          className={
            visibility.rentalsVisibility
              ? "bg-gris_fondo px-2 rounded-2xl break-words grid place-items-center"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("rentalsVisibility")}
            className={
              !visibility.rentalsVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Vehículos dados de baja ▼
          </h3>
          <CarRecTable
            visible={visibility.rentalsVisibility}
            handleAlertsVisibility={handleAlertsVisibility}
          />
        </div>
        <div
          className={
            visibility.vehiclesVisibility
              ? "bg-gris_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("vehiclesVisibility")}
            className={
              !visibility.vehiclesVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Usuarios dados de baja ▼
          </h3>
          <UsersRecTable
            visible={visibility.vehiclesVisibility}
            onClick={() => setVehiclesVisibility(!vehiclesVisibility)}
          />
        </div>
        <div
          className={
            visibility.formVisibility
              ? "bg-gris_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
              : ""
          }>
          <h3
            onClick={() => handleVisibility("formVisibility")}
            className={
              !visibility.formVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
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
          ¿Estás seguro de recuperar este vehículo?
        </p>
        <p className="text-[0.8em] mt-[-6px] px-4">{`(Podrás ver los vehículos eliminados en la página de restauración)`}</p>

        <div className="flex w-1/2 justify-evenly">
          <button
            className={` bg-naranja_enf ${rubik} text-white text-[1em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            Recuperar
          </button>
          <button
            onClick={handleAlertsVisibility}
            className={` bg-negro_fondo ${rubik} text-white text-[1em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
            Cerrar
          </button>
        </div>
      </Alerts>
    </div>
  );
}

export default Recoveries;
