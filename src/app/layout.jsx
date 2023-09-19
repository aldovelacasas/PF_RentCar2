"use client";
import { Providers } from "../store/providers";
import "./globals.css";
import Navbar from "../components/NavBar/Navbar";
import Footer from "@/components/footer";
import { store } from "@/store";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import Loading from "./loading";
import { Suspense } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

// Importa tus archivos de traducción
import esTranslation from "../translations/es.json";
import enTranslation from "../translations/en.json";

const resources = {
  es: {
    translation: esTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Establece el idioma predeterminado
  fallbackLng: "es", // Idioma de respaldo si no se encuentra una traducción
  interpolation: {
    escapeValue: false, // Evita la escapada de HTML
  },
});

// export const metadata = {
//   title: "Auto Connect",
//   description: "Soy Henry final proyect",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Providers store={store}>
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
          </Providers>
        </AuthContextProvider>
      </body>
    </html>
  );
}
