import React from 'react';
import {assets} from '../assets/assets.js'
import { NavLink } from 'react-router-dom';

export default function Categories() {
    const categories = [
      { name: "Electronics", image: '../assets/electronics.png' },
      { name: "Fashion", image: "/images/fashion.png" },
      { name: "Home & Living", image: "/images/home-living.png" },
      { name: "Beauty & Health", image: "/images/beauty-health.png" },
      { name: "Sports", image: "/images/sports.png" },
      { name: "Toys", image: "/images/toys.png" },
    ];
  
    return (
      <div className="w-full bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <NavLink to='/electronics'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.electronics}
              alt=""
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Electronics</p>
          </div>
          </NavLink>

          <NavLink to='/fashion'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.fashion}
              alt=""
              className="w-16 h-16 object-cover mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Fashion</p>
          </div>
          </NavLink>

          <NavLink to='/home-collection'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.home}
              alt=""
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Home & Living</p>
          </div>
          </NavLink>

          <NavLink to='/beauty'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.beauty}
              alt=""
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Beauty & Health</p>
          </div>
          </NavLink>

          <NavLink to='/sports'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.sports}
              alt=""
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Sports</p>
          </div>
          </NavLink>

          <NavLink to='/toys'>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg ">
            <img
              src={assets.toys}
              alt=""
              className="w-16 h-16 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Toys</p>
          </div>
          </NavLink>
        </div>
      </div>
    );
  }