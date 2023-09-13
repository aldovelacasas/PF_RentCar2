import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const calculateOrderAmount = (item = { price: 80 }, cant = 5) => {
  return 1400;
};

export async function POST(req) {
  try {
    const { item, cant } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(item, cant),
      currency: "usd",
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
