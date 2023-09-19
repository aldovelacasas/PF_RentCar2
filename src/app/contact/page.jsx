/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { validateContactForm } from "@/libs/functions";
import Alerts from "@/components/Alerts";
import { Rubik, Poppins } from "next/font/google";
import { useTranslation } from "react-i18next";
import WhatsAppButton from "@/components/whatsAppButton.jsx";

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
let message;

function Page() {
  const inputsInitialValue = {
    name: "",
    email: "",
    comments: "",
  };
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(inputsInitialValue);
  const [visibility, setVisibility] = useState(false);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(
      validateContactForm({ ...inputs, [e.target.name]: e.target.value })
    );
  }

  function handleVisible() {
    setVisibility(!visibility);
    document.body.classList.toggle("stopScroll");
  }

  function sendMail() {
    var templateParams = {
      name: `${inputs.name}`,
      email: `${inputs.email}`,
      comments: `${inputs.comments}`,
    };

    emailjs
      .send(
        "service_m6um18e",
        "template_lh4goqi",
        templateParams,
        "7QMYSYK9xg_8ZFAie"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          message = "Hemos recibido tu mensaje, te responderemos a la brevedad";
          handleVisible();
        },
        function (error) {
          console.log("FAILED...", error);
          message = "Ha ocurrido un error, intenta de nuevo en unos minutos";
          handleVisible();
        }
      );
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength.length) {
      sendMail();
      setInputs(inputsInitialValue);
    }
  }
  return (
    <div className="grid bg-gris_frente dark:bg-dark_frente md:text-[2em] text-black dark:text-white">
      <header
        className={`bg-gris_fondo dark:bg-dark_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1em] mt-2 pl-4`}>{t("contact")}</p>
        <img
          src="/Contact.png"
          className=" float-right w-[30vw] md:w-[20vw] lg:w-[18vw] absolute right-[5%] top-[10%] z-1"
        />
      </header>
      <form
        className={`md:w-4/5 pt-2 ${poppins} text-[0.8em] sm:text-[1em] max-w-lg justify-self-center bg-gris_frente dark:bg-dark_frente pb-12`}>
        <p className={`text-[0.8em] ${rubik} mb-2 text-center mt-6`}>
          {t("more-info")}
        </p>
        <p className={`text-[1em] ${rubik} mb-6 text-center`}>
          {t("respondemos")}
        </p>

        <fieldset className="justify-self-center mb-4">
          <label htmlFor="name" className="">
            {t("nom-ap")}
          </label>
          <br />
          <input
            name="name"
            placeholder="Juan Pérez"
            className="bg-gris_fondo dark:bg-dark_fondo w-full text-[0.9em] placeholder:text-grey pl-1"
            value={inputs.name}
            onChange={handleChange}
          />
          <br />
          {errors.name && (
            <p className="text-[0.5em] text-rojo_status my-0 py-0">
              {errors.name}
            </p>
          )}
          {errors.nameLength && (
            <p className="text-[0.5em] text-rojo_status my-0 py-0">
              {errors.nameLength}
            </p>
          )}
        </fieldset>
        <fieldset className="justify-self-center mb-4">
          <label htmlFor="email" className="">
            Email
          </label>
          <br />
          <input
            className="bg-gris_fondo dark:bg-dark_fondo w-full text-[0.9em] placeholder:text-grey pl-1"
            name="email"
            placeholder="juanperez@correo.com"
            value={inputs.email}
            onChange={handleChange}
          />
          <br />
          {errors.email && (
            <p className="text-[0.5em] text-rojo_status my-0 py-0">
              {errors.email}
            </p>
          )}
        </fieldset>
        <fieldset className="justify-self-center mb-2">
          <label htmlFor="comments" className="">
            {t("coment-qya")}
          </label>
          <br />
          <textarea
            name="comments"
            draggable="false"
            placeholder="20-200 caracteres"
            value={inputs.comments}
            onChange={handleChange}
            className="bg-gris_fondo dark:bg-dark_fondo w-full h-[100px] resize-none text-[0.9em] placeholder:text-grey pl-1"
          />
          <br />
          {errors.comments && (
            <p className="text-[0.5em] text-rojo_status my-0 py-0">
              {errors.comments}
            </p>
          )}
          {errors.commentsLength && (
            <p className="text-[0.5em] text-rojo_status my-0 py-0">
              {errors.commentsLength}
            </p>
          )}
        </fieldset>
        <button
          onClick={handleSubmit}
          className={`bg-naranja_enf w-full justify-self-center text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("send")}
        </button>
      </form>
      <p className={`text-[1em] ${rubik} mb-6 text-center`}>{t("contact3")}</p>
      <br />
      <WhatsAppButton
        className="border border-green-500"
        phoneNumber="+543816426399"
      />
      <Alerts visible={visibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[0.8em] px-4">{message}</p>
        <button
          onClick={handleVisible}
          className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("accept")}
        </button>
      </Alerts>
    </div>
  );
}

export default Page;
