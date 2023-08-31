"use client";

import Link from "next/link";
// import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import NavItem from "./NavItem";
import "./nav.css";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Vehiculos", href: "/vehiculos" },
  { text: "Testimoniales", href: "/testimoniales" },
  { text: "Contáctanos", href: "/contacto" },
  { text: "Ingresar", href: "/" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <>
      <nav className={`nav navBar`}>
        <div className="boxLogo">
          <Link href="/">
            <img
              src="https://drive.google.com/uc?export=download&id=1xRyrzCMxPuU6OX97500cJd7M7Veh0KXR"
              width={80}
              className="border-black border-[1.5px] rounded-sm"
            />
          </Link>
          <div className="HomeLogo">
            <Link href="/">
              <span className="nav__item">Home</span>
            </Link>
          </div>
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
              className={menu.text === "Home" ? "HomeMenu" : ""}>
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
