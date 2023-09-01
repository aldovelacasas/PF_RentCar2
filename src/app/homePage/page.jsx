"use client";
import { emailValidate } from "@/libs/functions.js";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { categorias } from "../../libs/categorias.js";
import {
  BsChevronCompactRight,
  BsCheckCircleFill,
  BsFillCreditCard2BackFill,
} from "react-icons/bs";
import { FaCalendarAlt, FaSearchDollar } from "react-icons/fa";
import { PiCar, PiCarProfile, PiPhoneCallBold } from "react-icons/pi";
import { BiSolidCar } from "react-icons/bi";
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

function HomePage() {
  const [display, setDisplay] = useState(categorias[0].imagen);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    let newdisplay = categorias.find((c) => c.tipo === e.target.value);
    setDisplay(newdisplay.imagen);
  }

  function handleCollapse() {}

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    setErrors(emailValidate(email));
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength) {
      function sendMail() {
        var templateParams = {
          email: `${email}`,
        };

        emailjs
          .send(
            "service_m6um18e",
            "template_0kxpm4e",
            templateParams,
            "7QMYSYK9xg_8ZFAie"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
              window.alert("Suscrito exitosamente");
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      }
      sendMail();
      setEmail("");
    }
  }

  function handleScrollForm() {
    if (window.innerWidth <= 400) {
      window.scrollTo({
        top: 220,
        behavior: "smooth",
      });
    } else if (window.innerWidth <= 800) {
      window.scrollTo({
        top: 270,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 450,
        behavior: "smooth",
      });
    }
  }

  function handleScrollInfo() {
    if (window.innerWidth <= 400) {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    } else if (window.innerWidth <= 800) {
      window.scrollTo({
        top: 580,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 980,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="grid bg-gris_frente md:text-[2em]">
      <header
        className={`bg-gris_fondo ${rubik} text-[1em] sm:text-[1.5em]  pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`pt-12 ml-2.5 text-[0.8em] mb-2`}>
          Planea tu viaje ahora
        </p>
        <p className="text-[1.3em]  leading-6  md:leading-[1.8em]">
          <span className="text-naranja_enf">Ahorra </span>
          con nuestra
        </p>
        <p className="text-[1.3em] leading-6 md:leading-[1.2em] md:pb-4">
          renta de vehículos
        </p>
        <p className={`${poppins} text-[0.6em] mt-2`}>
          Renta el auto de tus sueños con precios imbatibles,
        </p>
        <p className={`${poppins} text-[0.6em] pb-4`}>
          km ilimitado, opciones flexibles y mucho más.
        </p>
        <div className="flex place-content-evenly w-full  sm:w-2/3 mt-3 pb-10 md:pt-[40px] md:w-1/2">
          <button
            onClick={handleScrollForm}
            className={`bg-naranja_enf text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Renta <BsCheckCircleFill className="inline pl-1" />
          </button>
          <button
            onClick={handleScrollInfo}
            className={`bg-negro_fondo text-white text-[0.7em] px-4 py-1 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Conoce más
            <BsChevronCompactRight className="inline pl-1 pr-0 mr-0 " />
          </button>
        </div>
      </header>
      <form
        className={`bg-white pt-2 ${poppins} text-[0.8em] sm:text-[1em] md:text-[1.2em] px-[25%] justify-self-center bg-gris_frente pb-12`}>
        <p
          className={`text-[1em] md:text-[1.2em] ${rubik} mb-2 md:mt-[80px] text-center`}>
          Renta un auto
        </p>
        <fieldset>
          <label htmlFor="categoria" className="">
            <BiSolidCar className="inline text-naranja_enf mr-1" /> Elige una
            categoría
          </label>
          <br />
          <select
            className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="categoría">
            <option defaultValue={true}>Elige categoría</option>
            {categorias.map((c) => (
              <option key={c.tipo}>{c.tipo}</option>
            ))}
          </select>
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="fechaInicio" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
            inicio
          </label>
          <br />
          <input
            className="bg-gris_fondo w-[200px] mb-4 text-[0.9em] md:w-[500px]"
            name="fechaFin"
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />
          <br />
        </fieldset>
        <fieldset>
          <label htmlFor="fechaFin" className="">
            <FaCalendarAlt className="inline text-naranja_enf mr-1" /> Fecha de
            fin
          </label>
          <br />
          <input
            className="bg-gris_fondo w-[200px] text-[0.9em] md:w-[500px]"
            name="fechaFin"
            type="date"
            min={new Date().toISOString().split("T")[0]}
          />{" "}
          <br />
        </fieldset>
        <button
          className={`bg-naranja_enf text-white text-[0.8em] px-4 py-1 mt-4 ${poppins} shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          Buscar
        </button>
      </form>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente pb-12 sm:text-[1.2em]`}>
        <p className={`text-[0.8em] ${rubik} mb-2 text-center`}>
          Planea tu viaje
        </p>
        <p className={`text-[1em] ${rubik} mb-6 text-center`}>
          Alquila tu auto fácil y rápido
        </p>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiCar className="text-[50px] text-naranja_enf" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8em] ${rubik} mb-2`}>Elije tu carro</p>
            <p className={`text-[0.8em] ${poppins}  `}>
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
            <p className={`text-[0.8em] ${rubik} mb-2`}>¿Dudas?</p>
            <p className={`text-[0.8em] ${poppins} mb-2 `}>
              Contacta con nosotros y te responderemos al momento.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-x-4  px-3">
          <figure className="bg-[#ea4e398a] float-left rounded-full h-[65px] w-[65px] flex justify-center items-center">
            <PiCarProfile className="text-[50px] text-naranja_enf" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8em] ${rubik} mb-2`}>Conduce</p>
            <p className={`text-[0.8em] ${poppins} mb-2 `}>
              Disfruta de la renta de tu vehículo vayas a donde vayas.
            </p>
          </div>
        </div>
      </section>
      <section
        className={`pt-4 ${rubik} grid mx-[auto] text-[0.8em] bg-gris_frente pb-12 sm:text-[1.2em]`}>
        <p className={`text-[0.8em] mb-2 text-center`}>Planea tu viaje</p>
        <p className={`text-[1em] mb-6 text-center`}>
          Alquila tu auto fácil y rápido
        </p>
        <img
          src={display}
          className="w-3/4 justify-self-center object-fill h-[200px]  sm:h-[350px] md:h-[450px]"
        />
        <div className="p-4 grid grid-cols-2 gap-4 w-3/4 justify-self-center">
          {categorias.map((c) => (
            <button
              key={c.tipo}
              value={c.tipo}
              onClick={handleChange}
              className="bg-naranja_enf px-4 py-2 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black">
              {c.tipo}
            </button>
          ))}
        </div>
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-white text-center text-[0.8em] w-full bg-negro_fondo pb-6 sm:py-[40px] md:py-[80px] sm:text-[1.2em]`}>
        <p className="text-2xl md:text-[1.8em] md:leading-[1.8em]">
          Ven y ahorra con nosotros
        </p>
        <p>
          Contamos con atención al cliente{" "}
          <span className="text-naranja_enf">24/7</span>
        </p>
      </section>
      <section
        className={` w-3/4 pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 sm:text-[1.2em]`}>
        <p>¿Por qué rentar con nosotros?</p>
        <p className="text-2xl md:text-[1.9em] md:leading-[1.2em]">
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
            <PiCarProfile className="text-[50px] text-naranja_enf" />
          </figure>
          <div className="w-2/3">
            <p className={`text-[0.8em] ${rubik} mb-2`}>
              Conduce hasta donde quieras
            </p>
            <p className={`text-[0.8em] ${poppins}  `}>
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
            <p className={`text-[0.8em] ${rubik} mb-2`}>Facilidad de pago</p>
            <p className={`text-[0.8em] ${poppins} mb-2 `}>
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
            <p className={`text-[0.8em] ${rubik} mb-2`}>Sin cargos ocultos</p>
            <p className={`text-[0.8em] ${poppins} mb-2 `}>
              Nuestros precios son finales por lo que una vez pagado, puedes
              disfrutar de la calma de tu viaje.
            </p>
          </div>
        </div>
      </section>
      <section
        className={`pt-16 px-5 ${rubik} mx-[auto] text-[0.8em] bg-gris_fondo pb-12 w-3/4`}>
        <p className="text-center">Prueba Social</p>
        <p className="text-2xl text-center pb-4">
          Lee las reseñas de otros clientes
        </p>
        <p className="pb-4">
          Más de 5 años de experiencia nos respaldan y nuestros clientes pueden
          corroborar nuestro excelentísimo servicio.
        </p>
        <div className={`bg-white ${rubik} text-[0.8em] p-4`}>
          <p>
            "Nunca habíamos rentado un auto antes, pero luego de haber puesto
            nuestro voto de confianza en esta página, es una experiencia que
            quiero repetir cada que tenga vacaciones".
          </p>
          <div className="flex place-content-between items-center">
            <div className="flex w-1/2 gap-3 items-center mt-4">
              <img
                src="https://as1.ftcdn.net/v2/jpg/06/12/43/02/1000_F_612430205_6OQ7Lz31PcF0isBUvlfJcDOLEkvsHSsx.jpg"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p>Juanito Pérez</p>
                <p className={`${poppins} text-[0.8em]`}>Abogado</p>
              </div>
            </div>
            <p className="text-amarillo_status text-2xl mt-4">★★★★★</p>
          </div>
        </div>
        <div className={`bg-white ${rubik} text-[0.8em] p-4 mt-6`}>
          <p>
            "Después de estas últimas vacaciones me sentí tan libre que me
            gustaría poder recomendarle a todos una aventura igual a la mía. De
            no ser por esta página no la habría tenido".
          </p>
          <div className="flex place-content-between items-center">
            <div className="flex w-1/2 gap-3 items-center mt-4">
              <img
                src="https://as1.ftcdn.net/v2/jpg/06/19/08/48/1000_F_619084808_hMVvUzdIiIPSFQz217WhCR8StVF1xRDC.jpg"
                className="w-[30px] h-[30px] rounded-full"
              />
              <div>
                <p>Juanita López</p>
                <p className={`${poppins} text-[0.8em]`}>Contadora</p>
              </div>
            </div>
            <p className="text-amarillo_status text-2xl mt-4">★★★★★</p>
          </div>
        </div>
      </section>
      <section
        className={`pt-16 px-5 ${rubik} mx-[auto] text-[0.8em] md:mt-[60px] w-3/4 bg-gris_frente pb-12 sm:text-[1.2em]`}>
        <p className="text-center">FAQ</p>
        <p className="text-2xl text-center pb-4 md:text-[1.2em]  md:mb-[60px]">
          Preguntas Frecuentes
        </p>
        <table className="bg-white shadow-md shadow-black  md:mb-[100px]">
          <tbody className="[&>*:nth-child(odd)]:bg-[#ea4e398a] bg-white">
            <tr onClick={handleCollapse}>
              <td className="py-1 text-center">
                ¿Cuánto tiempo tengo para devolver el pedido?
              </td>
            </tr>
            <tr>
              <td className={`py-1 px-2 pb-8 ${poppins}`}>
                Depués de vencido tu periodo de renta, cuentas con una hora de
                tolerancia para devolver el vehículo.
              </td>
            </tr>
            <tr>
              <td className="py-1 text-center">
                ¿Qué pasa si olvidé algo en el interior del auto?
              </td>
            </tr>
            <tr>
              <td className={`py-1 px-2 pb-8 ${poppins}`}>
                No te preocupes, nosotros te contactaremos tan pronto realicemos
                la limpieza del vehículo para que puedas venir a recoger tus
                pertenencias.
              </td>
            </tr>
            <tr>
              <td className="py-1 text-center">
                ¿El vehículo cuenta con seguro?
              </td>
            </tr>
            <tr>
              <td className={`py-1 px-2 pb-8 ${poppins}`}>
                Claro que sí, todos nuestros vehículos se encuentran en buen
                estado y con todos sus papeles en orden de manera que puedes
                conducir sin preocupaciones.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <form
        className={`pt-2 ${poppins} text-[0.8em]  md:text-[1.2em] bg-gris_fondo  sm:px-[15%] px-4 pb-4  sm:py-[25px] md:py-[50px]`}>
        <p className={`${rubik} text-2xl  md:text-[1.8em]  md:pt-6`}>
          Suscríbete
        </p>
        <p className="py-2">
          Infórmate antes que nadie de nuestras ofertas y descuentos especiales.
        </p>
        <label htmlFor="email">Email</label> <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="w-3/5 placeholder:pl-1"
          placeholder="juanperez@correo.com"
        />
        <button
          onClick={handleEmailSubmit}
          className="text-white bg-naranja_enf px-4 ml-4 text-[1em]  md:py-3 leading-5 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black ">
          Suscribirme
        </button>
        {errors && (
          <p className="text-[0.5em] text-rojo_status">{errors.email}</p>
        )}
      </form>
    </div>
  );
}

export default HomePage;
