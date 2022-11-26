import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Payment = () => {
    const bookingData = useLoaderData();
    console.log(bookingData)
    return (
        <div>
            <h3 className='text-center text-secondary font-bold text-4xl'>Payment for {bookingData.productName}</h3>
            <p className='text-3xl text-center'>Please Pay <strong className='text-green-500'>${bookingData.resalePrice}</strong> to buy this <span className='text-green-500 font-bold'>{bookingData.productName}</span></p>
            <div className="divider">Pay Now!!!</div>
        </div>
    );
};

export default Payment;