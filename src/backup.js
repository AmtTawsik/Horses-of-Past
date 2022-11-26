import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const bookingData = useLoaderData();
  console.log(bookingData);
  return (
    <div>
      <h3 className="text-center text-secondary font-bold text-4xl">
        Payment for {bookingData.productName}
      </h3>
      <p className="text-3xl text-center">
        Please Pay{" "}
        <strong className="text-green-500">${bookingData.resalePrice}</strong>{" "}
        to buy this{" "}
        <span className="text-green-500 font-bold">
          {bookingData.productName}
        </span>
      </p>
      <div className="divider">Pay Now!!!</div>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm
          bookingData={bookingData}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;












import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({bookingData}) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret,setClientSecret]=useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {resalePrice,buyersName,buyersEmail} = bookingData;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
         "Content-Type": "application/json" 
        },
      body: JSON.stringify({ resalePrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [resalePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: buyersName,
              email: buyersEmail,
            },
          },
        },
      );

      if(confirmError){
        setCardError(confirmError.message);
        return;
      }
      console.log('paymentIntent',paymentIntent)

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-info btn-sm my-5 "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </>
  );
};

export default CheckoutForm;
