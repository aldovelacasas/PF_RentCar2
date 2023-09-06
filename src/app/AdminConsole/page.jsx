"use client";

import { useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import RentalsTable from "@/components/RentalsTable";
import VehiclesTable from "@/components/VehiclesTable";
import HelpForm from "@/components/HelpForm";
import { useRouter } from "next/navigation";

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

function AdminMain() {
  const [rentalsVisibility, setRentalsVisibility] = useState(true);
  const [vehiclesVisibility, setVehiclesVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  let router = useRouter();

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
        <h2 className="text-[1.5em] pl-2">Bienvenido Admin</h2>
        <div
          className={
            rentalsVisibility &&
            "bg-gris_fondo px-2 rounded-2xl break-words grid place-items-center"
          }>
          <h3
            onClick={() => setRentalsVisibility(!rentalsVisibility)}
            className={
              !rentalsVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Vehículos en renta ▼
          </h3>
          <RentalsTable visible={rentalsVisibility} />
        </div>
        <div
          className={
            vehiclesVisibility &&
            "bg-gris_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
          }>
          <h3
            onClick={() => setVehiclesVisibility(!vehiclesVisibility)}
            className={
              !vehiclesVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Administrar vehículos ▼
          </h3>
          <VehiclesTable visible={vehiclesVisibility} />
        </div>
        <div
          className={
            formVisibility &&
            "bg-gris_fondo pb-2 rounded-2xl grid place-items-center lg:pb-6"
          }>
          <h3
            onClick={() => setFormVisibility(!formVisibility)}
            className={
              !formVisibility
                ? `lg:px-[8em] text-center text-[1em] mb-2 bg-gris_fondo px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
                : `w-4/5 md:w-3/4 text-[1em] mb-2 bg-negro_fondo text-white text-center px-4 py-1 shadow-sm shadow-black hover:shadow-md cursor-pointer rounded-md hover:shadow-black active:shadow-inner active:shadow-black`
            }>
            ▼ Solicitar ayuda ▼
          </h3>
          <HelpForm visible={formVisibility} />
        </div>
      </main>
    </div>
  );
}

export default AdminMain;
