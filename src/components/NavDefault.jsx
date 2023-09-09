"use client";
import { Rubik, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

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

// import Link from "next/link";
import React, { useState } from "react";
// import NavItem from "./NavItem";
import "./NavBar/nav.css";
import Link from "next/link";
// import { useAuth } from "@/app/context/AuthContext";

export default function NavDefault() {
  const [navActive, setNavActive] = useState(false);

  const route = usePathname();

  let login = false;

  return (
    <nav
      className={` ${rubik} sticky top-0 w-full z-20 lg:text-[1.5em] flex flex-wrap justify-between  items-center px-5 py-4`}>
      <div className="flex gap-8">
        <Link href="/homePage">
          <img
            src="https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
            className="border-black border-[1.5px] rounded-sm w-[80px] md:w-[150px]"
          />
        </Link>
      </div>
      <div
        onClick={() => setNavActive(!navActive)}
        className={
          "md:hidden flex flex-col p-[10px] rounded-full hover:bg-slate-400 cursor-pointer"
        }>
        <div className="bg-black w-[45px] h-[6px] p-0 m-0 mb-[6px] mt-[6px]" />
        <div className="bg-black w-[45px] h-[6px] p-0 m-0 mb-[6px]" />
        <div className="bg-black w-[45px] h-[6px] p-0 m-0 mb-[6px]" />
      </div>
      <section
        className={
          navActive
            ? "flex flex-col gap-8 h-full bg-white fixed top-[95px] right-0 w-3/5 pl-8 pt-8"
            : "md:flex md:gap-4 lg:gap-8 md:mr-3 hidden items-center"
        }>
        <li
          className={
            route === "/homePage"
              ? "list-none text-naranja_enf underline"
              : "list-none hover:text-naranja_enf transition ease-in-out duration-300  "
          }>
          <Link href="/homePage">Inicio</Link>
        </li>

        <li
          className={
            route === "/vehiculos"
              ? "list-none text-naranja_enf underline"
              : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
          }>
          <Link href="/vehiculos">Vehículos</Link>
        </li>
        <li
          className={
            route === "/testimoniales"
              ? "list-none text-naranja_enf underline"
              : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
          }>
          <Link href="/testimoniales">Testimoniales</Link>
        </li>
        <li
          className={
            route === "/about"
              ? "list-none text-naranja_enf underline"
              : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
          }>
          <Link href="/about">Nosotros</Link>
        </li>
        <li
          className={
            route === "/contact"
              ? "list-none text-naranja_enf underline"
              : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
          }>
          <Link href="/contact">Contáctanos</Link>
        </li>
        {login ? (
          <li
            className={
              route === "/profile"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/profile">Perfil</Link>
          </li>
        ) : (
          <li
            className={
              route === "/login"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/login">Ingresar</Link>
          </li>
        )}
      </section>
    </nav>
  );
}