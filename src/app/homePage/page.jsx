/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { emailValidate } from "@/libs/functions.js";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { categorias } from "../../libs/categorias.js";
import Alerts from "@/components/Alerts";
import FormRent from "@/components/FormRent.jsx";
import {
  BsChevronCompactRight,
  BsCheckCircleFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { FaCalendarAlt, FaSearchDollar } from "react-icons/fa";
import { PiCar, PiCarProfile, PiPhoneCallBold } from "react-icons/pi";
import { BiSolidCar } from "react-icons/bi";
import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation.js";
import { useTranslation } from "react-i18next";
import React from "react";

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
const today = new Date().toISOString().split("T")[0];
let message;

function HomePage() {
  const router = useRouter();

  const [display, setDisplay] = useState(categorias[0].imagen);
  const [category, setCategory] = useState("Sedan");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);
  const [dates, setDate] = useState({
    startDate: today,
    endDate: today,
  });
  const [collapsed, setCollapsed] = useState({
    One: false,
    Two: true,
    Three: true,
  });
  const { t } = useTranslation();

  function handleChange(e) {
    let newdisplay = categorias.find((c) => c.tipo === e.target.value);
    setDisplay(newdisplay.imagen);
  }

  function handleCollapse(number) {
    setCollapsed({ ...collapsed, [number]: !collapsed[number] });
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function sendMail() {
    var templateParams = {
      email: `${email}`,
    };

    emailjs
      .send(
        "service_m6um18e",
        "template_0kxpm4e",
        templateParams,
        "7QMYSYK9xg_8ZFAie"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          message = "Suscrito exitosamente";
          handleVisible();
        },
        function (error) {
          console.log("FAILED...", error);
          message = "Ha ocurrido un error, intenta de nuevo en unos minutos";
          handleVisible();
        }
      );
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    setErrors(emailValidate(email));
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength) {
      sendMail();
      setEmail("");
    }
  }

  function handleScrollForm() {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 400) {
        window.scrollTo({
          top: 230,
          behavior: "smooth",
        });
      } else if (window.innerWidth <= 800) {
        window.scrollTo({
          top: 270,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 470,
          behavior: "smooth",
        });
      }
    }
  }
  function handleScrollInfo() {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 400) {
        window.scrollTo({
          top: 540,
          behavior: "smooth",
        });
      } else if (window.innerWidth <= 800) {
        window.scrollTo({
          top: 580,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      }
    }
  }
  function handleDateChange(e) {
    setDate({ ...dates, [e.target.name]: e.target.value });
    if (errors) {
      setErrors({});
    }
  }

  function handleValidation(e) {
    e.preventDefault();
    if (dates.startDate > dates.endDate) {
      setErrors({
        ...errors,
        dates: "La fecha de fin no puede ser menor a la fecha de inicio.",
      });
      return;
    }
    // else if (dates.startDate <= dates.endDate) {
    //   setErrors({});
    //   router.push("/login");
    // }
    else {
      setFormVisibility(true);
      document.body.classList.toggle("stopScroll");
    }
  }

  function handleOption(e) {
    setCategory(e.target.value);
  }

  function handleVisible() {
    setVisibility(!visibility);
    document.body.classList.toggle("stopScroll");
  }

  function handleFormVisibility() {
    setFormVisibility(!formVisibility);
    document.body.classList.toggle("stopScroll");
  }

  return (
    <div className="grid bg-gris_frente dark:bg-dark_frente md:text-[1.5em] text-black dark:text-white overflow-x-hidden">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo relative ${rubik} text-[1em] sm:text-[1.5em]  pl-[10%] space-y-0 space-x-2.5`}>
        <img
          src="/camionetahome.png"
          className=" float-right w-[50vw] absolute right-[-15%] scale-x-[-1] top-0 z-1"
        />
        <p className={`pt-12 ml-2.5 text-[0.8em] mb-2`}>{t("plan")}</p>
        <p className="text-[1.3em]  leading-6  md:leading-[1.8em]">
          <span className="text-naranja_enf"> {t("ahorra")} </span>
          {t("connuestra")}
        </p>
        <p className="text-[1.3em] leading-6 md:leading-[1.2em] md:pb-4">
          {t("renta-de-vehiculos")}
        </p>
        <p className={`${poppins} text-[0.6em] mt-2 z-3`}>
          {t("renta-sueños")}
        </p>
        <p className={`${poppins} text-[0.6em] pb-4`}>{t("km")}</p>
        <div className="flex place-content-evenly w-full sm:w-2/3 mt-3 pb-10 md:pt-[40px] lg:w-1/2">
          <button
            onClick={handleScrollForm}
            className={`bg-naranja_enf text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("rent")} <BsCheckCircleFill className="inline pl-1" />
          </button>
          <button
            type="button"
            onClick={handleScrollInfo}
            className={`bg-negro_fondo text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("more")}
            <BsChevronCompactRight className="inline pl-1 pr-0 mr-0 " />
          </button>
        </div>
      </header>
      <form
        className={` rounded-3xl mt-8 ${poppins} text-[0.8em] sm:text-[1em] md:text-[1.2em] px-[20%] justify-self-center bg-[#fff6] mb-2 shadow-sm shadow-negro_fondo pb-12`}>
        <p
          className={`text-[1em] md:text-[1.2em] ${rubik} mb-2 md:mt-[40px] text-center`}>
          {t("rentacar")}
        </p>
        <fieldset>
          <label htmlFor="category" className="">
            <BiSolidCar className="inline text-naranja_enf mr-1" />
            {t("category")}
          </label>
          <br />
          <select
            className="bg-gris_fondo dark:bg-dark_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="category"
            onChange={handleOption}>
            {categorias.map((c) => (
              <option key={c.tipo}>{c.tipo}</option>
            ))}
          </select>
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="fechaInicio" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" />{" "}
            {t("fechainicio")}
          </label>
          <br />
          <input
            className="bg-gris_fondo dark:bg-dark_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="startDate"
            type="date"
            min={today}
            value={dates.startDate}
            onChange={handleDateChange}
          />
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="endDate" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" />{" "}
            {t("fechafin")}
          </label>
          <br />
          <input
            className="bg-gris_fondo dark:bg-dark_fondo w-[200px] text-[0.9em] md:w-[500px]"
            name="endDate"
            type="date"
            min={dates.startDate}
            value={dates.endDate}
            onChange={handleDateChange}
          />{" "}
          <br />
        </fieldset>
        {errors.dates && (
          <p className="text-[0.5em] text-rojo_status">{errors.dates}</p>
        )}
        <button
          onClick={handleValidation}
          className={`bg-naranja_enf w-full text-white text-[0.8em] px-4 py-1 mt-8 ${rubik} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("rent")}
        </button>
      </form>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente dark:bg-dark_frente pb-12 sm:text-[1.2em] grid`}>
        <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
          {t("planahora")}
        </p>
        <p className={`text-[1em] ${rubik} mb-6 text-center`}>
          {t("alquilafacil")}
        </p>
        <div className="md:flex items-baseline w-4/5 justify-self-center">
          <div className="w-full flex justify-center items-center md:flex-col gap-x-4 px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <PiCar className="text-[50px] md:text-[80px] text-naranja_enf" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>{t("carchoose")}</p>
              <p className={`text-[0.8em] ${poppins}  `}>{t("parati")}</p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center md:flex-col gap-x-4  px-3 my-10">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <PiPhoneCallBold className="text-[50px] md:text-[80px] text-naranja_enf font-thin" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>{t("dudas")}</p>
              <p className={`text-[0.8em] ${poppins} mb-2 `}>
                {t("dudasinfo")}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center md:flex-col gap-x-4  px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <PiCarProfile className="text-[50px] md:text-[80px] text-naranja_enf" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>{t("conduce")}</p>
              <p className={`text-[0.8em] ${poppins} mb-2 `}>
                {t("conduceinfo")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`pt-4 ${rubik} w-4/5 grid mx-[auto] text-[0.8em] bg-gris_frente dark:bg-dark_frente pb-12 sm:text-[1.2em]`}>
        <img
          src={display}
          className="w-4/5 justify-self-center object-scale-down max-h-[300px] md:max-h-[400px]"
        />
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 w-4/5 justify-self-center">
          {categorias.map((c) => (
            <button
              key={c.tipo}
              value={c.tipo}
              onClick={handleChange}
              className="bg-naranja_enf px-4 py-2 shadow-sm text-white shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
              {c.tipo}
            </button>
          ))}
        </div>
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] my-8 text-white text-center text-[0.8em] w-full bg-negro_fondo pb-6 sm:py-[40px] md:py-[80px] sm:text-[1.2em]`}>
        <p className="text-2xl md:text-[1.8em] md:leading-[1.8em]">
          {t("venahorra")}
        </p>
        <p>
          {t("atclient")} <span className="text-naranja_enf">24/7</span>
        </p>
      </section>
      <section
        className={` w-3/4 pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente dark:bg-dark_frente mt-8 pb-12 sm:text-[1.2em] grid`}>
        <p>{t("xq")}</p>
        <p className="text-2xl md:text-[1.9em] md:leading-[1.2em]">
          {t("contamoscon")}
          <span className="text-naranja_enf"> {t("bestprice")}</span>
        </p>
        <p className="pt-4 mb-8">{t("infotext")}</p>
        <div className="md:flex items-baseline justify-self-center">
          <div className="md:flex-col w-full flex justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <PiCarProfile className="text-[50px] md:text-[80px] text-naranja_enf" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>
                {t("dondequieras")}
              </p>
              <p className={`text-[0.8em] ${poppins}  `}>{t("proxav")}</p>
            </div>
          </div>
          <div className="md:flex-col w-full flex justify-center items-center gap-x-4  px-3 my-10">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <BsFillCreditCard2BackFill className="text-[30px] md:text-[60px] text-naranja_enf font-thin" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>{t("facilpago")}</p>
              <p className={`text-[0.8em] ${poppins} mb-2 `}>{t("tarj")}</p>
            </div>
          </div>
          <div className="md:flex-col w-full flex justify-center items-center gap-x-4  px-3">
            <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] md:h-[100px] md:w-[100px] flex justify-center items-center">
              <FaSearchDollar className="text-[30px] md:text-[60px] text-naranja_enf stroke-2" />
            </figure>
            <div className="w-2/3 md:text-center md:text-[0.8em]">
              <p className={`text-[0.8em] ${rubik} mb-2`}>
                {t("cargosocultos")}
              </p>
              <p className={`text-[0.8em] ${poppins} mb-2 `}>{t("nueprice")}</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`pt-8 px-5 ${rubik} mx-[auto] text-[0.8em] bg-gris_fondo dark:bg-dark_fondo rounded-3xl shadow-sm shadow-black pb-12 sm:w-3/4`}>
        <p className="text-2xl md:text-[1.5em] text-center pb-4 md:pb-8 w-full">
          {t("lee")}
        </p>
        <p className="pb-4">{t("mascinco")}</p>
        <div
          className={`bg-white dark:bg-dark_blanco ${poppins}  p-8 sm:mx-12 shadow-sm shadow-black rounded-xl mb-4`}>
          <p>
            "Nunca habíamos rentado un auto antes, pero luego de haber puesto
            nuestro voto de confianza en esta página, es una experiencia que
            quiero repetir cada vez que tenga vacaciones".
          </p>
          <div className="flex place-content-between items-center">
            <div className="flex w-1/2 gap-3 items-center mt-4">
              <img
                src="/testimonialhome1jpg.jpg"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-[0.9em]">Juanito Pérez</p>
                <p className={`${poppins} text-[0.8em]`}>Abogado</p>
              </div>
            </div>
            <p className="text-amarillo_status text-2xl mt-4">★★★★★</p>
          </div>
        </div>
        <div
          className={`bg-white dark:bg-dark_blanco ${poppins}  p-8 sm:mx-12 shadow-sm shadow-black rounded-xl`}>
          <p>
            "Después de estas últimas vacaciones me sentí tan libre que me
            gustaría poder recomendarle a todos una aventura igual a la mía. De
            no ser por esta página no la habría tenido".
          </p>
          <div className="flex place-content-between items-center">
            <div className="flex w-1/2 gap-3 items-center mt-4">
              <img
                src="/testimonialhome2.jpg"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p className="text-[0.9em]">Juana López</p>
                <p className={`${poppins} text-[0.8em]`}>Contadora</p>
              </div>
            </div>
            <p className="text-amarillo_status text-2xl mt-4">★★★★★</p>
          </div>
        </div>
      </section>
      <section
        className={`pt-8 px-5 ${rubik} mx-[auto] text-[0.8em] md:mt-[60px] sm:w-3/4 bg-gris_frente dark:bg-dark_frente pb-12 sm:text-[1.2em]`}>
        <p className="text-center">FAQ</p>
        <p className="text-2xl text-center pb-4 md:text-[1.2em]  md:mb-[60px]">
          {t("faq")}
        </p>
        <table className="bg-white dark:bg-dark_blanco shadow-md shadow-black md:mb-8">
          <tbody className="[&>*:nth-child(odd)]:bg-[#ea4e398a] bg-white dark:bg-dark_blanco">
            <tr
              onClick={() => handleCollapse("One")}
              className="cursor-pointer hover:text-blue-600 dark:hover:text-black">
              <td className="py-1 text-center w-full">{t("time")} </td>
              <td className="px-2">▼</td>
            </tr>
            <tr>
              {collapsed.One === true ? (
                <></>
              ) : (
                <td className={`py-1 px-2 pb-8 ${poppins}`}>{t("desp")}</td>
              )}
            </tr>
            <tr
              onClick={() => handleCollapse("Two")}
              className="cursor-pointer hover:text-blue-600 dark:hover:text-black">
              <td className="py-1 text-center">{t("algo")}</td>
              <td className="px-2">▼</td>
            </tr>
            <tr>
              {collapsed.Two === true ? (
                <></>
              ) : (
                <td className={`py-1 px-2 pb-8 ${poppins}`}>{t("ntp")}</td>
              )}
            </tr>
            <tr
              className="cursor-pointer hover:text-blue-600 dark:hover:text-black"
              onClick={() => handleCollapse("Three")}>
              <td className="py-1 text-center">{t("seguro")}</td>
              <td className="px-2">▼</td>
            </tr>
            {collapsed.Three === true ? (
              <></>
            ) : (
              <tr>
                <td className={`py-1 px-2 pb-8 ${poppins}`}>{t("claro")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <form
        className={`pt-2 ${poppins} text-[0.8em]  md:text-[1.2em] bg-gris_fondo dark:bg-dark_fondo  sm:px-[15%] px-4 pb-4  sm:py-[25px] md:py-[50px]`}>
        <p className={`${rubik} text-2xl  md:text-[1.3em]  md:pt-6`}>
          {t("subscribe")}
        </p>
        <p className="py-2">{t("infoantes")} </p>
        <label htmlFor="email">Email</label> <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="w-3/5 placeholder:pl-2"
          placeholder="juanperez@correo.com"
        />
        <button
          onClick={handleEmailSubmit}
          className="text-white bg-naranja_enf px-3 sm:px-4 ml-4 text-[1em]  md:py-3 leading-5 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black ">
          {t("subscribe")}
        </button>
        {errors && (
          <p className="text-[0.5em] text-rojo_status">{errors.email}</p>
        )}
      </form>
      <Alerts visible={visibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[0.8em] px-4">{message}</p>
        <button
          onClick={handleVisible}
          className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black `}>
          {t("accept")}
        </button>
      </Alerts>
      <FormRent
        visible={formVisibility}
        cat={category}
        dat={dates}
        isAuth={false}
        handleVisible={handleFormVisibility}
      />
    </div>
  );
}

export default HomePage;
