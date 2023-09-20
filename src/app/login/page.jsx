/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
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
  const { t } = useTranslation();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      router.push("/UserDashBoard");
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
      }
      // setError("Los datos ingresados son incorrectos");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/UserDashBoard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full bg-gris_frente dark:bg-dark_frente pb-12">
      <section className="md:w-1/2 lg:w-1/3 pt-20  m-auto text-black dark:text-white">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className=" bg-white dark:bg-dark_blanco bg-opacity-70 shadow-sm shadow-black rounded-2xl pb-8 mb-12">
          <h1 className="bg-gris_fondo dark:bg-dark_fondo text-center font-bold text-[1.2em] rounded-t-2xl py-2 mb-5 ">
            {t("sign in")}
          </h1>
          <main className="px-8">
            <fieldset className="mb-6">
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="correo@gmail.com"
                onChange={handleChange}
                className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </fieldset>

            <fieldset className="mb-6">
              <label htmlFor="password">{t("password")}</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="*******"
                className=" mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </fieldset>

            <button
              onClick={handleForgotPassword}
              className="text-center hover:underline block w-full">
              {t("passwordForgot")}
            </button>
            <button
              className={`${rubik} mb-2 text-white font-bold bg-naranja_enf my-3 rounded p-2 w-full  shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              {t("login")}
            </button>

            <button
              onClick={handleGoogleLogin}
              className={`${rubik} font-bold bg-slate-40 mt-6 dark:text-white flex flex-wrap justify-between px-3 items-center bg-gris_fondo dark:bg-dark_fondo mb-5 text-black rounded border-2 border-gray py-2 w-full shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
              <img
                src="https://drive.google.com/uc?export=download&id=1mfgDAd3DoXGeLeaAsivPHfc9TstsJ7iz"
                className="w-[50px] float-left"
              />{" "}
              <span className="text-centar bg-gris_frente dark:bg-dark_frente w-4/5 py-3">
                {t("accountGoogle")}
              </span>
            </button>
            <div className="w-full">
              <p className="w-full text-center my-6 text-[1.1em] text-gray-700 dark:text-white">
                {t("account")}
              </p>
              <a
                href="/register"
                className={`${rubik} block bg-negro_fondo text-white my-3 text-center rounded py-3 w-full hover:bg-negro_fondo hover:text-white shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("create")}
              </a>
            </div>
            <section
              id="alerta"
              className="bg-gris_fondo fixed top-0 left-0 w-[100vw] h-[100vh] hidden">
              <div className=" bg-white dark:bg-dark_blanco rounded-2xl w-[300px] lg:w-[500px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-0">
                <p
                  className={`bg-naranja_enf text-white text-[1.2em] ${rubik} w-full rounded-t-2xl text-center`}>
                  {t("password-in")}:
                </p>
                <fieldset className="px-4">
                  <input
                    type="password"
                    id="input"
                    placeholder="Contraseña"
                    className="border-[2px] w-full border-black bg-gris_frente dark:bg-dark_frente my-4 pl-2 rounded-md"
                  />
                  <br />
                  <button
                    id="boton"
                    className={`bg-naranja_enf w-full justify-self-center text-white ${rubik} px-4 py-1 rounded-lg my-4 shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                    {t("accept")}
                  </button>
                </fieldset>
              </div>
            </section>
          </main>
        </form>
      </section>
    </div>
  );
}
