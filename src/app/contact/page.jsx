"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { validateContactForm } from "@/libs/functions";
import Alerts from "@/components/Alerts";
import { Rubik, Poppins } from "next/font/google";

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

function page() {
  const inputsInitialValue = {
    name: "",
    email: "",
    comments: "",
  };

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
    console.log(visibility);
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
    <div className="grid bg-gris_frente md:text-[2em]">
      <header
        className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] md:800px]:text-[2em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1.2em] mt-2 pl-4`}>Contáctanos</p>
      </header>
      <form
        className={`md:w-4/5 pt-2 ${poppins} text-[0.8em] sm:text-[1em] max-w-lg justify-self-center bg-gris_frente pb-12`}>
        <p className={`text-[0.8em] ${rubik} mb-2 text-center mt-6`}>
          ¿Necesitas más información?
        </p>
        <p className={`text-[1em] ${rubik} mb-6 text-center`}>
          Cuéntanos tus dudas y te responderemos al momento
        </p>

        <fieldset className="justify-self-center mb-4">
          <label htmlFor="name" className="">
            Nombre y apellido
          </label>
          <br />
          <input
            name="name"
            placeholder="Juan Pérez"
            className="bg-gris_fondo w-full text-[0.9em] placeholder:text-grey pl-1"
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
            className="bg-gris_fondo w-full text-[0.9em] placeholder:text-grey pl-1"
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
            Comentarios o dudas
          </label>
          <br />
          <textarea
            name="comments"
            draggable="false"
            placeholder="20-200 caracteres"
            value={inputs.comments}
            onChange={handleChange}
            className="bg-gris_fondo w-full h-[100px] resize-none text-[0.9em] placeholder:text-grey pl-1"
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
          Enviar
        </button>
      </form>
      <Alerts visible={visibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          Alerta
        </p>
        <p className="text-[0.8em] px-4">{message}</p>
        <button
          onClick={handleVisible}
          className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner`}>
          Aceptar
        </button>
      </Alerts>
    </div>
  );
}

export default page;
