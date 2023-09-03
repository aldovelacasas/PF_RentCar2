"use client";
import { useRouter } from "next/navigation";

export default function CarCardDetail({ product }) {

  const router = useRouter();

  return (
    <div
      key={product.id}
      className=" bg-white min-w-[800px] max-w-[1000px] shadow-md shadow-black hover:cursor-pointer hover:scale-105 transform transition-transform duration-300 border border-solid border-negro_fondo">
      <img
        src={product.image}
        alt={product.name}
        className=" w-[100%] mx-auto mb-4  w-32 h-50 object-cover"
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
          <p className="mb-2 text-negro_fondo">Modelo:{product.model}</p>
          <p className="pr-2">Año:{product.year}</p>
        </div>
        <div className="flex justify-between px-2 font-light">
          <p className="mb-2 text-negro_fondo">
            Cap:{product.capacity} Personas
          </p>
          <p className="pr-2">Tipo:{product.type}</p>
        </div>
        <p className="text-negro_fondo text-xs font-light px-2">
          {product.description}
        </p>
      </div>
      <hr className="my-3 mx-2" />

      <div className=" flex justify-center pb-3">
        <button
          className={` w-[90%] bg-naranja_enf text-white text-[1em] px-4 py-1 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}
          onClick={() => {router.push(`/bookings/product/${product.id}`)}}  
        >
          Rentar
        </button>
      </div>
    </div>
  );
}