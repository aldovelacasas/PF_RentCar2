"use client";

import { Rubik, Poppins } from "next/font/google";
import { useState } from "react";
import validation from "@/libs/validation";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const alertFontPoppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

const poppins = fontPoppins.className;
const alertPoppins = alertFontPoppins.className;

const rubik = fontRubik.className;

function OpinionForm() {
  const [review, setReview] = useState({
    email: "",
    name: "",
    surname: "",
    profession: "",
    opinion: "",
    rating: "",
  });

  const [error, setError] = useState({
    email: "",
    nameSurname: "",
    profession: "",
    opinion: "",
    rating: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "nameSurname") {
      const [inputName, inputSurname] = event.target.value.split(" ");
      setReview({ ...review, name: inputName, surname: inputSurname });
      setError({
        ...error,
        nameSurname: validation(inputName, event.target.name, inputSurname),
      });
    } else {
      setReview({ ...review, [event.target.name]: event.target.value });
      setError({
        ...error,
        [event.target.name]: validation(event.target.value, event.target.name),
      });
    }
  };

  const ready = () => {
    return (
      !error.email &&
      !error.rating &&
      !error.nameSurname &&
      !error.profession &&
      !error.opinion &&
      review.email !== "" &&
      review.name !== "" &&
      review.surname !== "" &&
      review.profession !== "" &&
      review.opinion !== "" &&
      review.rating !== ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (ready()) {
    //   try {
    //     await axios.post("", review);
    //   } catch (error) {
    //     alert("Disculpa tuvimos un error al cargar tu review");
    //   }
    // }
  };

  return (
    <div className="bg-gray-400 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="p-4 mx-4 my-4 max-w-md w-full">
        <h3 className={`${rubik} text-2xl font-bold mb-2`}>Deja tu reseña</h3>
        <p className={`${poppins} text-base text-gray-600 mb-6`}>
          Dinos qué opinas de nuestros servicios
        </p>
        <label htmlFor="email" className={`${poppins} block mb-1`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full py-2 px-3 mb-3"
        />
        {error.email ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.email}
          </span>
        ) : (
          ""
        )}
        <label htmlFor="nameSurname" className={`${poppins} block mb-1`}>
          Nombre y apellido
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="nameSurname"
          className="w-full py-2 px-3 mb-3"
        />
        {error.nameSurname ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.nameSurname}
          </span>
        ) : (
          ""
        )}
        <label htmlFor="profession" className={`${poppins} block mb-1`}>
          Profesión
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="profession"
          className="w-full py-2 px-3 mb-3"
        />
        {error.profession ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.profession}
          </span>
        ) : (
          ""
        )}
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          onChange={handleChange}
          name="rating"
          className="w-full py-2 px-3 mb-3"
          placeholder="Numero entre 1-5"
        />
        {error.rating ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.rating}
          </span>
        ) : (
          ""
        )}
        <label htmlFor="opinion" className={`${poppins} block mb-1`}>
          Opinión
        </label>
        <textarea
          onChange={handleChange}
          name="opinion"
          cols="30"
          rows="5"
          className="w-full py-2 px-3 mb-3"></textarea>
        {error.opinion ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.opinion}
          </span>
        ) : (
          ""
        )}
        <button
          className={`${poppins} bg-naranja_enf rounded px-3 py-2 ${
            !ready() ? "opacity-60" : ""
          } ${error.opinion ? "ml-2" : ""}`}
          type="submit"
          disabled={!ready()}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default OpinionForm;
