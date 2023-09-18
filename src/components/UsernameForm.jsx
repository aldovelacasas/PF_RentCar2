import { Poppins } from "next/font/google";
const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const poppins = fontPoppins.className;

function Form(props) {
  return (
    <form>
      <input
        placeholder="Ingresar nombre.."
        type="text"
        value={props.username}
        onChange={props.onChange}
        className="w-full py-2 px-3 mb-3"
      />
      <button
        className={`${poppins} bg-naranja_enf rounded px-2 py-2`}
        onClick={props.connect}>
        Hablar con representante
      </button>
    </form>
  );
}

export default Form;
