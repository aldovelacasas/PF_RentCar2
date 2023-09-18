"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <div className="bg-negro_fondo text-white py-8 flex flex-col sm:flex-row justify-between items-center p-4 font-poppins">
      <div className="sm:w-1/3 p-4">
        <h3 className="text-lg font-semibold">{t("rentadeautos")}</h3>
        <p className="text-sm">{t("pfooter")} </p>
        <div className="flex items-center text-sm mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>

          <span className="m-1">(123) 4567 8901</span>
        </div>
        <div className="flex items-center text-sm mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>

          <span className="m-1"> autocontactofficial@gmail.com </span>
        </div>
      </div>
      <div className="sm:w-1/3 p-4 mt-4 sm:mt-0">
        <h4 className="text-lg font-semibold">{t("infoFooter")}</h4>
        <p className="text-sm mt-2">
          {t("horarios")}
          <br />
          {t("horarios2")}
        </p>
      </div>
      <div className="sm:w-1/3 p-4 mt-4 sm:mt-0 w-full">
        <h2 className="text-lg font-semibold">{t("map")}</h2>
        <ul className="mt-2 space-y-2 sm:ml-0 sm:pl-0">
          <li className="text-red">
            <Link href="/homePage" className="hover:font-bold">
              {t("rentacar")}
            </Link>
          </li>
          <li>
            <Link href="/vehiculos" className="hover:font-bold">
              {t("cars")}
            </Link>
          </li>
          <li>
            <Link href="/testimoniales" className="hover:font-bold">
              {t("testimonials")}
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:font-bold">
              {t("about2")}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:font-bold">
              {t("contact2")}
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:font-bold">
              {t("login")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
