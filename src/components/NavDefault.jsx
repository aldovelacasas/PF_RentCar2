/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Rubik, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import "./NavBar/nav.css";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import ChatBar from "@/components/ChatBar";
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

export default function NavDefault() {
  let bodyClass = document.body.classList;
  const [dark, setDark] = useState(bodyClass.contains("dark"));
  const [navActive, setNavActive] = useState(false);
  const { t } = useTranslation();

  const route = usePathname();

  let login = false;

  function handleDarkMode() {
    document.body.classList.toggle("dark");
    setDark(!dark);
  }
  return (
    <>
      <nav
        className={` ${rubik} sticky top-0 w-full dark:text-white text-black dark:bg-negro_fondo bg-transparent z-20 md:text-[0.8em] lg:text-[1em] flex flex-wrap justify-between  items-center px-5 py-4`}>
        <div className="flex gap-8">
          <Link href="/homePage">
            <img
              src={
                !document.body.classList.contains("dark")
                  ? "https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
                  : "https://drive.google.com/uc?export=download&id=1synJL4Eoyp5TbR8rqZrBQaFu1vOAEKAo"
              }
              className="border-black border-[1.5px] rounded-sm w-[150px]"
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
              ? "flex flex-col gap-8 h-full bg-white dark:bg-dark_blanco fixed top-[95px] right-0 w-3/5 pl-8 pt-8"
              : "md:flex md:gap-4 lg:gap-8 md:mr-3 hidden items-center"
          }>
          <li
            className={
              route === "/homePage"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/homePage">{t("home")}</Link>
          </li>

          <li
            className={
              route === "/vehiculos"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/vehiculos">{t("cars")}</Link>
          </li>
          <li
            className={
              route === "/testimoniales"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/testimoniales">{t("testimonials")}</Link>
          </li>
          <li
            className={
              route === "/about"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/about">{t("about")}</Link>
          </li>
          <li
            className={
              route === "/contact"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/contact">{t("contact")}</Link>
          </li>
          {login ? (
            <li
              className={
                route === "/profile"
                  ? "list-none text-naranja_enf underline"
                  : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
              }>
              <Link href="/profile">{t("profile")}</Link>
            </li>
          ) : (
            <li
              className={
                route === "/login"
                  ? "list-none text-naranja_enf underline"
                  : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
              }>
              <Link href="/login">{t("login")}</Link>
            </li>
          )}
        </section>
      </nav>
      <button
        onClick={handleDarkMode}
        className={`absolute top-[85px] right-2 p-4 py-2 dark:bg-gris_fondo bg-dark_fondo rounded-sm shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
        {dark ? (
          <BsFillBrightnessHighFill className="text-black" />
        ) : (
          <BsFillMoonStarsFill className="text-white" />
        )}
      </button>
      <LanguageSelector />
      <ChatBar />
    </>
  );
}
