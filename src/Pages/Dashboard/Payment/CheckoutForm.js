import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheckoutForm = ({bookingData}) => {
  const [cardError, setCardError] = useState("");
  const [success,setSuccess] = useState('');
  const [processing,setProcessing] = useState(false);
  const [transactionId,setTransactionId] = useState('');
  const [clientSecret,setClientSecret]=useState('');
  const stripe = useStripe();
  const elements = useElements();
  const {resalePrice,buyersName,buyersEmail,_id,productId} = bookingData;

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

    setSuccess('');
    setProcessing(true);

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
      if(paymentIntent.status === "succeeded"){
        const payment = {
          buyersName,
          buyersEmail,
          resalePrice,
          transactionId: paymentIntent.id,
          bookingId:_id,
          productId,
        }
        fetch('http://localhost:5000/payments',{
          method: 'POST',
          headers:{
            "Content-Type": "application/json" 
          },
          body:JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data=>{
          setSuccess('Congratulations! Your Payment Completed');
          setTransactionId(paymentIntent.id)
        })
      }
      setProcessing(false);

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
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
        success && <div>
          <p className="text-green-500">{success}</p>
          <p>Your transactionId: <span className="font-bold">{transactionId}</span></p>
        </div>
      }
      <p><Link>Go Back to My Orders</Link></p>
    </>
  );
};

export default CheckoutForm;