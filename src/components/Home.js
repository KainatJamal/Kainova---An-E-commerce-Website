import React from 'react';
import SliderComponent from './Slider';
import ImageSection from './ImageSection'; // Import the new component
import '../styles/styles.css';

const Home = () => {
  return (
    <div className="home">
      <SliderComponent />
      <ImageSection /> {/* Add the ImageSection component here */}
    </div>
  );
};

export default Home;
