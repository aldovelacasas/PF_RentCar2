"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Alert from "../login/Alert";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    passport: "",
    email: "",
    password: "",
    phone: "",
  });
  const { signup } = useAuth();
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
    <div className="w-full max-w-xs m-auto">
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
          className="shadow apparence-none border rounded w-full mt-2 mb-3 py-2 px-3 text-gray-700 "
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="********"
          className="shadow apparence-none border rounded w-full mt-2 mb-3 py-2 px-3 text-gray-700"
        />

        <label>Nombre de usuario</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          className="shadow apparence-none border rounded w-full mt-2 mb-3 py-2 px-3 text-gray-700"
        />

        <label>telefono</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          className="shadow apparence-none border rounded w-full mt-2 mb-3 py-2 px-3 text-gray-700"
        />

        <label>Pasaporte</label>
        <input
          type="text"
          name="passport"
          onChange={handleChange}
          className="shadow apparence-none border rounded w-full mt-2 mb-3 py-2 px-3 text-gray-500"
        />

        <button className="bg-green-300 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray mt-5 py-3 px-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}
