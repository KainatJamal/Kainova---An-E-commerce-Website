import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Add styles for checkout

const Checkout = () => {
  const { state } = useLocation(); // Receive cart items from Cart component
  const navigate = useNavigate(); // Hook for navigation
  const { cartItems, subtotal } = state || { cartItems: [], subtotal: 0 };

  const handleContinue = () => {
    // Navigate to Thank You page with product details
    navigate('/thank-you', { state: { cartItems, subtotal } });
  };

  return (
    <div>
      {/* Text overlay for the logo */}
      <div className="logo-text1">KAINOVA.</div>

      <div className="checkout-page">
        <div className="checkout-form">
          <h2>Contact</h2>
          <input type="email" placeholder="Email" className="email-input" required />
          <p className="sales-tax-info">
            As per the changes introduced by the Government of Pakistan in their Finance Budget 2024-25, an additional 3% Sales Tax will be charged...
          </p>
          <h2>Shipping Address</h2>
          <form className="shipping-form">
            <select className="country-select">
              <option value="Pakistan">Pakistan</option>
            </select>
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Postal code" required />
            <input type="tel" placeholder="Phone" required />
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Your Order</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.name} className="order-item-image" />
              <div>
                <p>{item.name}</p>
                <p>PKR {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="order-summary">
            <p>Subtotal: PKR {subtotal}</p>
            <p>Shipping: Calculated at next step</p>
            <p>Total: PKR {subtotal}</p>
          </div>
          <button className="continue-btn" onClick={handleContinue}>Continue to shipping</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
