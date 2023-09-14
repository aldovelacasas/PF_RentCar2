"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

async function loadProduct(id) {
  const { data } = await axios.get(`${process.env.API_BASE_URL}/api/products/${id}`,id);
  return await data;
}

function BookingForm({ productId }) {

  const [productID, setProductID] = useState({});

  useEffect(() => {
    const url = window.location.href;
    const partes = url.split("/");
    const stringId = partes[partes.length - 1];
    const id = Number(stringId);

    loadProduct(id).then((data) => setProductID(data));
  }, []);

  const [booking, setBooking] = useState({
    userID: 1,
    productID: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/bookings", booking);
    const rdo = booking;

    form.current.reset();
    router.push("/bookings");
    alert(
      "la reserva del vehículo con identificador # " +
        rdo.productID +
        ", ha sido exitosa!!!"
    );
  };

  return (
    <form
      className="bg-white dark:bg-dark_blanco shadow-md rounded-md px-8 pt-4 pb-4 mb-4 text-black dark:text-white"
      onSubmit={handleSubmit}
      ref={form}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p>{productID.price}</p>
        </div>

        <div>
          <label
            htmlFor="productID"
            className="block text-gray-700 text-sm font-bold mb-2">
            Vehículo(id)
          </label>
          <input
            name="productID"
            type="string"
            value={productID.id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label
            htmlFor="fecha_inicio"
            className="block text-gray-700 text-sm font-bold mb-2">
            Fecha Inicial
          </label>
          <input
            name="fecha_inicio"
            type="date"
            placeholder="Ingresa un fecha inicial"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="fecha_fin"
            className="block text-gray-700 text-sm font-bold mb-2">
            Fecha Final
          </label>
          <input
            name="fecha_fin"
            type="date"
            placeholder="Ingresa una fecha de final"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
          Save Booking
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
