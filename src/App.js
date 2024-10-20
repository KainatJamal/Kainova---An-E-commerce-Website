import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThankYou from './components/ThankYou'; // Make sure this import is correct

import Home from './components/Home';
import Shop from './components/Shop'; // Import your Shop component
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import Cart from './components/Cart'; // Import the Cart component
import Checkout from './components/Checkout'; // Import the Checkout component

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false); // State to manage cart visibility
  const [cartItems, setCartItems] = useState([]);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addItemToCart = (item) => {
    const existingItemIndex = cartItems.findIndex((i) => i.id === item.id);
    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1; // Increase quantity if item exists
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // Add new item
    }
  };

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Save cart items to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <div className="App">
        <Header toggleCart={toggleCart} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addItemToCart={addItemToCart} />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Use element prop */}
          <Route path="/thank-you" element={<ThankYou />} /> {/* Use element prop */}

          {/* Other routes can be added here */}
        </Routes>

        <Footer />
        <Cart cartItems={cartItems} isOpen={isCartOpen} onClose={toggleCart} setCartItems={setCartItems} />
      </div>
    </Router>
  );
}

export default App;
