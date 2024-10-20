import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import '../styles/styles.css';
import Cart from './Cart';
import { FaPlus } from 'react-icons/fa';

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productRefs = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8000/api/products/');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);
  
  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const sortProducts = (criteria) => {
    let sortedProducts = [...products];
    switch (criteria) {
      case 'AZ':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ZA':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceLow':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setDropdownVisible(false);
  };

  const handleScroll = () => {
    productRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          ref.classList.add('visible');
          ref.style.transitionDelay = `${index * 100}ms`;
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    let updatedCartItems;

    if (existingProduct) {
      // If the product already exists, increment the quantity
      updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If the product does not exist, add it to the cart with quantity 1
      updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update localStorage
    setIsCartOpen(true); // Open the cart
  };

  const removeItemFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update localStorage
  };

  const openCart = () => {
    setIsCartOpen(true);
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Get sorted products based on the selected criteria
  const sortedProducts = sortProducts(sortCriteria);

  return (
    <div className="shop-container">
      <div className="breadcrumbs">
        <p>Home {'>'} All Products</p>
      </div>

      <div className="shop-header">
        <div className="filter-sort">
          <div 
            className="dropdown-container" 
            onMouseEnter={() => setDropdownVisible(true)} 
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <button className="sort-button">Filter by</button>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li><a href="#!" onClick={() => handleSortChange('AZ')}>Alphabetically A-Z</a></li>
                <li><a href="#!" onClick={() => handleSortChange('ZA')}>Alphabetically Z-A</a></li>
                <li><a href="#!" onClick={() => handleSortChange('priceLow')}>Price Low to High</a></li>
                <li><a href="#!" onClick={() => handleSortChange('priceHigh')}>Price High to Low</a></li>
              </ul>
            )}
          </div>
        </div>
        <p>{sortedProducts.length} items</p>
      </div>
      <button onClick={openCart}>Open Cart</button> {/* Button to open cart */}
      
      {/* Pass the isCartOpen state and closeCart function to the Cart component */}
      <Cart 
        cartItems={cartItems} 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        setCartItems={setCartItems} 
        removeItemFromCart={removeItemFromCart} 
      />
      
      <div className="product-grid">
        {sortedProducts.map((product, index) => (
          <div 
            className="product-card" 
            key={product.id} 
            ref={(el) => (productRefs.current[index] = el)}
          >
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{`PKR ${product.price}`}</p>
              <button onClick={() => handleAddToCart(product)}>
                <FaPlus /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 