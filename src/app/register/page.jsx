"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Alert from "../login/Alert";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const poppins = fontPoppins.className;

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
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      signup(user.email, user.password);
      router.push("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ingresado ya se encuentra registrado");
        if (error.code === "auth/missing-password") {
          setError("La contraseña debe tener cómo minimo seis caracteres");
        }
      } else if (error.code === "auth/invalid-email") {
        setError("El correo ingresado no es válido");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <div className="sm:my-8 my-4 max-w-xl m-2 sm:m-auto ">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-8 pb-10 mb-4">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="correo@gmail.com"
            onChange={handleChange}
            className="focus:outline-none focus:border-gray-400 focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="********"
            className="focus:outline-none focus:border-gray-400 focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />

          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="focus:outline-none focus:border-gray-400 focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />

          <label>Telefono</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            className="focus:outline-none focus:border-gray-400 focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />

          <label>Pasaporte</label>
          <input
            type="text"
            name="passport"
            onChange={handleChange}
            className="focus:border-gray-400 focus:border-2  shadow appearance-none border  w-full py-2 px-3 mb-3"
          />

          <button
            className={`${poppins} bg-naranja_enf my-3 rounded p-2 w-full hover:bg-negro_fondo hover:text-white`}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
