"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "./Alert";
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

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
  });
  const { login, loginWithGoogle, handleForgotPassword } = useAuth();
  const [error, setError] = useState();
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      router.push("/homePage");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/missing-password") {
        setError("Los datos ingresados son incorrectos");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Los datos ingresados son incorrectos");
      }
      if (error.code === "auth/user-not-found") {
        setError("Los datos ingresados son incorrectos");
      } else if (error.code === "auth/invalid-email") {
        setError("Los datos ingresados son incorrectos");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full pt-20 max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="mb-8 text-center bg-white bg-opacity-70 shadow-md rounded px-8 pt-8 pb-10 mb-4">
        <div className="mb-8">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="correo@gmail.com"
            onChange={handleChange}
            className=" text-center mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-12">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="*******"
            className="text-center mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          className={`${poppins} mb-3 bg-naranja_enf my-3 rounded p-2 w-full hover:bg-negro_fondo hover:text-white`}>
          INGRESAR
        </button>

        <div>
          <button
            onClick={handleForgotPassword}
            className="bg-slate-40 mt-5 mb-10 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray py-2 px-4 w-full">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="bg-slate-40 mt-10 mb-5 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray py-2 px-4 w-full">
          Ingresa con tu cuenta de Google
        </button>
      </form>

      <div className="p-10 grid grid-rows-2 gap-4 items-center">
        <p className="w-full py-3 px-8 text-gray-700">No tienes una cuenta?</p>

        <Link
          href="/register"
          className={`${poppins} bg-naranja_enf my-3 text-center rounded p-4 w-full hover:bg-negro_fondo hover:text-white`}>
          Crear usuario
        </Link>
      </div>
      <div
        id="alerta"
        className="hidden bg-white rounded-2xl w-[300px] lg:w-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-0">
        <p
          className={`bg-naranja_enf text-white text-[1.2em] ${rubik} w-full rounded-t-2xl text-center`}>
          Ingresa tu contraseña:
        </p>
        <fieldset className="px-4">
          <input
            type="password"
            id="input"
            placeholder="Contraseña"
            className="border-[2px] w-full border-black bg-gris_frente my-4 pl-2 rounded-md"
          />
          <br />
          <button
            id="boton"
            className={`bg-naranja_enf w-full justify-self-center text-white ${rubik} px-4 py-1 rounded-lg my-4 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
            Aceptar
          </button>
        </fieldset>
      </div>
    </div>
  );
}
