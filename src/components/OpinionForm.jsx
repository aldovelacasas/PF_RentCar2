"use client";

import { Rubik, Poppins } from "next/font/google";
import { useState } from "react";
import validation from "@/libs/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getTest } from "@/store/slices/testimonio";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const bigFontRubik = Rubik({
  weight: "800",
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
const bigrubik = bigFontRubik.className;

function OpinionForm({ cars }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  const [review, setReview] = useState({
    opinion: "",
    rating: "",
    car: "",
  });

  const [error, setError] = useState({
    email: "",
    nameSurname: "",
    opinion: "",
    rating: "",
    car: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "nameSurname") {
      const [inputName, inputSurname] = event.target.value.split(" ");
      setReview({ ...review, name: inputName, surname: inputSurname });
      setError({
        ...error,
        nameSurname: validation(inputName, event.target.name, inputSurname),
      });
    } else if (event.target.name === "car") {
      setReview({ ...review, [event.target.name]: event.target.value });
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
      !error.rating &&
      !error.opinion &&
      review.opinion !== "" &&
      review.rating !== "" &&
      review.car !== ""
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const test = {
      userID: user.userId,
      productID: review.car,
      description: review.opinion,
      rating: review.rating,
    };

    if (ready()) {
      try {
        await axios.post("/api/post", test);
        dispatch(getTest());
        document.getElementById("opinionForm").reset();
        alert("Recibimos tu opinion muchas gracias");
      } catch (error) {
        alert("Disculpa tuvimos un error al cargar tu opinion");
      }
    }
  };

  const isUser = () => {
    if (useAuth().user) return true;
    else return false;
  };

  return (
    <div className={`bg-gray-400 flex flex-col items-center justify-center`}>
      {!isUser() ? (
        <div className="z-10 absolute bg-white sm:p-4 p-2 sm:m-auto m-2 rounded-xl border-black border-2 flex flex-col items-center shadow-sm shadow-black !important">
          <h3 className={`${bigrubik} text-2xl mb-2 text-center`}>
            Inicia Sesión para dejar tu testimonio
          </h3>
          <button
            onClick={() => router.push("/login")}
            className={`${poppins} bg-naranja_enf rounded-xl px-3 py-2 text-sm sm:text-base hover:bg-negro_fondo hover:text-white`}
            type="button">
            Iniciar Sesión
          </button>
        </div>
      ) : (
        ""
      )}
      <form
        id="opinionForm"
        onSubmit={handleSubmit}
        className={`p-4 sm:px-4 px-4 mx-4 my-4 max-w-md w-full ${
          isUser() ? "opacity-100" : "opacity-20"
        } `}>
        <h3 className={`${rubik} text-2xl font-bold mb-2`}>Deja tu reseña</h3>
        <p className={`${poppins} text-base text-gray-600 mb-6`}>
          Dinos qué opinas de nuestros servicios
        </p>
        <label htmlFor="car" className={`${poppins} block mb-1`}>
          Auto
        </label>
        <select
          disabled={!isUser()}
          onChange={handleChange}
          name="car"
          defaultValue={"Seleccionar"}
          className="w-full py-2 px-3 mb-3 bg-white">
          <option value="Seleccionar" disabled>
            Seleccionar auto
          </option>
          {cars.map((car) => {
            return (
              <option key={car.id} value={car.id} name="car">
                {car.model + " " + car.name}
              </option>
            );
          })}
          {error.car ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.car}
            </span>
          ) : (
            ""
          )}
        </select>
        <label htmlFor="rating">Rating</label>
        <input
          disabled={!isUser()}
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
          disabled={!isUser()}
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
