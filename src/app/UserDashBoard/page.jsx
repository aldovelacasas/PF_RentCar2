"use client";
import React from "react";
import OpinionForm from "@/components/OpinionForm";
import PromoCarousel from "@/components/PromoCarousel";
import UserRentals from "@/components/UserRentals";
import CarCarousel from "@/components/CarCarousel";
import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

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

function page() {
  const router = useRouter();
  const { user } = useAuth();
  if (user.email === "autocontactofficial@gmail.com") {
    router.push("/AdminConsole");
    return;
  }

  return (
    <main className="bg-gris_frente dark:bg-dark_frente text-black dark:text-white overflow-x-hidden">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo ${rubik} text-[1em] sm:text-[1.5em]  pl-[10%] space-y-0 space-x-2.5`}>
        <h1 className={`py-14 ml-2.5 text-[1.5em]`}>Panel de Usuario</h1>
      </header>
      <section
        className={`${rubik} text-[1.2em] md:text-[1.5em] bg-negro_fondo pb-12 dark:bg-dark_blanco`}>
        <h2 className=" pl-[10%] py-4 text-white">Promociones</h2>
        <PromoCarousel />
      </section>
      <section
        className={`${rubik} px-4 text-[1.2em] md:text-[1.5em] py-8 bg-gris_fondo dark:bg-dark_frente`}>
        <h2 className=" pl-[10%]">Tus rentas</h2>
        <UserRentals />
      </section>
      <section className={`${rubik} px-4 mt-6 pt-8 dark:bg-dark_blanco`}>
        <h2 className="text-[1.2em] md:text-[1.5em] pl-[10%]">
          Vehículos sugeridos:
        </h2>
        <CarCarousel className="" />
      </section>
      <section className={` text-[1.2em]`}>
        <OpinionForm />
      </section>
    </main>
  );
}

export default page;
