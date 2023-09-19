"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Poppins } from "next/font/google";
import validation from "@/libs/validation";
import { useTranslation } from "react-i18next";

const alertFontPoppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const poppins = fontPoppins.className;
const alertPoppins = alertFontPoppins.className;

function ProductForm() {
  useEffect(() => {
    const jsondata = window.localStorage.getItem("formData");
    const data = JSON.parse(jsondata);

    for (const key in data) {
      if (key === "image") {
        setLocalImage(data[key]);
      } else if (key && key !== "") {
        setProduct((prevProduct) => ({
          ...prevProduct,
          [key]: data[key],
        }));
      }
    }
  }, []);

  const [localimage, setLocalImage] = useState(false);
  const { t } = useTranslation();
  const [product, setProduct] = useState({
    name: "",
    model: "",
    year: "",
    type: "",
    capacity: "",
    transmission: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState({
    name: "",
    model: "",
    year: "",
    type: "",
    capacity: "",
    transmission: "",
    description: "",
    price: "",
    image: "",
  });

  const [image, setImage] = useState("");

  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
      setError({ ...error, image: validation(e.target.files[0], "file") });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
      setError({
        ...error,
        [e.target.name]: validation(e.target.value, e.target.name),
      });
    }
    setLocalStorage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("formData");
    const formData = new FormData();
    formData.append("data", JSON.stringify(product));
    formData.append("file", image);
    const res = await axios.post("/api/products", formData);
    form.current.reset();
    router.push("/vehiculos");
  };

  const setLocalStorage = () => {
    try {
      const existImage = image !== null;
      const data = { ...product, image: existImage };
      const datajson = JSON.stringify(data);
      window.localStorage.setItem("formData", datajson);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ready = () => {
    return (
      !error.name &&
      !error.model &&
      !error.year &&
      !error.type &&
      !error.capacity &&
      !error.transmission &&
      !error.description &&
      !error.price &&
      !error.image &&
      product.name !== "" &&
      product.model !== "" &&
      product.year !== "" &&
      product.type !== "" &&
      product.capacity !== "" &&
      product.transmission !== "" &&
      product.description !== "" &&
      product.price !== "" &&
      image !== ""
    );
  };

  return (
    <form
      className="bg-white text-black dark:text-white dark:bg-dark_blanco shadow-md rounded-md px-4 sm:px-8 pt-4 pb-4 my-10"
      onSubmit={handleSubmit}
      ref={form}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("brand")}
          </label>
          <input
            value={product.name}
            name="name"
            type="text"
            placeholder="Ingresar nombre"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
          {error.name ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.name}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="model"
            className="block text-gray-700 text-sm font-bold mb-2">
            Modelo
          </label>
          <input
            value={product.model}
            name="model"
            type="text"
            placeholder="Ingresar modelo"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
        </div>
        <div>
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("year")}
          </label>
          <input
            value={product.year}
            name="year"
            type="text"
            placeholder="Ingresar año"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
          {error.year ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.year}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("type")}
          </label>
          <input
            value={product.type}
            name="type"
            type="text"
            placeholder="Ingresar tipo de producto"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
          {error.type ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.type}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("cap")}
          </label>
          <input
            value={product.capacity}
            name="capacity"
            type="text"
            placeholder="Ingresar capacidad"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
          {error.capacity ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.capacity}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="transmission"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("transm")}
          </label>
          <input
            value={product.transmission}
            name="transmission"
            type="text"
            placeholder="Ingresar transmision"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />
          {error.transmission ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.transmission}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("descrip")}
          </label>
          <textarea
            value={product.description}
            name="description"
            rows={3}
            placeholder="Ingresar descripcion"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2 shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("price")}
          </label>
          <input
            value={product.price}
            name="price"
            type="text"
            placeholder="00.00"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3"
          />
          {error.price ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.price}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2">
            {t("img")}
          </label>
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="focus:outline-none focus:border-naranja_enf focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-naranja_enf file:text-gray-700
            hover:file:bg-negro_fondo hover:file:text-white
            sm:text-hidden"
          />
          {localimage && image === "" ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {t("resub")}
            </span>
          ) : (
            ""
          )}
          {error.image ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              {error.image}
            </span>
          ) : (
            ""
          )}
        </div>
        <button
          className={`${poppins} bg-naranja_enf my-3 rounded p-2  ${
            !ready() ? "opacity-60" : ""
          }`}
          type="submit"
          disabled={!ready()}>
          {t("save-car")}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
