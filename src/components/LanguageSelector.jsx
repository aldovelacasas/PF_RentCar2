import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [lang, setlang] = useState(i18n.language === "es");

  const changeLanguage = () => {
    setlang(!lang);
    let language = "es";
    if (lang) language = "en";
    i18n.changeLanguage(language);
  };

  return (
    <div className=" absolute top-[85px] right-[65px] dark:bg-gris_fondo bg-dark_blanco rounded-sm shadow-sm">
      <button
        className="px-3 py-[7px] text-white rounded  shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black"
        onClick={changeLanguage}>
        {!lang ? (
          <img src="eeuu.png" alt="Bandera Español" width="30" height="30" />
        ) : (
          <img src="mex.png" alt="Bandera Español" width="30" height="30" />
        )}
      </button>
    </div>
  );
}

export default LanguageSelector;
