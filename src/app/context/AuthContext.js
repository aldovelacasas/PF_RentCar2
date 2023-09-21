"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  fetchSignInMethodsForEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      const emailUser = userCredential.user.email;

      await saveData(uid, emailUser);
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const emailUser = userCredential.user.email;
    await saveData(uid, emailUser);
  };

  const linkGoogleAccount = async (currentUser) => {
    try {
      const email = currentUser.email;
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (!signInMethods.includes("google.com")) {
        const googleProvider = new GoogleAuthProvider();
        await linkWithPopup(currentUser, googleProvider);
        console.log("Cuenta de Google vinculada con éxito.");
      } else {
        console.log("La cuenta ya está vinculada con Google.");
      }
    } catch (error) {
      console.error("Error al vincular la cuenta de Google:", error);
      throw error;
    }
  };

  function askPassword() {
    document.getElementById("alerta").classList.remove("hidden");
    document.body.classList.add("stopScroll");
    return new Promise((resolve, reject) => {
      document.getElementById("boton").onclick = () => {
        resolve(document.getElementById("input").value);
        document.getElementById("alerta").classList.add("hidden");
        document.body.classList.remove("stopScroll");
      };
    });
  }

  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleProvider);
      const uid = userCredential.user.uid;
      const emailUser = userCredential.user.email;

      // Verificar si el usuario ya tiene una contraseña configurada
      const currentUser = auth.currentUser;
      const signInMethods = await fetchSignInMethodsForEmail(auth, emailUser);

      if (!signInMethods.includes("password")) {
        // El usuario no tiene una contraseña configurada, ofrecer la opción de registrar una contraseña
        const newPassword = await askPassword();
        // const newPassword = prompt("Crea una contraseña para tu cuenta:");

        if (newPassword) {
          // Registrar la contraseña
          await updatePassword(currentUser, newPassword);
        }
      }

      // Vincular la cuenta de Google al usuario actual si no está vinculada
      await linkGoogleAccount(currentUser);

      // Luego de la vinculación, el usuario podrá iniciar sesión con ambas opciones
      await saveData(uid, emailUser);
    } catch (error) {
      console.error(
        "Error en el proceso de inicio de sesión con Google:",
        error
      );
    }
  };

  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      const email = prompt("Ingrese su dirección de correo electrónico:");
      if (email) {
        await sendPasswordResetEmail(auth, email);
        alert(
          "Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña. Revise su bandeja de entrada."
        );
      }
    } catch (error) {
      console.error(
        "Error al enviar el correo electrónico de recuperación de contraseña:",
        error
      );
    }
  };

  const logOut = () => {
    signOut(auth);
    router.push("/login");
  };

  const saveData = async (uid, emailUser) => {
    try {
      await axios.post("/api/users", {
        uid,
        emailUser,
      });
    } catch (error) {
      console.error("Error al guardar usuario en la base de datos", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log("usuario autenticado", currentUser.getIdToken());
      } else {
        setUser(null);
        setLoading(false);
        console.log("Usuario no autenticado");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        loginWithGoogle,
        logOut,
        handleForgotPassword,
      }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
