/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Rubik, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

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

export default function NavUser({ userName, userPhoto }) {
  let bodyClass = document.body.classList;
  const [dark, setDark] = useState(bodyClass.contains("dark"));
  const [navActive, setNavActive] = useState(false);
  const { logOut } = useAuth();
  const { t } = useTranslation();

  const route = usePathname();

  function handleDarkMode() {
    document.body.classList.toggle("dark");
    setDark(!dark);
  }

  const router = useRouter();

  function handleLogOut() {
    logOut();
    router.push("/login");
  }

  return (
    <>
      <nav
        className={` ${rubik} sticky text-black dark:text-white top-0 w-full z-20 lg:text-[1.5em] flex flex-wrap justify-between content-center px-5 py-4`}>
        <div className="flex gap-8 ">
          <Link href="/AdminConsole">
            <img
              href="/AdminConsole"
              src={
                !document.body.classList.contains("dark")
                  ? "https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
                  : "https://drive.google.com/uc?export=download&id=1synJL4Eoyp5TbR8rqZrBQaFu1vOAEKAo"
              }
              className="border-black border-[1.5px] rounded-sm w-[150px] "
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
              route === "/AdminConsole"
                ? "list-none text-naranja_enf underline "
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300  "
            }>
            <Link href="/AdminConsole">{t("console")}</Link>
          </li>

          {/* <li
            className={
              route === "/AdminConsole/Recoveries"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/AdminConsole/Recoveries">{t("recoveries")}</Link>
          </li> */}

          <li
            className={
              route === "/AdminConsole/chat-admin"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/AdminConsole/chat-admin">Chat</Link>
          </li>

          <div className="flex items-center">
            <a href="/profile">
              <img
                src={userPhoto}
                alt={userName}
                className="w-14 h-14 object-fill rounded-full mr-2"
              />
            </a>
            <div className="">
              <span className="block w-full text-sm pb-1">
                {t("hello")}, {userName}
              </span>
              <button
                onClick={handleLogOut}
                className=" block w-full bg-naranja_enf hover:bg-negro_fondo text-white text-xs font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                {t("logout")}
              </button>
            </div>
          </div>
        </section>
      </nav>
      <button
        onClick={handleDarkMode}
        className={`absolute top-[100px] right-2 p-4 py-2 dark:bg-gris_fondo bg-dark_fondo rounded-sm shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
        {dark ? (
          <BsFillBrightnessHighFill className="text-black" />
        ) : (
          <BsFillMoonStarsFill className="text-white" />
        )}
      </button>
    </>
  );
}
