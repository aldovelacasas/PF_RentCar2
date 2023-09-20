"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import NavDefault from "../NavDefault";
import NavUser from "../NavUser";
import NavAdmin from "../NavAdmin";
import { setCurrentUser, getUser, getRental } from "@/store/slices/user";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  let users = useSelector((state) => state.user.allUsers);
  let rentals = useSelector((state) => state.user.allRentals);

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUser()).then(dispatch(getRental()));
    }
  }, [user]);

  useEffect(() => {
    let res = users.filter((u) => u.emailUser === user.email);
    let userRentals = rentals?.filter((r) => r.userID === res.id);
    if (res && res[0]) {
      let { id, uid, username, emailUser, passport, phone, image, isActive } =
        res[0];
      userRentals = userRentals;
      dispatch(
        setCurrentUser({
          id: id,
          uid: uid,
          username: username ?? user.displayName,
          emailUser: emailUser,
          passport: passport ?? "",
          phone: phone ?? "",
          image: image ?? user.photoURL,
          isActive: isActive,
          userRentals: userRentals,
        })
      );
    }
  }, [users]);

  return (
    <div className="sticky top-0 bg-gris_frente dark:bg-dark_frente z-20">
      {user?.displayName === "Auto Contact" ? (
        <NavAdmin userName={user?.displayName} userPhoto={user?.photoURL} />
      ) : user ? (
        <NavUser
          userName={user?.displayName}
          userPhoto={user?.photoURL}
          userEmail={user?.userEmail}
        />
      ) : (
        <NavDefault></NavDefault>
      )}
    </div>
  );
};

export default Navbar;
