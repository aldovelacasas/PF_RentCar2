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

function OpinionForm() {
  return (
    <div className="bg-gray-400 flex flex-col items-center justify-center">
      <form className="p-4 mx-4 my-4 max-w-md w-full">
        <h3 className={`${rubik} text-2xl font-bold mb-2`}>Deja tu reseña</h3>
        <p className={`${poppins} text-base text-gray-600 mb-6`}>
          Dinos qué opinas de nuestros servicios
        </p>
        <label htmlFor="email" className={`${poppins} block mb-1`}>
          Email
        </label>
        <input type="email" name="email" className="w-full py-2 px-3 mb-3" />
        <label htmlFor="nameSurname" className={`${poppins} block mb-1`}>
          Nombre y apellido
        </label>
        <input
          type="text"
          name="nameSurname"
          className="w-full py-2 px-3 mb-3"
        />
        <label htmlFor="profession" className={`${poppins} block mb-1`}>
          Profesión
        </label>
        <input
          type="text"
          name="profession"
          className="w-full py-2 px-3 mb-3"
        />
        <label htmlFor="opinion" className={`${poppins} block mb-1`}>
          Opinión
        </label>
        <textarea
          name="opinion"
          cols="30"
          rows="5"
          className="w-full py-2 px-3 mb-3"></textarea>
        <button
          className={`${poppins} bg-naranja_enf rounded px-3 py-2`}
          type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default OpinionForm;
