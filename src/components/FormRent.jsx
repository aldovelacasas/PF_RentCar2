/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { categorias } from "@/libs/categorias.js";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getRental } from "@/store/slices/rental";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

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
let currentRentals;

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  let dateArray = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

function FormRent({ visible = false, isAuth = false, car, handleVisible }) {
  const dispatch = useDispatch();
  let allRentals = useSelector((state) => state.rental.allRentals);
  const user = useSelector((state) => state.user.currentUser);
  const { t } = useTranslation();

  const [errors, setErrors] = useState({});
  const [max, setMax] = useState(null);
  const [category, setCategory] = useState("Sedan");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (car) {
      dispatch(getRental());
    }
    setErrors({});
    setStartDate(new Date());
    setEndDate(new Date());
  }, [car]);
  let clashingIntervals = [];

  if (car && allRentals[0] && allRentals[0].id) {
    currentRentals = allRentals.filter((r) => r.productID === car.id);

    currentRentals.forEach((r) => {
      clashingIntervals.push(
        getDates(new Date(r.fecha_inicio), new Date(r.fecha_fin))
      );
    });
    clashingIntervals = clashingIntervals.flat(Infinity);
  }

  useEffect(() => {
    if (startDate) {
      let maxDate = new Date();
      maxDate.setDate(startDate.getDate() + 15);
      setMax(maxDate);
    }
  }, [startDate]);

  function handleOption(e) {
    setCategory(e.target.value);
  }

  let router = useRouter();

  function handleLogin() {
    if (document.body.classList.length > 1) {
      document.body.classList.remove("stopScroll");
    }
    router.push("/login");
  }

  function handleEndDateChange(date) {
    setEndDate(date);
    if (startDate <= date) {
      setErrors({});
    }
  }

  function handleProfile() {
    if (document.body.classList.length > 1) {
      document.body.classList.remove("stopScroll");
    }
    router.push("/profile");
  }

  function containInvalidDates() {
    let currentDates = getDates(startDate, endDate).map((d) => d.getDate());
    let compare = clashingIntervals.map((d) => d.getDate());
    return currentDates.some((d) => compare.includes(d));
  }

  function handleValidation(e) {
    e.preventDefault();
    if (startDate > endDate) {
      setErrors({
        ...errors,
        dates: "La fecha de fin no puede ser menor a la fecha de inicio.",
      });
      return;
    } else if (containInvalidDates()) {
      setErrors({
        ...errors,
        dates: "No puedes incluir fechas inválidas.",
      });
      return;
    } else if (startDate <= endDate) {
      if (user.userPassport && user.userPhone) {
        let cant = (endDate - startDate) / 3600000 / 24;
        cant += 1;
        cant = Math.ceil(cant);
        router.push(
          `/payment?carId=${car.id}&item=${car.model}&cant=${cant}&img=${
            car.image
          }&price=${car.price}&startDate=${new Date(startDate)
            .toJSON()
            .slice(0, 10)}&endDate=${new Date(endDate).toJSON().slice(0, 10)}`,
          {
            query: { item: `${car.model}`, cant: `${cant}` },
          }
        );
        if (document.body.classList.length === 2) {
          document.body.classList.remove("stopScroll");
        }
      } else {
        setErrors({
          ...errors,
          info: "Aún no has registrado tus datos en tu perfil",
        });
      }
    }
  }
  if (visible === false) return null;
  return (
    <div
      className={`fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] lg:text-[18px] z-50  grid ${poppins} text-black dark:text-white`}>
      <form className="fixed w-3/4 justify-self-center top-[15%] flex flex-col items-center max-h-[80vh] overflow-x-auto bg-white dark:bg-dark_blanco border-[2px] border-black rounded-2xl">
        <p
          className={`bg-naranja_enf sticky top-0 text-white ${rubik} w-full text-center rounded-t-[15px] mb-4`}>
          {t("rentacar2")}
        </p>
        {isAuth === false ? (
          <fieldset className="pt-4 grid">
            <hr />
            <p className=" w-4/5 text-center place-self-center md:w-full text-[1em]">
              {t("invalid-sesion")}{" "}
            </p>
            <fieldset className="flex justify-evenly w-full place-self-center py-6">
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo dark:bg-dark_fondo ${rubik} text-[1em] px-4 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className={` bg-naranja_enf ${rubik} text-white px-4 py-2 text-[1em] rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("sign in")}
              </button>
            </fieldset>
          </fieldset>
        ) : (
          <>
            {car.model ? (
              <p className={`${rubik} text-[1.2em]`}>
                {t("model")}:
                <span className="text-naranja_enf"> {car.model}</span>
              </p>
            ) : (
              <p className={`${rubik} text-[1.2em]`}>
                {t("cat")}:<span className="text-naranja_enf"> {car.type}</span>
              </p>
            )}
            <img
              src={car.image}
              alt={`Imagen del modelo ${car.model}`}
              className="w-1/2 max-h-[200px] my-4 object-scale-down"
            />
            <fieldset>
              {!car.model && (
                <>
                  <label htmlFor="category" className="">
                    <BiSolidCar className="inline text-naranja_enf mr-1" />{" "}
                    {t("category")}
                  </label>
                  <br />
                  <select
                    className="bg-gris_fondo dark:bg-dark_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
                    name="category"
                    onChange={handleOption}
                    value={category}>
                    {categorias.map((c) => (
                      <option key={c.tipo}>{c.tipo}</option>
                    ))}
                  </select>
                  <br />
                </>
              )}
            </fieldset>
            <fieldset>
              <label htmlFor="fechaInicio" className="">
                <FaCalendarAlt className="inline text-naranja_enf mr-1" />
                {t("fechainicio")}
              </label>
              <br />
              <DatePicker
                selected={startDate}
                onChange={(dates) => setStartDate(dates)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="bg-gris_fondo w-full pl-2 rounded-md"
                excludeDates={clashingIntervals}
              />
              <br />
            </fieldset>
            <fieldset>
              <label htmlFor="endDate" className="">
                <FaCalendarAlt className="inline text-naranja_enf mr-1" />{" "}
                {t("fechafin")}
              </label>
              <br />
              <DatePicker
                selected={endDate}
                onChange={(date) => handleEndDateChange(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={max}
                className="bg-gris_fondo w-full pl-2 rounded-md"
                excludeDates={clashingIntervals}
              />
              <br />
            </fieldset>
            {errors.dates && (
              <p className="text-[1em] text-rojo_status">{errors.dates}</p>
            )}
            {errors.info && (
              <p className="text-[1em] text-rojo_status">{errors.info}</p>
            )}
            <fieldset className="flex sticky bottom-0 bg-white dark:bg-dark_blanco justify-evenly w-full lg:w-1/2 py-6">
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo dark:bg-dark_fondo ${rubik} text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("cancel")}
              </button>
              {errors.info ? (
                <button
                  onClick={handleProfile}
                  type="button"
                  className={` bg-naranja_enf ${rubik} text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                  Ir a mi perfil
                </button>
              ) : (
                <button
                  onClick={handleValidation}
                  className={` bg-naranja_enf ${rubik} text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                  {t("rentar")}
                </button>
              )}
            </fieldset>
          </>
        )}
      </form>
    </div>
  );
}

export default FormRent;
