import { Rubik, Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import validation from "@/libs/validation";

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

function VehicleDetail({
  visible,
  data = {
    price: "",
    name: "",
    model: "",
    year: "",
    type: "Sedan",
    capacity: "",
    transmission: "manual",
    description: "",
    image: "",
  },
  handleVisible,
  handleReload,
}) {
  if (!visible) return null;

  useEffect(() => {
    const jsondata = window.localStorage.getItem("formData");
    const data = JSON.parse(jsondata);

    for (const key in data) {
      if (key === "image") {
        setLocalImage(data[key]);
      } else if (key && key !== "") {
        setInputs((prevProduct) => ({
          ...prevProduct,
          [key]: data[key],
        }));
      }
    }
  }, []);
  const initialState = {
    id: data.id,
    image: data.image,
    name: data.name,
    model: data.model,
    year: data.year,
    type: data.type,
    capacity: data.capacity,
    transmission: data.transmission,
    price: data.price,
    description: data.description,
  };

  const [localimage, setLocalImage] = useState(false);
  const [inputs, setInputs] = useState(initialState);
  const [error, setError] = useState({});

  const [image, setImage] = useState(data.image ?? "");
  const [imageRender, setImageRender] = useState(image);

  const setLocalStorage = () => {
    try {
      const existImage = image !== null;
      const data = { ...inputs, image: existImage };
      const datajson = JSON.stringify(data);
      window.localStorage.setItem("formData", datajson);
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleChange(e) {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
      setImageRender(URL.createObjectURL(e.target.files[0]));
      setError({ ...error, image: validation(e.target.files[0], "file") });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
      setError({
        ...error,
        [e.target.name]: validation(e.target.value, e.target.name),
      });
    }
    setLocalStorage();
  }

  const handleSubmit = async (e) => {
    let errorsLength = Object.values(error).filter(
      (e) => e !== "" && e !== undefined
    ).length;
    if (errorsLength === 0) {
      e.preventDefault();
      localStorage.removeItem("formData");
      const formData = new FormData();
      formData.append("data", JSON.stringify(inputs));
      formData.append("file", image);
      const res = await axios.post(`/api/products/`, formData);
      console.log(res);
      //   handleReload();
      handleVisible();
    } else {
      console.log(error);
    }
  };

  return (
    <div
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-3/4 max-h-[75vh] place-items-center bg-white max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full mb-2`}>
          Vehículo #{data.id}
        </h3>
        <form className="bg-gris_fondo lg:w-1/2 px-6 rounded-2xl overflow-y-scroll max-h-[420px] py-3">
          <fieldset className="grid place-content-center">
            <img src={imageRender} className="max-h-[200px]" />
            <br />
            <input
              name="image"
              type="file"
              onChange={handleChange}
              className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none w-full py-2 px-3 mb-3
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-naranja_enf file:text-white
            file:shadow-sm file:shadow-black
            hover:file:shadow-md hover:file:shadow-black
            active:file:shadow-inner active:file:shadow-black
            sm:text-hidden"
            />
          </fieldset>
          <hr className="my-3 mx-2 border-white overflow-y-hidden" />
          <fieldset>
            <label htmlFor="name" className={`font-bold`}>
              Marca:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="name"
              value={inputs?.name}
              onChange={handleChange}
            />
            {error.name && (
              <p className={`text-[0.8em] text-red-600`}>{error.name}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="model" className={`font-bold`}>
              Modelo:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="model"
              value={inputs?.model}
              onChange={handleChange}
            />
            {error.model && (
              <p className={`text-[0.8em] text-red-600`}>{error.model}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="year" className={`font-bold`}>
              Año:
            </label>
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="year"
              value={inputs?.year}
              onChange={handleChange}
            />
            {error.year && (
              <p className={`text-[0.8em] text-red-600`}>{error.year}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="type" className={`font-bold`}>
              Tipo:
            </label>{" "}
            <br />
            <select onChange={handleChange} defaultValue={inputs?.type}>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="camioneta">Camioneta</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="capacity" className={`font-bold`}>
              Capacidad:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="capacity"
              value={inputs?.capacity}
              onChange={handleChange}
            />
            {error.capacity && (
              <p className={`text-[0.8em] text-red-600`}>{error.capacity}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="transmission" className={`font-bold`}>
              Transmisión:
            </label>{" "}
            <br />
            <select onChange={handleChange} defaultValue={inputs?.transmission}>
              <option value="manual">Manual</option>
              <option value="automática">Automática</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="price" className={`font-bold`}>
              Precio:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2"
              name="price"
              value={inputs?.price}
              onChange={handleChange}
            />
            {error.price && (
              <p className={`text-[0.8em] text-red-600`}>{error.price}</p>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="description" className={`font-bold`}>
              Descripción:
            </label>{" "}
            <br />
            <textarea
              className="border-[1px] rounded-lg w-full border-black my-1 pl-2 resize-none min-h-[150px]"
              name="description"
              value={inputs?.description}
              onChange={handleChange}
            />
            {error.description && (
              <p className={`text-[0.8em] text-red-600`}>{error.description}</p>
            )}
          </fieldset>

          <hr className="my-3 mx-2 border-white" />
        </form>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            type="button"
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-8 py-4 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Volver
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={` px-8 py-4 bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Aceptar cambios
          </button>
        </div>
      </figure>
    </div>
  );
}

export default VehicleDetail;