"use client";
import { useEffect, useState } from "react";
import Alerts from "@/components/Alerts";
import { Rubik, Poppins } from "next/font/google";
import { validateUserForm } from "@/libs/functions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

// import { useRouter } from "next/navigation";

const apiUrl = process.env.API_URL;

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
// let login = true;

function Profile() {
  const user = useSelector((state) => state.user.currentUser);
  const { logOut } = useAuth();

  // const router = useRouter();
  // if (!login) {
  //   router.push("/");
  //   return null;
  // }

  const inputsInitialValue = {
    nombre: user.userName,
    correo: user.userEmail,
    pasaporte: user.userPassport,
    telefono: user.userPhone,
    imagen: user.userImage,
  };

  useEffect(() => {
    setInputs(inputsInitialValue);
  }, [user]);

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState(inputsInitialValue);
  const [visibility, setVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrors(validateUserForm({ ...inputs, [e.target.name]: e.target.value }));
  }

  function handleVisible() {
    setVisibility(!visibility);
    document.body.classList.toggle("stopScroll");
  }

  function handleFormVisibility() {
    setFormVisibility(!formVisibility);
    document.body.classList.toggle("stopScroll");
  }

  async function handleSubmit() {
    let errorsLength = Object.keys(errors).length;
    if (!errorsLength) {
      let id = user.userId;
      let data = {
        username: inputs.nombre,
        emailUser: inputs.correo,
        passport: inputs.pasaporte,
        phone: inputs.telefono,
      };
      const fdata = new FormData();
      fdata.append("data", JSON.stringify(data));
      const res = axios

        .put(`api/users/${id}`, fdata)
        .then(console.log("success"));
      handleFormVisibility();
    }
  }

  const handleImage = () => {
    const fileInput = document.getElementById("fileImage");
    fileInput.click();
  };

  const imageChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await axios.put("/api/users/" + user.userId, formData);
    alert("Imagen Cambiada");
  };

  return (
    <div className="grid bg-gris_frente md:text-[1.5em] lg:text-[2em]">
      <header
        className={`bg-gris_fondo flex items-center h-[175px] ${rubik} text-[1em] md:text-[1.5em] pl-[10%] space-y-0 space-x-2.5`}>
        <p className={`text-[1em] mt-2 pl-4`}>Perfil</p>
      </header>
      <main className="bg-white rounded-2xl w-4/5 place-self-center py-6">
        <h1 className={`${rubik} text-[1.5em] pl-[10%]`}>{inputs.nombre}</h1>
        <div className="flex flex-col gap-8 items-center">
          <section className="w-4/5 bg-gris_fondo rounded-2xl flex flex-wrap justify-between p-8">
            <h3 className="shrink-0 w-full font-bold mb-2 text-[1.2em]">
              Información de la cuenta:
            </h3>
            <div className="grid ">
              <img
                src={inputs.imagen}
                alt={`Imagen de perfil de ${inputs.nombre}`}
                className="w-[200px] h-[200px] rounded-full bg-white mb-6 mx-[auto]"
              />
              <input
                type="file"
                className="hidden"
                id="fileImage"
                accept="image/*"
                onChange={imageChange}></input>
              <button
                onClick={handleImage}
                className={` bg-negro_fondo ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Cambiar foto de perfil
              </button>
            </div>
            <div className="">
              <p className="py-2">
                <span className="font-bold">Correo: </span>
                {inputs.correo}
              </p>
              <p className="py-2">
                <span className="font-bold">Pasaporte: </span>
                {inputs.pasaporte}
              </p>
              <p className="py-2">
                <span className="font-bold">Telefono: </span>
                {inputs.telefono}
              </p>
              <hr className="border-[2px] border-black my-4" />
              <button
                onClick={handleFormVisibility}
                className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                Editar información
              </button>
            </div>
          </section>
          <section className="w-4/5 bg-gris_fondo rounded-2xl p-8">
            <h3 className="font-bold mb-2 text-[1.2em]">
              Configuración de la cuenta:
            </h3>
            <fieldset>
              <input
                type="checkbox"
                name="promociones"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="promociones">
                Recibir ofertas y promociones por correo
              </label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="alertas"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="alertas">
                Recibir alertas sobre el tiempo restante de mis rentas
              </label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="llamadas"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="llamadas">Recibir llamadas y SMS</label>
            </fieldset>
            <fieldset>
              <input
                type="checkbox"
                name="publicidad"
                className="h-[25px] w-[25px] rounded-md border-[4px] mr-2 border-black "
                defaultChecked={true}
              />
              <label htmlFor="publicidad">
                Permitir que se usen mis datos con fines publicitarios
              </label>
            </fieldset>
            <hr className="border-[1px] mt-6 border-black" />
            <button
              onClick={handleVisible}
              className={` bg-red-600 ${rubik} mt-12 text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Darse de baja
            </button>
          </section>
        </div>
      </main>
      <Alerts visible={visibility}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          Alerta
        </p>
        <p className="text-[0.8em] px-4">
          ¿Estás seguro de querer darte de baja de Auto Connect?
        </p>
        <div className="flex justify-evenly w-1/2">
          <button
            onClick={handleVisible}
            className={` bg-naranja_enf ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Sí, darme de baja
          </button>
          <button
            onClick={handleVisible}
            className={` bg-negro_fondo ${rubik} text-white text-[0.8em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            No, volver
          </button>
        </div>
      </Alerts>
      <Alerts visible={formVisibility} top={15}>
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          Editar información
        </p>
        <form className="w-full mx-[auto] grid place-items-center">
          <fieldset className="w-4/5">
            <label htmlFor="nombre" className="font-bold">
              Nombre:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="nombre"
              value={inputs.nombre}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.nombre && (
              <p className="text-red-600 text-[0.5em]">{errors.nombre}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="correo" className="font-bold">
              Correo:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="correo"
              value={inputs.correo}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.correo && (
              <p className="text-red-600 text-[0.5em]">{errors.correo}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="pasaporte" className="font-bold">
              Pasaporte:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="pasaporte"
              value={inputs.pasaporte}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.pasaporte && (
              <p className="text-red-600 text-[0.5em]">{errors.pasaporte}</p>
            )}
          </fieldset>
          <fieldset className="w-4/5">
            <label htmlFor="telefono" className="font-bold">
              Telefono:
            </label>
            <br />
            <input
              onChange={handleChange}
              name="telefono"
              value={inputs.telefono}
              className="border-black border-[4px] w-full pl-2 rounded-lg"
            />
            {errors.telefono && (
              <p className="text-red-600 text-[0.5em]">{errors.telefono}</p>
            )}
          </fieldset>
          <fieldset className={`${rubik} flex justify-evenly w-3/4 pt-6`}>
            <button
              type="button"
              onClick={handleFormVisibility}
              className={`bg-negro_fondo text-white text-[0.8em] px-4 py-[2px] rounded-md shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Volver
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`rounded-md px-4 py-[2px] bg-naranja_enf text-white text-[0.8em] shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              Aceptar cambios
            </button>
          </fieldset>
        </form>
      </Alerts>
    </div>
  );
}

export default Profile;
