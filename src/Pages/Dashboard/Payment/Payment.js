import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const bookingData = useLoaderData();
    
    return (
        <div>
            <h3>Payment</h3>
        </div>
    );
};

export default Payment;