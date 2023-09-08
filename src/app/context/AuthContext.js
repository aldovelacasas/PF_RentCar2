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
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const emailUser = userCredential.user.email;
    await saveData(uid, emailUser);
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
        const newPassword = prompt("Crea una contraseña para tu cuenta:");
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

  const logOut = () => {
    signOut(auth);
  };

  const saveData = async (uid, emailUser) => {
    try {
      await axios.post("/api/users", { uid, emailUser });
    } catch (error) {
      console.error("Error al guardar usuario en la base de datos", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log("usuario autenticado", currentUser);
      } else {
        setUser(null);
        console.log("Usuario no autenticado");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, login, loginWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
