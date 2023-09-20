/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import { Rubik, Poppins } from "next/font/google";
import { useState } from "react";
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

function UserDetail({
  visible,
  data = {
    id: "",
  },
  handleVisible,
}) {
  if (!visible) return null;
  //     id: data.id,
  //     nombre: data.nombre,
  //     pasaporte: data.pasaporte,
  //     correo: data.correo,
  //     reservas: data.reservas,
  const { t } = useTranslation();
  return (
    <div
      className={` ${poppins} fixed text-black dark:text-white w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-3/4 max-h-[75vh] place-items-center bg-gris_fondo dark:bg-dark_fondo rounded-2xl max-w-[1000px] shadow-md shadow-black hover:cursor-pointer border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full`}>
          {t("user")} #{data.id}
        </h3>
        <main
          className={` ${poppins} bg-gris_fondo dark:bg-dark_fondo  px-6 rounded-2xl overflow-y-scroll max-h-[420px] py-3`}>
          <p>
            <span className="font-bold"> {t("name")}: </span>
            {data.username ?? "N/A"}
          </p>
          <p>
            <span className="font-bold"> {t("passport")}: </span>
            {data.passport ?? "N/A"}
          </p>
          <p>
            <span className="font-bold"> {t("mail")}: </span>
            {data.emailUser ?? "N/A"}
          </p>
          <p className="font-bold">{t("reser")}:</p>
          <hr className="my-3 mx-2 border-white overflow-y-hidden" />
          <table className="bg-white dark:bg-dark_blanco rounded-lg">
            <tbody>
              <tr className="border-b-2 border-b-black">
                <th className="font-bold p-2">{t("car")}</th>
                <th className="font-bold">{t("fechainicio")}</th>
                <th className="font-bold">{t("fechafin")}</th>
                <th className="font-bold p-2">{t("status")}</th>
              </tr>
              {data.rentals?.map((r) => {
                const meses = [
                  "Enero",
                  "Feb.",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Sept.",
                  "Oct.",
                  "Nov.",
                  "Dic.",
                ];

                let startDay = new Date(r.fecha_inicio).getDay();
                let startMonth = new Date(r.fecha_inicio).getMonth();
                let startYear = new Date(r.fecha_inicio).getFullYear();

                let fechaInicio = `${startDay}/${meses[startMonth]}/${startYear}`;

                let endDay = new Date(r.fecha_fin).getDay();
                let endMonth = new Date(r.fecha_fin).getMonth();
                let endYear = new Date(r.fecha_fin).getFullYear();

                let fechaFin = `${endDay}/${meses[endMonth]}/${endYear}`;
                return (
                  <tr className="border-b-2 border-b-black">
                    <td className="p-2">{r.vehicle ?? r.productID}</td>
                    <td className="p-2">{fechaInicio}</td>
                    <td className="p-2">{fechaFin}</td>
                    {r.statusB == 1 && new Date() > new Date(r.fecha_fin) ? (
                      <td className="bg-[#d1fae5] text-[#047857] px-2 rounded-md m-2 grid place-content-center">
                        {t("finished")}
                      </td>
                    ) : r.statusB == 1 && new Date() < new Date(r.fecha_fin) ? (
                      <td className="bg-[#f3f4f6] px-2 rounded-md text-black m-2 grid place-content-center">
                        {t("active")}
                      </td>
                    ) : (
                      <td className="bg-[#ffe4e6] text-[#be123c] px-2 rounded-md m-2 grid place-content-center">
                        {t("cancelado")}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr className="my-3 mx-2 border-white" />
        </main>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            type="button"
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-4 py-2 rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("volver")}
          </button>
        </div>
      </figure>
    </div>
  );
}

export default UserDetail;
