/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Rubik, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import validation from "@/libs/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTest } from "@/store/slices/testimonio";
import Alerts from "./Alerts";
import { getCars } from "@/store/slices/car";
import { useTranslation } from "react-i18next";

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

function OpinionForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cars = useSelector((state) => state.cars.allCars);
  useEffect(() => {
    dispatch(getCars());
  }, []);

  const user = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [message, setMessage] = useState("");

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
        setMessage("Recibimos tu opinion muchas gracias");
        handleVisibility();
      } catch (error) {
        setMessage("Disculpa tuvimos un error al cargar tu opinion");
        handleVisibility();
      }
    }
  };

  function handleVisibility() {
    setAlertVisibility(!alertVisibility);
    document.body.classList.toggle("stopScroll");
  }

  const isUser = () => {
    if (useAuth().user) return true;
    else return false;
  };

  return (
    <div className={`bg-gray-400 flex flex-col items-center justify-center`}>
      {!isUser() ? (
        <div className="z-10 absolute bg-white dark:bg-dark_blanco sm:p-4 p-2 sm:m-auto m-2 rounded-xl border-black border-2 flex flex-col items-center shadow-sm shadow-black !important">
          <h3 className={`${bigrubik} text-2xl mb-2 text-center`}>
            Inicia Sesión para dejar tu testimonio
          </h3>
          <button
            onClick={() => router.push("/login")}
            className={`${poppins} bg-naranja_enf rounded-xl px-3 py-2 text-sm sm:text-base hover:bg-negro_fondo hover:text-white`}
            type="button">
            {t("sign in")}
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
        <h3 className={`${rubik} text-2xl font-bold mb-2`}>{t("rev-de")}</h3>
        <p className={`${poppins} text-base text-gray-600 mb-6`}>
          {t("rev-de2")}
        </p>
        <label htmlFor="car" className={`${poppins} block mb-1`}>
          {t("car")}
        </label>
        <select
          disabled={!isUser()}
          onChange={handleChange}
          name="car"
          defaultValue={"Seleccionar"}
          className="shadow-sm shadow-black
          w-full py-2 px-3 mb-3 bg-white dark:bg-dark_blanco border rounded-xl">
          <option value="Seleccionar" disabled>
            {t("sel-car")}
          </option>
          {cars?.map((car) => {
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
          min={1}
          max={5}
          className="shadow-sm shadow-black
          w-full py-2 px-3 mb-3 border rounded-xl"
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
          {t("op")}
        </label>
        <textarea
          disabled={!isUser()}
          onChange={handleChange}
          name="opinion"
          cols="30"
          rows="5"
          className=" shadow-sm shadow-black resize-none
           w-full py-2 px-3 mb-3 border rounded-xl dark:text-black "></textarea>
        {error.opinion ? (
          <span className={`${alertPoppins} text-sm`} style={{ color: "red" }}>
            {error.opinion}
          </span>
        ) : (
          ""
        )}
        <button
          className={`${poppins} bg-naranja_enf border rounded-xl px-3 py-2  ${
            !ready() ? "opacity-60" : ""
          } ${error.opinion ? "ml-2" : ""}`}
          type="submit"
          disabled={!ready()}>
          {t("send")}
        </button>
      </form>
      <Alerts visible={alertVisibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[0.8em] px-4">{message}</p>
        <button
          onClick={handleVisibility}
          className={` shadow-sm shadow-black
          bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("accept")}
        </button>
      </Alerts>
    </div>
  );
}

export default OpinionForm;
