import { NextResponse } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (item = { price: 80 }, cant = 5) => {
  return item.price * cant * 10;
};

export async function POST(req) {
  try {
    const { item, cant } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(item, cant),
      currency: "mxn",
      //   payment_method_types: ["card"],
      //   payment_method_types: ["card", "paypal"],
      //   automatic_payment_methods: {
      //     enabled: true,
      //   },
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    switch (error.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${error.message}`);
        break;
      case "StripeInvalidRequestError":
        console.log("An invalid request occurred.");
        if (error.param) {
          console.log(`The parameter ${error.param} is invalid or missing.`);
        }
        break;
      default:
        console.log("Another problem occurred, maybe unrelated to Stripe.");
        break;
    }

    return NextResponse.json(
      {
        message: error.mesage,
      },
      {
        status: 500,
      }
    );
  }
}
