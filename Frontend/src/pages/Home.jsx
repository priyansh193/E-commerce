import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import ImageSlider from "../components/ImageSlider";
import Categories from '../components/Categories.jsx'

const images = [
  "https://via.placeholder.com/600x400?text=Image+1",
  "https://via.placeholder.com/600x400?text=Image+2",
  "https://via.placeholder.com/600x400?text=Image+3",
];

function Home() {
  return (
    <div>
      <Categories/>
      <br />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ImageSlider images={images} />
      </div>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
}

export default Home;
