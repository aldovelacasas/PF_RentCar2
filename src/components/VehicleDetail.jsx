import { Rubik, Poppins } from "next/font/google";
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

function VehicleDetail({ visible, data, handleVisible }) {
  if (!visible) return null;

  const [inputs, setInputs] = useState({
    price: data.price,
    name: data.name,
    model: data.model,
    year: data.year,
    type: data.type,
    capacity: data.capacity,
    transmission: data.transmission,
    description: data.description,
  });

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleImageChange() {
    console.log("cambio");
  }

  return (
    <div
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-3/4 max-h-[75vh] place-items-center bg-white max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full`}>
          Vehículo #{data.id}
        </h3>
        <form className="bg-gris_fondo lg:w-1/2 px-6 rounded-2xl overflow-y-scroll max-h-[420px] py-3">
          <fieldset className="grid place-content-center">
            <img
              src="https://picsum.photos/200/300"
              className="max-h-[200px]"
            />
            <br />
            <button
              onClick={handleImageChange}
              type="button"
              className={`rounded-md px-4 py-[2px] bg-negro_fondo text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Cambiar imagen
            </button>
          </fieldset>
          <hr className="my-3 mx-2 border-white overflow-y-hidden" />
          <fieldset>
            <label htmlFor="price">Precio:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="price"
              value={inputs.price}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="name">Marca:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="model">Modelo:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="model"
              value={inputs.model}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="year">Año:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="year"
              value={inputs.year}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="type">Tipo:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="type"
              value={inputs.type}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="capacity">Capacidad:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="capacity"
              value={inputs.capacity}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="transmission">Transmisión:</label> <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="transmission"
              value={inputs.transmission}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="description">Descripción:</label> <br />
            <textarea
              className="border-[1px] rounded-lg lg:w-3/4 border-black my-1 pl-2 resize-none h-350px overflow-y-scroll"
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />
          </fieldset>
          <hr className="my-3 mx-2 border-white" />
        </form>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            type="button"
            className={`rounded-md px-4 py-[2px] bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Aceptar cambios
          </button>
          <button
            type="button"
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-4 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Volver
          </button>
        </div>
      </figure>
    </div>
  );
}

export default VehicleDetail;
