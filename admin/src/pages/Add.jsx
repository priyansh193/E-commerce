import React, { useState } from "react";
import { useEffect } from "react";

const categories = [
  { id: 1, name: "Electronics", details: "Latest gadgets and devices", logo: "📱" },
  { id: 2, name: "Fashion", details: "Trendy clothes and accessories", logo: "👗" },
  { id: 3, name: "Home & Kitchen", details: "Essentials for your home", logo: "🏠" },
  { id: 4, name: "Books", details: "Explore a wide range of books", logo: "📚" },
  { id: 5, name: "Beauty", details: "Cosmetics and skincare", logo: "💄" },
  { id: 6, name: "Sports", details: "Gear and equipment for sports", logo: "⚽" },
];

const Add = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    
  },[selectedCategory])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`border p-4 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 ${
              selectedCategory === category.id ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="text-4xl text-center mb-2">{category.logo}</div>
            <h3 className="text-xl font-semibold text-center">{category.name}</h3>
            <p className="text-gray-600 text-center">{category.details}</p>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="mt-6 text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
            Add Product in {categories.find((cat) => cat.id === selectedCategory).name}
          </button>
        </div>
      )}
    </div>
  );
};

export default Add;