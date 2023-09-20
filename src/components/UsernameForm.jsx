import { Rubik } from "next/font/google";
import { useTranslation } from "react-i18next";
const fontRubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});

const rubik = fontRubik.className;

function Form(props) {
  const { t } = useTranslation();
  return (
    <form className="z-50 min-h-10">
      <div className="flex flex-row">
        <input
          placeholder="Ingresa tu nombre"
          type="text"
          value={props.username}
          onChange={props.onChange}
          className="w-full mx-1 border border-gray-400 rounded-md"
        />
        <button
          className={`${rubik} text-s bg-naranja_enf rounded px-2 py-2 text-white font-bold shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}
          onClick={props.connect}>
          Conectarse
        </button>
      </div>

    <form className="z-50">
      <input
        placeholder="Ingresa tu nombre.."
        type="text"
        value={props.username}
        onChange={props.onChange}
        className="w-full py-2 px-3 mb-3"
      />
      <button
        className={`${rubik} bg-naranja_enf rounded px-2 py-2 text-white font-bold shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}
        onClick={props.connect}>
        {t("chat-rep")}
      </button>
    </form>
  );
}

export default Form;
