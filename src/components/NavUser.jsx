/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Rubik, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { BsFillBrightnessHighFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import ChatBar from "@/components/ChatBar";
import React, { useState } from "react";
import "./NavBar/nav.css";
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

export default function NavUser({ userName, userPhoto, userEmail }) {
  const user = useSelector((state) => state.user.currentUser);
  const { t } = useTranslation();
  if (user.userImage) {
    userPhoto = user.userImage;
  }

  const [navActive, setNavActive] = useState(false);
  let bodyClass = document.body.classList;
  const [dark, setDark] = useState(bodyClass.contains("dark"));

  const { logOut } = useAuth();

  const route = usePathname();

  const router = useRouter();

  function handleLogOut() {
    logOut();
    router.push("/login");
  }

  function handleDarkMode() {
    document.body.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <>
      <nav
        className={` ${rubik} sticky text-black dark:text-white top-0 w-full z-20 lg:text-[1.5em] flex flex-wrap justify-between px-5 py-4`}>
        <div className="flex gap-8">
          <Link href="/UserDashBoard">
            <img
              href="/UserDashBoard"
              src="https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
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
              route === "/UserDashBoard"
                ? "list-none text-naranja_enf underline "
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300   "
            }>
            <Link href="/UserDashBoard">{t("dashboard")}</Link>
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
              route === "/contact"
                ? "list-none text-naranja_enf underline"
                : "list-none hover:text-naranja_enf transition ease-in-out duration-300 "
            }>
            <Link href="/contact">{t("contact")}</Link>
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
                {t("hello")}, {userName ?? userEmail}
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
        className={`absolute top-[85px] right-2 p-4 py-2 dark:bg-gris_fondo bg-dark_fondo "
        } rounded-sm shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
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
