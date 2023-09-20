/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Alerts from "@/components/Alerts";
import { Rubik, Poppins } from "next/font/google";
import { validateUserForm } from "@/libs/functions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { getUser, setCurrentUser } from "@/store/slices/user";

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

function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { t } = useTranslation();

  let users = useSelector((state) => state.user.allUsers);
  let rentals = useSelector((state) => state.user.allRentals);
  const [aux, setAux] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      dispatch(getUser());
    }
  }, [user, aux]);

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

  const inputsInitialValue = {
    nombre: currentUser.userName,
    correo: currentUser.userEmail,
    pasaporte: currentUser.userPassport,
    telefono: currentUser.userPhone,
    imagen: currentUser.userImage,
  };

  useEffect(() => {
    setInputs(inputsInitialValue);
  }, [currentUser]);

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(inputsInitialValue);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [imageAlertVisibility, setImageAlertVisibility] = useState(false);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validateUserForm({ ...inputs, [e.target.name]: e.target.value }));
  }

  function handleVisible() {
    setVisibility(!visibility);
    document.body.classList.toggle("stopScroll");
  }

  function handleFormVisibility() {
    setFormVisibility(!formVisibility);
    document.body.classList.toggle("stopScroll");
  }

  async function handleSubmit() {
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength) {
      let id = currentUser.userId;
      let data = {
        username: inputs.nombre,
        emailUser: inputs.correo,
        passport: inputs.pasaporte,
        phone: inputs.telefono,
      };
      const fdata = new FormData();
      fdata.append("data", JSON.stringify(data));
      const res = axios
        .put(`api/users/${id}`, fdata)
        .then(console.log("success"));
      handleFormVisibility();
    }
  }

  const handleImage = () => {
    const fileInput = document.getElementById("fileImage");
    fileInput.click();
  };

  async function handleDelete() {
    let formData = new FormData();
    formData.append("data", JSON.stringify({ isActive: false }));
    const res = await axios
      .put(`/api/users/${currentUser.userId}`, formData)
      .then((res) => console.log(res));
  }

  function handleReload() {
    router.push("/profile");
    router.refresh();
    console.log("reload");
    setAux(!aux);
    setImageAlertVisibility(false);
    // router.reload();
  }

  const imageChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await axios.put("/api/users/" + currentUser.userId, formData);
    setImageAlertVisibility(true);
  };

  return (
    <div className="grid text-black dark:text-white bg-gris_frente dark:bg-dark_frente md:text-[1.5em] lg:text-[2em]">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1em] mt-2 pl-4`}>{t("profile")}</p>
      </header>
      <main className="bg-white dark:bg-dark_blanco rounded-2xl w-4/5 place-self-center  py-6">
        <h1 className={`${rubik} text-[1.5em] pl-[10%]`}>{inputs.nombre}</h1>
        <div className="grid gap-8 place-content-center w-full overflow-hidden">
          <section className="w-full place-self-center bg-gris_fondo dark:bg-dark_fondo rounded-2xl grid p-8">
            <h3 className="w-fit font-bold mb-2 text-[1.2em]">
              {t("info-cuenta")}:
            </h3>
            <div className="grid lg:grid-cols-2">
              <div className="grid place-content-center w-full">
                <img
                  src={inputs.imagen}
                  alt={`Imagen de perfil de ${inputs.nombre}`}
                  className="w-[200px] h-[200px] object-fill rounded-full bg-white dark:bg-dark_blanco mb-6 mx-[auto]"
                />
                <input
                  type="file"
                  className="hidden"
                  id="fileImage"
                  accept="image/*"
                  onChange={imageChange}></input>
                <button
                  onClick={handleImage}
                  className={` bg-negro_fondo dark:bg-dark_blanco ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                  {t("camb-foto")}
                </button>
              </div>
              <div className="grid place-content-center w-fit">
                <p className="py-2">
                  <span className="font-bold ">{t("mail")}: </span>
                  {inputs.correo}
                </p>
                <p className="py-2">
                  <span className="font-bold">{t("passport")}: </span>
                  {inputs.pasaporte}
                </p>
                <p className="py-2">
                  <span className="font-bold">{t("phone")}: </span>
                  {inputs.telefono}
                </p>
                <hr className="border-[2px] border-black my-4 dark:border-white" />
                <button
                  onClick={handleFormVisibility}
                  className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                  {t("edit-info")}
                </button>
              </div>
            </div>
          </section>
          <section className="w-full bg-gris_fondo dark:bg-dark_fondo rounded-2xl p-8 place-self-center">
            <h3 className="font-bold mb-2 text-[1.2em]">
              {t("config-cuenta")}:
            </h3>
            <fieldset>
              <input
                type="checkbox"
                name="promociones"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="promociones">{t("of-mail")}</label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="alertas"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="alertas">{t("alert-mail")}</label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="llamadas"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="llamadas">{t("sms")}</label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="publicidad"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="publicidad">{t("permis")}</label>
            </fieldset>
            <hr className="border-[1px] mt-6 border-black dark:border-white" />
            <button
              onClick={handleVisible}
              className={` bg-red-600 ${rubik} mt-12 text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              {t("baja")}
            </button>
          </section>
        </div>
      </main>
      <Alerts visible={visibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[0.8em] px-4">{t("seg-baja")}</p>
        <div className="flex justify-evenly w-full">
          <button
            onClick={handleVisible}
            className={` bg-negro_fondo ${rubik} text-white text-[0.8em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("no-baja")}
          </button>
          <button
            onClick={handleDelete}
            className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("yes-baja")}
          </button>
        </div>
      </Alerts>
      <Alerts visible={formVisibility} top={15}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("edit-info")}
        </p>
        <form className="w-full mx-[auto] grid place-items-center">
          <fieldset className="w-4/5">
            <label htmlFor="nombre" className="font-bold">
              {t("name")}:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="nombre"
              value={inputs.nombre}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.nombre && (
              <p className="text-red-600 text-[0.5em]">{errors.nombre}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="correo" className="font-bold">
              {t("mail")}:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="correo"
              value={inputs.correo}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.correo && (
              <p className="text-red-600 text-[0.5em]">{errors.correo}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="pasaporte" className="font-bold">
              {t("passport")}:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="pasaporte"
              value={inputs.pasaporte}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.pasaporte && (
              <p className="text-red-600 text-[0.5em]">{errors.pasaporte}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="telefono" className="font-bold">
              {t("phone")}:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="telefono"
              value={inputs.telefono}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.telefono && (
              <p className="text-red-600 text-[0.5em]">{errors.telefono}</p>
            )}
          </fieldset>
          <fieldset className={`${rubik} flex justify-evenly w-3/4 pt-6`}>
            <button
              type="button"
              onClick={handleFormVisibility}
              className={`bg-negro_fondo text-white text-[0.8em] px-4 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              {t("volver")}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`rounded-md px-4 py-[2px] bg-naranja_enf text-white text-[0.8em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              {t("acep-camb")}
            </button>
          </fieldset>
        </form>
      </Alerts>
      <Alerts visible={imageAlertVisibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[0.8em] px-4">{t("img-ok")}</p>
        <button
          type="button"
          onClick={handleReload}
          className={`rounded-md px-4 py-[2px] bg-naranja_enf text-white text-[0.8em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("accept")}
        </button>
        <p className="text-[0.6em]">{t("ok-rec")}</p>
      </Alerts>
    </div>
  );
}

export default Profile;
