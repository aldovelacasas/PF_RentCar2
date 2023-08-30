import { Rubik, Poppins } from "next/font/google";
import {
  BsChevronCompactRight,
  BsCheckCircleFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { BiSolidCar } from "react-icons/bi";
import { FaCalendarAlt, FaSearchDollar } from "react-icons/fa";
import { PiCar, PiCarProfile, PiPhoneCallBold } from "react-icons/pi";

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

function HomePage() {
  return (
    <>
      <header className={`bg-gris_fondo ${rubik} space-y-0 space-x-2.5`}>
        <p className={`pt-12 ml-2.5 text-[0.8em] mb-2`}>
          Planea tu viaje ahora
        </p>
        <p className="text-[1.3em]  leading-6">
          <span className="text-naranja_enf">Ahorra </span>
          con nuestra
        </p>
        <p className="text-[1.3em] leading-6">renta de vehículos</p>
        <p className={`${poppins} text-[0.6em] mt-2`}>
          Renta el auto de tus sueños con precios imbatibles,
        </p>
        <p className={`${poppins} text-[0.6em] pb-4`}>
          km ilimitado, opciones flexibles y mucho más.
        </p>
        <div className="flex place-content-evenly w-full mt-3 pb-10">
          <button
            className={`bg-naranja_enf text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Renta <BsCheckCircleFill className="inline pl-1" />
          </button>
          <button
            className={`bg-negro_fondo text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Conoce más
            <BsChevronCompactRight className="inline pl-1 stroke-slate-100 pr-0 mr-0" />
          </button>
        </div>
      </header>
      <form
        className={`pt-2 ${poppins} text-[0.8em] pl-14 bg-gris_frente pb-12`}>
        <p className={`text-[1rem] ${rubik} mb-2`}>Renta un auto</p>
        <label htmlFor="categoria" className="">
          <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige una
          categoría
        </label>
        <br />
        <input className="bg-gris_fondo w-[200px] mb-4" name="categoría" />{" "}
        <br />
        <label htmlFor="fechaInicio" className="">
          <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
          inicio
        </label>
        <br />
        <input className="bg-gris_fondo w-[200px] mb-4" name="fechaFin" />{" "}
        <br />
        <label htmlFor="fechaFin" className="">
          <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
          fin
        </label>
        <br />
        <input className="bg-gris_fondo w-[200px]" name="fechaFin" /> <br />
        <button
          className={`bg-naranja_enf text-white text-[0.7rem] px-4 py-1 mt-4 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          Buscar
        </button>
      </form>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[0.8rem] ${rubik} mb-2 text-center`}>
          Planea tu viaje
        </p>
        <p className={`text-[1rem] ${rubik} mb-6 text-center`}>
          Alquila tu auto fácil y rápido
        </p>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiCar className="text-[50px] text-naranja_enf stroke-2" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>Elije tu carro</p>
            <p className={`text-[0.8rem] ${poppins}  `}>
              Contamos con una gran colección de vehículos disponibles sólo para
              ti.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-4  px-3 my-10">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiPhoneCallBold className="text-[50px] text-naranja_enf font-thin" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>¿Dudas?</p>
            <p className={`text-[0.8rem] ${poppins} mb-2 `}>
              Contacta con nosotros y te responderemos al momento.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiCarProfile className="text-[50px] text-naranja_enf stroke-2" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>Conduce</p>
            <p className={`text-[0.8rem] ${poppins} mb-2 `}>
              Disfruta de la renta de tu vehículo vayas a donde vayas.
            </p>
          </div>
        </div>
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[0.8rem] mb-2 text-center`}>Planea tu viaje</p>
        <p className={`text-[1rem] mb-6 text-center`}>
          Alquila tu auto fácil y rápido
        </p>
        {/* visualizador de vehículos */}
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-white text-center text-[0.8em] bg-negro_fondo pb-6`}>
        <p className="text-2xl">Ven y ahorra con nosotros</p>
        <p>
          Contamos con atención al cliente{" "}
          <span className="text-naranja_enf">24/7</span>
        </p>
      </section>
      <section
        className={`pt-16 px-5 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p>¿Por qué rentar con nosotros?</p>
        <p className="text-2xl">
          Contamos el vehículo que necesitas al
          <span className="text-naranja_enf"> mejor precio</span>
        </p>
        <p className="pt-4 mb-8">
          Descubre las mejores ofertas con nuestros precios imbatibles dándote
          la mejor relación calidad/precio del mercado. Nuestros vehículos son
          revisados y lavados antes de lllegar a tus manos, de manera que te e
          vitas temas desagradables e inesperados que encontrarías en nuestra
          competencia.
        </p>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiCarProfile className="text-[50px] text-naranja_enf stroke-2" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>
              Conduce hasta donde quieras
            </p>
            <p className={`text-[0.8rem] ${poppins}  `}>
              Lleva tu próxima aventura al siguiente nivel con nuestros
              vehículos de la mejor calidad.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-4  px-3 my-10">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <BsFillCreditCard2BackFill className="text-[30px] text-naranja_enf font-thin" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>Facilidad de pago</p>
            <p className={`text-[0.8rem] ${poppins} mb-2 `}>
              Paga con tu cuenta de mercadoPago de manera fácil, sencilla y
              transparente.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <FaSearchDollar className="text-[30px] text-naranja_enf stroke-2" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8rem] ${rubik} mb-2`}>Sin cargos ocultos</p>
            <p className={`text-[0.8rem] ${poppins} mb-2 `}>
              Nuestros precios son finales por lo que una vez pagado, puedes
              disfrutar de la calma de tu viaje.
            </p>
          </div>
        </div>
      </section>
      <section
        className={`pt-16 px-5 ${rubik} mx-[auto] text-[0.8em] bg-gris_fondo pb-12`}>
        <p className="text-center">Prueba Social</p>
        <p className="text-2xl text-center pb-4">
          Lee las reseñas de otros clientes
        </p>
        <p className="pb-4">
          Más de 5 años de experiencia nos respaldan y nuestros clientes pueden
          corroborar nuestro excelentísimo servicio.
        </p>
        <div className={`bg-white ${rubik} text-[0.7rem] p-2 mb-2`}>
          <p>
            "Nunca habíamos rentado un auto antes, pero luego de haber puesto
            nuestro voto de confianza en esta página, es una experiencia que
            quiero repetir cada que tenga vacaciones".
          </p>
          <img
            src="https://as1.ftcdn.net/v2/jpg/06/12/43/02/1000_F_612430205_6OQ7Lz31PcF0isBUvlfJcDOLEkvsHSsx.jpg"
            className="w-[30px] h-[30px] rounded-full"
          />
        </div>
      </section>
    </>
  );
}

export default HomePage;
