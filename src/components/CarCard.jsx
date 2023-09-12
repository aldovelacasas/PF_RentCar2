"use client";

export default function CarCard({ car, handleVisibility, handleDetail }) {
  return (
    <div
      key={car.id}
      className=" bg-white min-w-[290px] max-w-[291px] shadow-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-200 border rounded-sm border-solid border-negro_fondo ">
      <main onClick={() => handleDetail(car)} className="group relative">
        <div className="absolute w-full h-0 bg-[#525252cc] items-center justify-center group-hover:h-full flex group-hover:ease-in-out group-hover:duration-[350ms]">
          <p className="text-white hidden text-center group-hover:block">
            Más información
          </p>
        </div>
        <img
          src={car.image}
          alt={car.name}
          className=" w-[100%] px-3 py-3 mx-auto mb-4 h-[10rem] object-cover"
        />
        <div>
          <div className="flex flex-wrap justify-between px-3 mb-0">
            <h2 className="text-lg font-semibold mb-0 ">{car.name}</h2>
            <p className=" font-bold text-xl mb-0">${car.price}</p>
          </div>
          <p className="flex flex-wrap justify-between font-normal px-3 mb-0">{car.model}</p>
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



        </div>
        <hr className="my-3 mx-2" />
      </main>

      <div className=" flex justify-center pb-3">
        <button
          onClick={() => handleVisibility(car)}
          className={` w-[90%] bg-naranja_enf text-white text-[1em] px-4 py-1 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          Rentar
        </button>
      </div>
    </div>
  );
}
