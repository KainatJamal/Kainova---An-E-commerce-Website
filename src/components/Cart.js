import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/styles.css'; // Ensure you have appropriate styles for the cart

const Cart = ({ cartItems, isOpen, onClose, setCartItems }) => { // Ensure setCartItems is passed as a prop
  const navigate = useNavigate();

  if (!isOpen) return null; // Return null if the cart is not open


  // Function to calculate the subtotal of the cart
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems); // Update the cart items using the passed setCartItems function
  };

  const handleCheckout = () => {
    navigate('/Checkout', { state: { cartItems, subtotal: calculateSubtotal() } });
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}> {/* Toggle class based on isOpen */}
      <button className="close-btn" onClick={onClose} aria-label="Close Cart">
        {/* SVG for the close icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="close-icon"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="cart-header">
        <p>SHOPPING CART</p>
      </div>
      <div className="cart-items">
        {cartItems.length === 0 ? ( // Check if cartItems is empty
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <p>{item.name}</p>
                <p> PKR {item.price}</p>
                <div className="quantity-control">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
              </div>
              {/* Delete icon */}
              <button onClick={() => removeItemFromCart(index)} className="delete-icon" aria-label="Remove from cart">
                {/* SVG for delete icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="delete-icon-svg"
                >
                  <path d="M21 4H8l-1-1H2v2h1l2 17h12l2-17h1V4h-3z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <p>Subtotal: PKR {calculateSubtotal()}</p>
        <button className="view-cart-btn">View Cart</button>
        <button className="checkout-btn" onClick={handleCheckout}>Check Out</button> {/* Handle checkout */}
      </div>
    </div>
  );
};

export default Cart;
