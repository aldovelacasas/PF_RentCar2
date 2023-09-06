import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
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

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, googleProvider);
    const uid = userCredential.user.uid;
    const emailUser = userCredential.user.email;
    await saveData(uid, emailUser);
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
        console.log("usuario autenticado", currentUser);
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
