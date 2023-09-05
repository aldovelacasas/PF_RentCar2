"use client";

import Link from "next/link";
// import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import NavItem from "./NavItem";
import "./nav.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Vehiculos", href: "/vehiculos" },
  { text: "Testimoniales", href: "/testimoniales" },
  { text: "Contáctanos", href: "/contact" },
  { text: "Ingresar", href: "/login" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const { logOut } = useAuth();

  const route = usePathname();

  return (
    <>
      <nav className={`nav navBar`}>
        <div className="boxLogo">
          <Link href="/">
            <img
              src="https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
              className="border-black border-[1.5px] rounded-sm w-[80px] md:w-[150px]"
            />
          </Link>
          <div className="HomeLogo">
            <Link href="/">
              <span className={route === "/homePage" ? "current" : "nav__item"}>
                Home
              </span>
            </Link>
          </div>
        </div>

        <div>
          <button
            onClick={logOut}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            LOG OUT
          </button>
        </div>

        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
              className={
                menu.text === "Home" && route === "/homePage"
                  ? "Home current"
                  : menu.text === "Home"
                  ? "HomeMenu"
                  : route === menu.href
                  ? "current"
                  : ""
              }>
              <NavItem
                active={activeIdx === idx}
                className={menu.text === "Home" ? "HomeMenu" : ""}
                {...menu}
              />
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
