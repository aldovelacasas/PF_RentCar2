"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Poppins } from "next/font/google";

const alertFontPoppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

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

  const [image, setImage] = useState("");

  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
    setLocalStorage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("formData");
    alert("bien");
    // const formData = new FormData();

    // formData.append("data", JSON.stringify(product));
    // formData.append("file", image);

    // const res = await axios.post("/api/products", formData);
    // form.current.reset();
    // router.push("/vehiculos");
  };

  const setLocalStorage = () => {
    try {
      const existImage = image !== null;
      console.log("image es ", image);
      console.log("existe", existImage);
      const data = { ...product, image: existImage };
      const datajson = JSON.stringify(data);
      window.localStorage.setItem("formData", datajson);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded-md px-8 pt-4 pb-4 mb-4"
      onSubmit={handleSubmit}
      ref={form}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            value={product.name}
            name="name"
            type="text"
            placeholder="Enter product name"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
            autoFocus
          />
        </div>
        <div>
          <label
            htmlFor="model"
            className="block text-gray-700 text-sm font-bold mb-2">
            Product Model
          </label>
          <input
            value={product.model}
            name="model"
            type="text"
            placeholder="Enter product model"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2">
            Year
          </label>
          <input
            value={product.year}
            name="year"
            type="text"
            placeholder="Enter year"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2">
            Type
          </label>
          <input
            value={product.type}
            name="type"
            type="text"
            placeholder="Enter product type"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="capacity"
            className="block text-gray-700 text-sm font-bold mb-2">
            Capacity
          </label>
          <input
            value={product.capacity}
            name="capacity"
            type="text"
            placeholder="Enter capacity"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="transmission"
            className="block text-gray-700 text-sm font-bold mb-2">
            Transmission
          </label>
          <input
            value={product.transmission}
            name="transmission"
            type="text"
            placeholder="Enter transmission"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            value={product.description}
            name="description"
            rows={3}
            placeholder="Enter description"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            value={product.price}
            name="price"
            type="text"
            placeholder="00.00"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
          {localimage ? (
            <span
              className={`${alertPoppins} text-sm`}
              style={{ color: "red" }}>
              Vuelve a subir tu archivo
            </span>
          ) : (
            ""
          )}
        </div>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
          Save Product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
