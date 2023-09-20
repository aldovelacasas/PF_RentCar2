/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Rubik, Poppins } from "next/font/google";
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

function RentalDetail({
  visible,
  data,
  handleVisible,
  handleActive,
  handleCancel,
  isUser = false,
}) {
  if (!visible) return null;
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
  const { t } = useTranslation();
  let startDay = data?.fecha_inicio.slice(8, 10);
  let startMonth = new Date(data?.fecha_inicio).getMonth();
  let startYear = new Date(data?.fecha_inicio).getFullYear();

  let fechaInicio = `${startDay}/${meses[startMonth]}/${startYear}`;

  let endDay = data?.fecha_fin.slice(8, 10);
  let endMonth = new Date(data?.fecha_fin).getMonth();
  let endYear = new Date(data?.fecha_fin).getFullYear();

  let fechaFin = `${endDay}/${meses[endMonth]}/${endYear}`;

  function handleRentCancel(id) {
    handleCancel(id);
    handleVisible();
  }

  function handleRentActive(id) {
    handleActive(id);
    handleVisible();
  }

  return (
    <div
      className={` ${poppins} fixed text-black dark:text-white w-[100vw] top-0 left-0 pt-[15vh] h-[100vh] flex justify-center bg-[#dbdbdbcc] z-40`}>
      <figure className=" w-full md:w-4/5 lg:w-1/2 rounded-2xl max-h-[75vh] place-items-center bg-gris_fondo dark:bg-dark_fondo max-w-[1000px] shadow-md shadow-black border border-solid border-negro_fondo grid">
        <h3
          className={`${rubik} w-1/2 text-center py-1 bg-negro_fondo text-white rounded-full`}>
          {t("renta")} #{data.id}
        </h3>
        <img src={data.image} className="max-h-[200px]" />
        <div className="bg-white dark:bg-dark_blanco px-6 rounded-2xl">
          <hr className="my-3 mx-2 border-gris_fondo" />
          <p>
            <span className="font-bold">{t("user")}: </span>
            {data.user}
          </p>
          <p>
            <span className="font-bold">{t("car")}: </span>
            {data.vehicle}
          </p>
          <p>
            <span className="font-bold">{t("monto")}: </span>
            {data.monto} USD
          </p>
          <p>
            <span className="font-bold">{t("status")}: </span>
            {data.status}
          </p>
          <p>
            <span className="font-bold">{t("dates")}: </span>
            {fechaInicio} - {fechaFin}
          </p>
          <hr className="my-3 mx-2 border-gris_fondo" />
        </div>
        <div className={`${rubik} flex justify-evenly w-3/4 pb-6 pt-4`}>
          <button
            onClick={handleVisible}
            className={`bg-negro_fondo text-white text-[1em] px-4 md:px-6 md:py-2 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            {t("volver")}
          </button>
          {!isUser && (
            <div className="flex justify-evenly gap-4">
              <button
                onClick={() => handleRentCancel(data.id)}
                className={`rounded-md px-4 md:px-6 md:py-2 py-[2px] bg-white dark:bg-dark_blanco text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("cancel-rent")}
              </button>
              <button
                onClick={() => handleRentActive(data.id)}
                className={`rounded-md px-4 md:px-6 md:py-2 py-[2px] bg-naranja_enf text-white text-[1em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("finish-rent")}
              </button>
            </div>
          )}
        </div>
      </figure>
    </div>
  );
}

export default RentalDetail;
