import React from "react";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import ImageSlider from "../components/ImageSlider";
import Categories from '../components/Categories.jsx'
import ElectronicCollection from "../components/ElectronicCollection.jsx";
import  {assets}  from "../assets/assets.js";

const images = [
  assets.fashionDeals,
  assets.electronicDeal,
  assets.ecomm
];

function Home() {
  return (
    <div>
      <Categories />
      <br />
      {/* Image Slider Section */}
      <div className="w-full bg-gray-100">
        <ImageSlider images={images} autoSlide={true} autoSlideInterval={5000} />
      </div>
      
      {/* Other Sections */}
      <LatestCollection />
      <ElectronicCollection />
      <OurPolicy />
    </div>
  );
}

export default Home;
