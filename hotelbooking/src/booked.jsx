import React from 'react';
import axios from 'axios';

const Booked = () => {
    const handlePayment = async () => {
        const orderUrl = 'http://localhost:8000/create-order';
        const orderData = await axios.post(orderUrl, { amount: 500*100 }); // amount in INR
        
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID',
            amount: orderData.data.amount,
            currency: "INR",
            name: "Your Company Name",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderData.data.id,
            handler: function (response) {
                alert(`Payment successful! Razorpay Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "myname",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay with Razorpay</button>
        </div>
    );
};

export default Booked;
