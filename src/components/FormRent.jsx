import { useState } from "react";
import { categorias } from "@/libs/categorias.js";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
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

const today = new Date().toISOString().split("T")[0];

function FormRent({
  visible = false,
  cat = "Sedan",
  dat = { startDate: today, endDate: today },
  isAuth = false,
  handleVisible,
  model,
  image,
}) {
  const [category, setCategory] = useState(cat);
  const [errors, setErrors] = useState({});
  const [imgsrc, setImgsrc] = useState(
    image ?? categorias.find((c) => c.tipo === cat).imagen
  );
  const [dates, setDate] = useState(dat);

  function handleOption(e) {
    setCategory(e.target.value);
    let img = categorias.find((c) => c.tipo === category).imagen;
    setImgsrc(img);
  }

  function handleDateChange(e) {
    setDate({ ...dates, [e.target.name]: e.target.value });
  }
  function handleEndDateChange(e) {
    setErrors({});
    setDate({ ...dates, [e.target.name]: e.target.value });
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
                className={` bg-naranja_enf ${rubik} text-white px-4 text-[0.8em] rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Inicia Sesión
              </button>
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo ${rubik} text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Cancelar
              </button>
            </fieldset>
          </fieldset>
        ) : (
          <>
            {model ? (
              <p className={`${rubik} text-[1.2em]`}>
                Modelo:
                <span className="text-naranja_enf"> {model}</span>
              </p>
            ) : (
              <p className={`${rubik} text-[1.2em]`}>
                Categoría:
                <span className="text-naranja_enf"> {cat}</span>
              </p>
            )}
            <img
              src={imgsrc}
              alt={`Imagen del modelo ${model}`}
              className="w-1/2 max-h-[200px] my-4 object-scale-down"
            />
            <fieldset>
              <label htmlFor="category" className="">
                <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige
                una categoría
              </label>
              <br />
              {!model && (
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
            <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
  buy-button-id="buy_btn_1NnTKeC8CY4zllML3xtEIOJK"
  publishable-key="pk_test_51Nn2KYC8CY4zllMLpqkuDGM7gpaw1TRnW1MSev2p37I8cucia4ZGTp6Divr3e2rbE32vkqmXtrpizkPgoWtEZ4z800Eno12mKH"
>
</stripe-buy-button>
              <button
                type="button"
                onClick={handleVisible}
                className={` bg-gris_fondo ${rubik} text-[0.8em] px-4 py-1 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Cancelar
              </button>
            </fieldset>
          </>
        )}
      </form>
    </div>
  );
}

export default FormRent;
