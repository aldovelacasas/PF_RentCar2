import { useState } from "react";
import { categorias } from "@/libs/categorias.js";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

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

function FormRent({
  visible = false,
  dat = { startDate: today, endDate: today },
  isAuth = false,
  car,
  handleVisible,
}) {
  const [errors, setErrors] = useState({});
  const [dates, setDate] = useState(dat);
  const [category, setCategory] = useState("Sedan");

  function handleOption(e) {
    setCategory(e.target.value);
  }

  function handleDateChange(e) {
    setDate({ ...dates, [e.target.name]: e.target.value });
  }
  function handleEndDateChange(e) {
    setErrors({});
    setDate({ ...dates, [e.target.name]: e.target.value });
  }

  let router = useRouter();

  function handleLogin() {
    document.body.classList.toggle("stopScroll");
    router.push("/login");
  }

  function handleValidation(e) {
    e.preventDefault();
    if (dates.startDate > dates.endDate) {
      setErrors({
        ...errors,
        dates: "La fecha de fin no puede ser menor a la fecha de inicio.",
      });
      return;
    } else if (dates.startDate <= dates.endDate) {
      setErrors({});
      // let year = dates.endDate.split("-")[0];
      // let month = dates.endDate.split("-")[1];
      // let day = dates.endDate.split("-")[2]
      let endDate = new Date(dates.endDate);
      let startDate = new Date(dates.startDate);
      let cant = (endDate - startDate) / 3600000 / 24;
      cant += 1;
      router.push(
        `/payment?item=${car.model}&cant=${cant}&img=${car.image}&price=${car.price}&startDate=${dates.startDate}&endDate=${dates.endDate}`,
        {
          query: { item: `${car.model}`, cant: `${cant}` },
        }
      );
      if (document.body.classList.length === 2) {
        document.body.classList.remove("stopScroll");
      }
    }
  }

  if (visible === false) return null;
  return (
    <div
      className={`fixed w-[100vw] left-[0] h-[100vh] top-[0] bg-[#dbdbdbcc] lg:text-[18px] z-50  grid ${poppins}`}>
      <form className="fixed w-3/4 justify-self-center top-[15%] flex flex-col items-center max-h-[80vh] overflow-x-auto bg-white border-[2px] border-black rounded-2xl">
        <p
          className={`bg-naranja_enf sticky top-0 text-white ${rubik} w-full text-center rounded-t-[15px] mb-4`}>
          Renta tu vehículo
        </p>
        {isAuth === false ? (
          <fieldset className="pt-4 grid">
            <hr />
            <p className=" w-4/5 text-center place-self-center md:w-full text-[1em]">
              Para poder rentar un vehículo, necesitas estar registrado
            </p>
            <fieldset className="flex justify-evenly w-full place-self-center lg:w-2/3 py-6">
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo ${rubik} text-[1em] px-4 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Cancelar
              </button>
              <button
                onClick={handleLogin}
                className={` bg-naranja_enf ${rubik} text-white px-4 py-2 text-[1em] rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Inicia Sesión
              </button>
            </fieldset>
          </fieldset>
        ) : (
          <>
            {car.model ? (
              <p className={`${rubik} text-[1.2em]`}>
                Modelo:
                <span className="text-naranja_enf"> {car.model}</span>
              </p>
            ) : (
              <p className={`${rubik} text-[1.2em]`}>
                Categoría:
                <span className="text-naranja_enf"> {car.type}</span>
              </p>
            )}
            <img
              src={car.image}
              alt={`Imagen del modelo ${car.model}`}
              className="w-1/2 max-h-[200px] my-4 object-scale-down"
            />
            <fieldset>
              <label htmlFor="category" className="">
                <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige
                una categoría
              </label>
              <br />
              {!car.model && (
                <>
                  <select
                    className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
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
                <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha
                de inicio
              </label>
              <br />
              <input
                className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
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
                <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha
                de fin
              </label>
              <br />
              <input
                className="bg-gris_fondo w-[200px] text-[0.9em] md:w-[500px]"
                name="endDate"
                type="date"
                min={dates.startDate}
                value={dates.endDate}
                onChange={handleEndDateChange}
              />{" "}
              <br />
            </fieldset>
            {errors.dates && (
              <p className="text-[1em] text-rojo_status">{errors.dates}</p>
            )}
            <fieldset className="flex sticky bottom-0 bg-white justify-evenly w-full lg:w-1/2 py-6">
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo ${rubik} text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Cancelar
              </button>
              <button
                onClick={handleValidation}
                className={` bg-naranja_enf ${rubik} text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Rentar
              </button>
            </fieldset>
          </>
        )}
      </form>
    </div>
  );
}

export default FormRent;
