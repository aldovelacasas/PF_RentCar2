import { Rubik, Poppins } from "next/font/google";
import { validateContactForm } from "@/libs/functions";
import { useState } from "react";

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

function HelpForm({ visible }) {
  const inputsInitialValue = {
    name: "",
    email: "",
    comments: "",
  };

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(inputsInitialValue);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(
      validateContactForm({ ...inputs, [e.target.name]: e.target.value })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength.length) {
      setInputs(inputsInitialValue);
    }
  }

  if (visible === false) return null;
  return (
    <form
      className={`rounded-2xl mt-6 md:w-4/5 pt-2 ${poppins} text-[16px] sm:text-[1em] max-w-lg justify-self-center bg-white dark:bg-dark_blanco pb-12 px-8 text-black dark:text-white`}>
      <p className={`text-[0.8em] ${rubik} mb-2 text-center mt-6`}>
        ¿Tienes algún problema con la consola?
      </p>
      <p className={`text-[1em] ${rubik} mb-6 text-center`}>
        Explícanos el problema y con gusto te ayudaremos
      </p>

      <fieldset className="justify-self-center mb-4">
        <label htmlFor="name" className="">
          Nombre y apellido
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
          <p className="text-[0.8em] text-rojo_status my-0 py-0">
            {errors.name}
          </p>
        )}
        {errors.nameLength && (
          <p className="text-[0.8em] text-rojo_status my-0 py-0">
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
          <p className="text-[0.8em] text-rojo_status my-0 py-0">
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
          className="bg-gris_fondo dark:bg-dark_fondo w-full h-[100px] resize-none text-[0.9em] placeholder:text-grey pl-1"
        />
        <br />
        {errors.comments && (
          <p className="text-[0.8em] text-rojo_status my-0 py-0">
            {errors.comments}
          </p>
        )}
        {errors.commentsLength && (
          <p className="text-[0.8em] text-rojo_status my-0 py-0">
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
  );
}

export default HelpForm;
