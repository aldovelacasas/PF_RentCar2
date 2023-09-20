/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import Alerts from "./Alerts";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const rubik = fontRubik.className;

export default function CheckoutForm({ paymentKey }) {
  const [visibility, setVisibility] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get("carId");
  const item = searchParams.get("item");
  const cant = searchParams.get("cant");
  const img = searchParams.get("img");
  const price = searchParams.get("price");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const { t } = useTranslation();
  let total = cant * price;

  if (item === null || cant === null || img === null || price === null) {
    router.push("/UserDashBoard");
    return null;
  }
  let user = useSelector((state) => state.user.currentUser);

  function sendMail() {
    let templateParams = {
      mail: user.userEmail,
      userName: user.userName,
      model: item,
      cant: cant,
      price: total,
      startDate: startDate,
      endDate: endDate,
    };
    emailjs
      .send(
        "service_urf97ga",
        "template_qa4sivw",
        templateParams,
        "s1fxuCLTgeK_cGJeJ"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Pago realizado, gracias por confiar en AutoConnect");
          break;
        case "processing":
          setMessage("Pago en proceso.");
          break;
        case "requires_payment_method":
          setMessage("Algo salió mal, intenta nuevamente en unos minutos.");
          break;
        default:
          setMessage("Hubo un error al momento de hacer la transacción.");
          break;
      }
    });
  }, [stripe]);

  async function submitRent() {
    const formData = {
      userID: user.userId,
      productID: carId,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      monto: price,
      statusB: 1,
    };
    const res = axios
      .post(`api/bookings/`, formData)
      .then(console.log("registrado"));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: path,
      },
    });

    sendMail();
    submitRent();
    setVisibility(true);

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("Pago realizado, gracias por confiar en AutoConnect");
    }

    setIsLoading(false);
  };

  function handleAccept() {
    if (message === "Pago realizado, gracias por confiar en AutoConnect") {
      setVisibility(false);
      router.push("/UserDashBoard");
    } else {
    }
  }

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <main className="grid grid-cols-1 lg:grid-cols-2 p-8 bg-white dark:bg-dark_blanco text-black dark:text-white">
        <section className="grid place-content-center mb-6">
          <h1 className={`${rubik} text-center text-[1.5em]`}>
            {t("your-car")}:
          </h1>
          <img className="max-w-[300px] lg:max-w-[400px]" src={img} />
          <p>
            <span className="font-bold">{t("car")}:</span> {item}
          </p>
          {cant === "1" ? (
            <p>
              {t("for-total")} <span className="font-bold">{cant}</span>{" "}
              {t("day")}
            </p>
          ) : (
            <p>
              {t("for-total")} <span className="font-bold">{cant}</span>{" "}
              {t("days")}
            </p>
          )}
          <p className="font-bold">{t("total")}:</p>
          <p className="text-[1.5em]">${total.toLocaleString()} USD</p>
        </section>
        <form
          className=" p-6 grid gap-6 shadow-2xl shadow-gris_fondo dark:bg-gris_fondo dark:shadow-black"
          id="payment-form"
          onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
          <button
            className="bg-[#0074d4] text-white py-2 rounded-md"
            disabled={isLoading || !stripe || !elements}
            id="submit">
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>

          {message && <div id="payment-message">{message}</div>}
        </form>
      </main>
      <Alerts visible={visibility} className="fixed top-[40%]">
        <p
          className={`bg-naranja_enf text-white ${rubik} w-full text-center rounded-t-[15px]`}>
          {t("alert")}
        </p>
        <p className="text-[1em] px-4">{message}</p>
        <button
          onClick={handleAccept}
          className={` bg-naranja_enf ${rubik} text-white text-[1em] px-4 rounded-lg shadow-sm shadow-black hover:shadow-md hover:shadow-black active:shadow-inner active:shadow-black`}>
          {t("accept")}
        </button>
        <p className="text-[0.8em] mt-[-10px]">{t("ok-home")}</p>
      </Alerts>
    </>
  );
}
