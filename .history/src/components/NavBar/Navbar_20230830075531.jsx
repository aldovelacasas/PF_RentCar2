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
  { text: "Vehiculos", href: "/" },
  { text: "Testimoniales", href: "/" },
  { text: "Contáctanos", href: "/" },
  { text: "Ingresar", href: "/" },
];
const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <>
      <nav className={`nav`}>
        <div className="boxLogo">
          <Link href="/about">
            <h1 className="logo">LOGO</h1>
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
