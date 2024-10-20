import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/styles.css'; // Add styles for thank you page

const ThankYou = () => {
  const { state } = useLocation();
  const { cartItems, subtotal } = state || { cartItems: [], subtotal: 0 };

  return (
    <div className="thank-you-page">
      <div className="logo-text2">KAINOVA.</div>
      <h2>Thank You for Your Order!</h2>
      <p>Your order will be delivered within 3 to 5 days.</p>
      <h2>Your Order Details</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="order-item1">
          <img src={item.image} alt={item.name} className="order-item-image1" />
          <div>
            <p>{item.name}</p>
            <p>PKR {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="order-summary1">
        <p>Subtotal: PKR {subtotal}</p>
        <p>Total: PKR {subtotal}</p>
      </div>
    </div>
  );
};

export default ThankYou;
