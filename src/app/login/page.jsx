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
  const { login, loginWithGoogle } = useAuth();
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
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-8 pb-10 mb-4">
        <div className="mb-6">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="correo@gmail.com"
            onChange={handleChange}
            className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tig focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="*******"
            className="shadow apparence-none border rounded w-full py-2 px-3 text-gray-700 leading-tig focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          LOGIN
        </button>
      </form>

      <div className="p-10">
        <button
          onClick={handleGoogleLogin}
          className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray py-2 px-4 w-full">
          Ingresa con tu cuenta de Google
        </button>
      </div>

      <div className="p-10">
        <p className="pb-10 w-full py-2 px-3 text-gray-700">
          No tienes una cuenta?
        </p>
        <Link
          href="/register"
          className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray py-5 px-6 w-full">
          Registrate
        </Link>
      </div>
      <div
        id="alerta"
        className="hidden bg-white rounded-2xl w-[300px] lg:w-[500px] fixed top-[40%] mx-[auto] pt-0">
        <p
          className={`bg-naranja_enf text-white text-[1.2em] ${rubik} w-full rounded-t-2xl text-center`}>
          Crea una contraseña para tu cuenta:
        </p>
        <fieldset className="px-4">
          <input
            type="password"
            id="input"
            placeholder="Contraseña"
            className="border-[2px] w-full border-black bg-gris_frente my-4 pl-2 rounded-md"
          />{" "}
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
