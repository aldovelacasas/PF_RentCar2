"use client";
import { useRouter } from "next/navigation";


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

export default function CarCardDetail({
  product,
  visible,
  handleClose,
  handleRentVisibility,
}) {
  if (!visible) return null;
  return (
    <section
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center z-40`}>
      <div
        key={product.id}
        className=" w-full max-h-[75vh] bg-white max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <main className="overflow-y-auto max-h-[60vh]">
          <p
            className={` ${rubik} bg-naranja_enf sticky top-0 py-1 text-center font-bold text-white`}>
            Detalle del vehículo
          </p>
          <img
            src={product.image}
            alt={product.name}
            className="  mx-auto mb-4 max-h-[300px] object-cover"
          />
          <div>
            <div className="flex flex-wrap justify-between px-3 mb-0">
              <h2 className="text-lg font-semibold text-negro_fondo mb-0 ">
                {product.name}
              </h2>
              <p className="text-begro_fondo font-bold text-xl mb-0">
                ${product.price}
              </p>
            </div>
            <div className="flex px-2 justify-between mb-2">
              <div className="flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-yellow-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-yellow-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-yellow-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-yellow-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-gray-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm font-light pr-2">Por día</p>
            </div>
            <div className="flex justify-between px-2 font-light">
              <p className="mb-2 text-negro_fondo">
                <span className="font-bold">Modelo:</span> {product.model}
              </p>
              <p className="pr-2">
                <span className="font-bold">Año:</span>
                {product.year}
              </p>
            </div>
            <div className="flex justify-between px-2 font-light">
              <p className="mb-2 text-negro_fondo">
                <span className="font-bold">Capacidad (Usuarios):</span>
                {product.capacity} Personas
              </p>
              <p className="pr-2">
                <span className="font-bold">Tipo:</span> {product.type}
              </p>
            </div>
            <hr className="my-2" />
            <p className="text-negro_fondo text-[1.2em] font-light px-2">
              <span className="font-bold">Descripción:</span>{" "}
              {product.description}
            </p>
          </div>
        </main>
        <hr className="my-3 mx-2" />
        <div
          className={` ${rubik} flex justify-evenly lg:w-1/2 mx-[auto] text-[0.9em] py-6  pb-2 mb-4`}>
          <button
            onClick={() => handleRentVisibility(product)}
            className={` rounded-md px-4 py-[2px] bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Rentar
          </button>
          <button
            onClick={handleClose}
            className={` bg-gris_fondo text-black text-[1em] px-4 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Cerrar
          </button>
        </div>

      </div>
    </section>
  );
}
