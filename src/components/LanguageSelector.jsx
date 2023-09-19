import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-selector dark:bg-dark_fondo">
      <button
        className="px-3 py-2  text-white rounded"
        onClick={() => changeLanguage("es")}>
        <img src="mex.png" alt="Bandera Español" width="30" height="30" />
      </button>

      <button
        className="px-3 py-2 text-white rounded  "
        onClick={() => changeLanguage("en")}>
        <img src="eeuu.png" alt="Bandera Español" width="30" height="30" />
      </button>
    </div>
  );
}

export default LanguageSelector;
