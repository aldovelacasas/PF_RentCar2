"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Alert from "../login/Alert";
import { Poppins, Rubik } from "next/font/google";
import { useTranslation } from "react-i18next";

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const fontRubik = Rubik({
  subsets: ["latin"],
});

const poppins = fontPoppins.className;
const rubik = fontRubik.className;

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
  });
  const { signup, loginWithGoogle } = useAuth();
  const [error, setError] = useState();
  const [repPassword, setRepPassword] = useState("");
  const { t } = useTranslation();
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(user.email, user.password);
      router.push("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ingresado ya se encuentra registrado");
      } else if (error.code === "auth/missing-password") {
        setError("La contraseña debe tener al menos seis caracteres");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo ingresado no es válido");
      } else {
        setError(
          "Error al registrar usuario. Por favor, inténtalo nuevamente."
        );
      }
    }
  };

  function validatePassword(pass) {
    if (pass == user.password) {
      setError();
    } else if (pass !== user.password) {
      setError("Las contraseñas no son iguales");
    }
  }

  function handlePassChange(e) {
    setRepPassword(e.target.value);
    console.log(user.password, repPassword);
    validatePassword(e.target.value);
  }

  return (
    <section className="w-full h-full bg-gris_frente dark:bg-dark_frente">
      <div className="flex justify-center items-center h-full text-black dark:text-white ">
        <div className="sm:my-8 my-4 max-w-xl m-2 sm:m-auto ">
          {error && <Alert message={error} />}
          <form
            onSubmit={handleSubmit}
            className={` ${poppins} mb-4 bg-white dark:bg-dark_blanco bg-opacity-70 shadow-md rounded-2xl pb-4`}>
            <h1 className="bg-gris_fondo dark:bg-dark_fondo text-center font-bold text-[1.2em] rounded-t-2xl py-2 mb-5 ">
              {t("create")}
            </h1>
            <section className="px-8">
              <fieldset className="pb-3">
                <label htmlFor="email" className="font-bold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="correo@gmail.com"
                  onChange={handleChange}
                  className="mt-1 focus:outline-none focus:border-gray-400 focus:border-2 bg-gris_fondo dark:bg-dark_fondo rounded-md appearance-none border  w-full py-2 px-3 mb-3"
                />
              </fieldset>

              <fieldset className="pb-3">
                <label htmlFor="password" className="font-bold">
                  {t("password")}:
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="********"
                  className="mt-1 focus:outline-none focus:border-gray-400 focus:border-2 bg-gris_fondo dark:bg-dark_fondo rounded-md appearance-none border  w-full py-2 px-3 mb-3"
                />
              </fieldset>

              <fieldset className="pb-3">
                <label htmlFor="password2" className="font-bold">
                  {t("password2")}:
                </label>
                <input
                  type="password"
                  name="password2"
                  onChange={handlePassChange}
                  placeholder="********"
                  value={repPassword}
                  className="mt-1 focus:outline-none focus:border-gray-400 focus:border-2 bg-gris_fondo dark:bg-dark_fondo rounded-md appearance-none border  w-full py-2 px-3 mb-3"
                />
              </fieldset>

              <button
                className={`${rubik} text-white mt-5 font-bold bg-naranja_enf my-3 rounded p-2 w-full shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
                {t("register")}
              </button>
            </section>
          </form>
        </div>
      </div>
    </section>
  );
}
