/* eslint-disable react/jsx-key */
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

function UserDetail({ visible, data, handleVisible }) {
  if (!visible) return null;

  //     id: data.id,
  //     nombre: data.nombre,
  //     pasaporte: data.pasaporte,
  //     correo: data.correo,
  //     reservas: data.reservas,

  return (
    <div
      className={` ${poppins} fixed w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-3/4 max-h-[75vh] place-items-center bg-gris_fondo rounded-2xl max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full`}>
          Usuario #{data.id}
        </h3>
        <main
          className={` ${poppins} bg-gris_fondo  px-6 rounded-2xl overflow-y-scroll max-h-[420px] py-3`}>
          <p>
            <span className="font-bold">Nombre: </span>
            {data.nombre}
          </p>
          <p>
            <span className="font-bold">Pasaporte: </span>
            {data.pasaporte}
          </p>
          <p>
            <span className="font-bold">Correo: </span>
            {data.correo}
          </p>
          <p className="font-bold">Reservas:</p>
          <hr className="my-3 mx-2 border-white overflow-y-hidden" />
          <table className="bg-white rounded-lg">
            <tbody>
              <tr className="border-b-2 border-b-black">
                <th className="font-bold p-2">Vehículo</th>
                <th className="font-bold">Fecha Inicio</th>
                <th className="font-bold">Fecha Fin</th>
                <th className="font-bold p-2">Estado</th>
              </tr>
              {data.reservas.map((r) => (
                <tr className="border-b-2 border-b-black">
                  <td className="p-2">{r.vehiculo}</td>
                  <td className="p-2">{r.fechaInicio}</td>
                  <td className="p-2">{r.fechaFin}</td>
                  <td className="p-2">{r.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="my-3 mx-2 border-white" />
        </main>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            type="button"
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Volver
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Aceptar cambios
          </button>
        </div>
      </figure>
    </div>
  );
}

export default UserDetail;
