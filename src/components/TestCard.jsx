/* eslint-disable @next/next/no-img-element */
import { Rubik, Poppins } from "next/font/google";
import { useTranslation } from "react-i18next";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "600",
  style: "italic",
  subsets: ["latin"],
});
const poppins = fontPoppins.className;
const rubik = fontRubik.className;

function convertirATitulo(cadena) {
  return cadena.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function TestCard({ name, description, profession, rating, image }) {
  const { t } = useTranslation();
  return (
    <div className="p-4 my-5 border border-gray-300 sm:mx-20 rounded-md max-w-[80%] lg:w-[60%] bg-gris_fondo dark:bg-dark_fondo shadow-gray-400 shadow-sm hover:shadow-black transition duration-700 ease-in-out">
      <h4
        className={`text-sm mb-2  italic ${poppins}`}>{`"${description}"`}</h4>
      <div className="flex justify-between items-center space-x-3">
        <div className="flex">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              className="object-cover w-full h-full"
              src={
                image
                  ? image
                  : "https://res.cloudinary.com/dztkjtnfv/image/upload/v1694534278/perfil_byfvxq.png"
              }
              alt={name}
            />
          </div>
          <div className="ml-2">
            <h4 className="text-base font-medium">
              {name ? convertirATitulo(name) : "Anonimo"}
            </h4>
            <p className="text-sm text-gray-500">{t("client")}</p>
          </div>
        </div>
        <div className="flex items-center text-yellow-400 space-x-1 mr-1">
          {Array.from({ length: rating }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M10 1a1 1 0 0 1 .95.684l1.5 4.79a1 1 0 0 0 .949.686l4.386.011a1 1 0 0 1 .55 1.73L14.35 10.59a1 1 0 0 0-.29 1.05l1.436 4.643a1 1 0 0 1-1.548 1.14L10 15.63a1 1 0 0 0-.78 0l-4.388 2.243a1 1 0 0 1-1.548-1.14L5.94 11.64a1 1 0 0 0-.29-1.05L1.113 7.427a1 1 0 0 1 .55-1.73l4.386-.01a1 1 0 0 0 .95-.684l1.5-4.79A1 1 0 0 1 10 1z"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestCard;
