/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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

function RentalDetail({ visible, data, handleVisible }) {
  if (!visible) return null;
  return (
    <div
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-1/2 rounded-2xl max-h-[75vh] place-items-center bg-gris_fondo max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full`}>
          Renta #{data.id}
        </h3>
        <img src={data.image} className="max-h-[200px]" />
        <div className="bg-white px-6 rounded-2xl">
          <hr className="my-3 mx-2 border-gris_fondo" />
          <p>
            <span className="font-bold">Usuario: </span>
            {data.user}
          </p>
          <p>
            <span className="font-bold">Vehículo: </span>
            {data.vehicle}
          </p>
          <p>
            <span className="font-bold">Monto: </span>
            {data.monto}
          </p>
          <p>
            <span className="font-bold">Estado: </span>
            {data.status}
          </p>
          <p>
            <span className="font-bold">Fechas: </span>
            {data.fecha_inicio} - {data.fecha_fin}
          </p>
          <hr className="my-3 mx-2 border-gris_fondo" />
        </div>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-4 md:px-6 md:py-2 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Volver
          </button>

          <div className="flex justify-evenly gap-4">
            <button
              className={`rounded-md px-4 md:px-6 md:py-2 py-[2px] bg-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Cancelar renta
            </button>
            <button
              className={`rounded-md px-4 md:px-6 md:py-2 py-[2px] bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Finalizar renta
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default RentalDetail;
