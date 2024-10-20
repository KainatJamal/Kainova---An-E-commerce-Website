import React, { useState } from 'react';
import '../styles/styles.css';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for routing
import logo from '../assets/Untitled_design__15_-removebg-preview.png';

const Header = ({ toggleCart }) => { // Receive toggleCart as a prop
  // State to handle dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to show the dropdown on hover
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  // Function to hide the dropdown when the mouse leaves
  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo-container">
          <img src={logo} alt="KAINOVA Logo" className="logo" />
        </div>
        
        <div className="nav-links-container">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            
            {/* Shop with Dropdown */}
            <li className="shop-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link>Shop</Link>
              
              {/* Dropdown Menu */}
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li><Link to="/shop/shirts">Shirts</Link></li>
                  <li><Link to="/shop/pants">Pants</Link></li>
                  <li><Link to="/shop/jewelry">Jewelry</Link></li>
                  <li><Link to="/shop/accessories">Accessories</Link></li>
                  <li><Link to="/shop/scarfs">Scarfs</Link></li>
                  <li><Link to="/shop">All Products</Link></li>
                </ul>
              )}
            </li>

            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="cart-icon">
          {/* Call toggleCart on click */}
          <button onClick={toggleCart} aria-label="Open Cart">
            <FaShoppingCart size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
