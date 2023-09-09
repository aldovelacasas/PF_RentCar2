"use client";

import Link from "next/link";
// import Image from "next/image";
import React, { useState } from "react";
// import Logo from "./Logo";
import NavItem from "./NavItem";
// import "./nav.css";
import { useAuth } from "@/app/context/AuthContext";
import NavDefault from "../NavDefault";
import NavUser from "../NavUser";
import NavAdmin from "../NavAdmin";

const Navbar = () => {
  const { user } = useAuth();
  // console.log(user);

  return (
    <div className="">
      {user?.displayName === "Auto Contact" ? (
        <NavAdmin userName={user?.displayName} userPhoto={user?.photoURL} />
      ) : user ? (
        <NavUser userName={user?.displayName} userPhoto={user?.photoURL} />
      ) : (
        <NavDefault></NavDefault>
      )}
    </div>
  );
};

export default Navbar;
