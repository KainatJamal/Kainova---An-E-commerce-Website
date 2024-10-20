import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/styles.css';

// Import the images from the assets folder
import image1 from '../assets/istockphoto-1415172922-612x612.webp';
import image2 from '../assets/photo-1551029118-d3c293a67c0e.avif';
import image3 from '../assets/photo-1483985988355-763728e1935b.avif';
import image4 from '../assets/premium_photo-1664202526559-e21e9c0fb46a.avif';

const SliderComponent = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const settings = {
    dots: true,
    infinite: true, // Ensures the slider loops
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // 3000ms = 3 seconds per image
    pauseOnHover: true, // Pause when hovering over the slider
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={image4} alt="Fashion 4" />
        </div>
        <div>
          <img src={image2} alt="Fashion 2" />
        </div>
        <div>
          <img src={image3} alt="Fashion 3" />
        </div>
        <div>
          <img src={image1} alt="Fashion 1" />
        </div>
      </Slider>

      {/* Text overlay for the logo */}
      <div className="logo-text">KAINOVA .</div>

      {/* Tagline below the logo */}
      <div className="tagline">Wear Your Story, Shine Your Way</div>

      {/* Shop Now Button */}
      <button className="shop-now-button" onClick={() => navigate('/shop')}>
        Shop Now
      </button>
    </div>
  );
};

export default SliderComponent;
