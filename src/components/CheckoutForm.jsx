import React, { useEffect, useState } from "react";
import { Rubik, Poppins } from "next/font/google";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const rubik = fontRubik.className;

export default function CheckoutForm({ paymentKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const item = searchParams.get("item");
  const cant = searchParams.get("cant");
  const img = searchParams.get("img");
  const price = searchParams.get("price");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  let total = cant * price;
  console.log(paymentKey);

  if (item === null || cant === null || img === null || price === null) {
    router.push("/homePage");
    return null;
  }
  let alertMessage;
  function sendMail() {
    var templateParams = {
      mail: ``,
      userName: ``,
      model: item,
      cant: cant,
      price: price,
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
          alertMessage = "Pago registrado exitosamente";
          handleVisible();
        },
        function (error) {
          console.log("FAILED...", error);
          alertMessage =
            "Ha ocurrido un error, intenta de nuevo en unos minutos";
          handleVisible();
        }
      );
  }

  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("pcgp22@gmail.com");
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
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // sendMail()

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 p-8 bg-white">
      <section className="grid place-content-center mb-6">
        <h1 className={`${rubik} text-center text-[1.5em]`}>Tu vehículo:</h1>
        <img className="max-w-[300px] lg:max-w-[400px]" src={img} />
        <p>
          <span className="font-bold">Vehículo:</span> {item}
        </p>
        {cant === "1" ? (
          <p>
            Por un total de <span className="font-bold">{cant}</span> día
          </p>
        ) : (
          <p>
            Por un total de <span className="font-bold">{cant}</span> días
          </p>
        )}
        <p className="font-bold">Total de la renta:</p>
        <p className="text-[1.5em]">${total.toLocaleString()} USD</p>
      </section>
      <form
        className=" p-6 grid gap-6 shadow-2xl shadow-gris_fondo"
        id="payment-form"
        onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        {/* email */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
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
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </main>
  );
}
