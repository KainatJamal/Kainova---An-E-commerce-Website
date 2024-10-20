import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import c1 from '../assets/c1.PNG'; // Adjusted paths
import c2 from '../assets/c2.PNG';
import c3 from '../assets/c3.PNG';
import capture from '../assets/Capture.PNG';

const ImageSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageSectionRef = useRef(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on whether the element is intersecting
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (imageSectionRef.current) {
      observer.observe(imageSectionRef.current);
    }

    return () => {
      if (imageSectionRef.current) {
        observer.unobserve(imageSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="image-section" ref={imageSectionRef}>
      <div className={`image-box ${isVisible ? 'fade-in' : ''}`}>
        <img src={c1} alt="C1" />
        <div className="image-text">SHIRTS</div>
      </div>
      <div className={`image-box ${isVisible ? 'fade-in' : ''}`}>
        <img src={c2} alt="C2" />
        <div className="image-text">EARRINGS</div>
      </div>
      <div className={`image-box ${isVisible ? 'fade-in' : ''}`}>
        <img src={c3} alt="C3" />
        <div className="image-text">BRACELETS</div>
      </div>
      <div className={`image-box ${isVisible ? 'fade-in' : ''}`}>
        <img src={capture} alt="Capture" />
        <div className="image-text">TOPS</div>
      </div>
      {/* Centering the button below the images */}
      <div className="button-container">
        <button className="shop-now" onClick={() => navigate('/shop')}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ImageSection;
