/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Rubik, Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import validation from "@/libs/validation";
import { useRouter } from "next/navigation";
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

function VehicleDetail({
  visible,
  data = {
    id: "",
    image: "",
    name: "",
    model: "",
    year: "",
    type: "",
    capacity: "",
    transmission: "",
    price: "",
    description: "",
  },
  handleVisible,
  handleReload,
}) {
  const router = useRouter();
  const { t } = useTranslation();
  let initialState = {
    id: "",
    image: "",
    name: "",
    model: "",
    year: "",
    type: "",
    capacity: "",
    transmission: "",
    price: "",
    description: "",
  };

  useEffect(() => {
    initialState = {
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
    setInputs(initialState);
  }, [data]);

  useEffect(() => {
    const jsondata = window.localStorage.getItem("formData");
    const data = JSON.parse(jsondata);
    for (const key in data) {
      if (key === "image") {
        setLocalImage(data[key]);
        // } else if (key && key !== "") {
        //   setInputs((initialState) => ({
        //     ...initialState,
        //     [key]: data[key],
        //   }));
      }
    }
  }, []);

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
      if (imageRender !== image) {
        formData.append("file", image);
      }
      const res = await axios.put(`/api/products/${inputs.id}`, formData);
      handleReload();
      handleVisible();
    } else {
      console.log(error);
    }
  };
  if (!visible) return null;
  return (
    <div
      className={` ${poppins} fixed text-black dark:text-white w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-3/4 max-h-[75vh] place-items-center bg-white dark:bg-dark_blanco max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full mb-2`}>
          {t("car")} #{data.id}
        </h3>
        <form className="bg-gris_fondo dark:bg-dark_fondo lg:w-1/2 px-6 rounded-2xl overflow-y-scroll max-h-[420px] py-3">
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
              {t("brand")}:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2 text-black"
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
              {t("model")}:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2 text-black"
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
              {t("year")}:
            </label>
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2 text-black"
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
              {t("type")}:
            </label>{" "}
            <br />
            <select
              onChange={handleChange}
              defaultValue={inputs?.type}
              className="text-black">
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="camioneta">Camioneta</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="capacity" className={`font-bold`}>
              {t("cap")}:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2 text-black"
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
              {t("transm")}:
            </label>{" "}
            <br />
            <select
              onChange={handleChange}
              defaultValue={inputs?.transmission}
              className="text-black">
              <option value="manual">{t("man")}</option>
              <option value="automática">{t("auto")}</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="price" className={`font-bold`}>
              {t("price")}:
            </label>{" "}
            <br />
            <input
              className="border-[1px] rounded-lg border-black my-1 pl-2 text-black"
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
              {t("descrip")}:
            </label>{" "}
            <br />
            <textarea
              className="border-[1px] rounded-lg w-full border-black my-1 pl-2 resize-none min-h-[150px] text-black"
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
            className={`bg-negro_fondo text-white text-[1em] px-6 py-2 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("volver")}
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={` px-6 py-2 bg-naranja_enf text-white text-[1em] rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("acep-camb")}
          </button>
        </div>
      </figure>
    </div>
  );
}

export default VehicleDetail;
