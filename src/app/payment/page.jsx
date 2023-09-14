"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { v4 } from "uuid";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51NnSDoFEH1uvL7eBeDvk8LY99xuJUYrTUKF7iG9QZ3boEE9FMvYMuDD4qbYIpxGwErL0EFdZi5irhp2YXo8D3bru000bbs6Dl4"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentKey, setPaymentKey] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setPaymentKey(v4());

    let item = { id: "xl-tshirt", price: 80 };
    let cant = 6;
    axios
      .post(`/api/create-payment-intent`, { item, cant })
      .then(({ data }) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#ff7b0f",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm paymentKey={paymentKey} />
        </Elements>
      )}
    </div>
  );
}
