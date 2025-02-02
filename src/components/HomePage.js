import React, { useState } from "react";

// Import your images
import product1 from "../assets/images/product1.jpg";
import product2 from "../assets/images/product2.jpg";
import product3 from "../assets/images/product3.jpg";
import product4 from "../assets/images/product4.jpg";
import product5 from "../assets/images/product5.jpg";
import product6 from "../assets/images/product6.jpg";
import product7 from "../assets/images/product7.jpg";
import product8 from "../assets/images/product8.jpg";
import product9 from "../assets/images/product9.jpg";
import product10 from "../assets/images/product10.jpg";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const shuffleImages = (images) => {
    let shuffledImages = [...images]; // Make a copy of the array to avoid mutating the original
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]]; // Swap elements
    }
    return shuffledImages;
  };

  const handleFindSimilar = () => {
    const images = [
      { name: "Stylish Jacket", price: "$50", imgUrl: product1 },
      { name: "Casual T-Shirt", price: "$20", imgUrl: product2 },
      { name: "Elegant Dress", price: "$80", imgUrl: product3 },
      { name: "Cozy Sweater", price: "$30", imgUrl: product4 },
      { name: "Summer Shorts", price: "$25", imgUrl: product5 },
      { name: "Formal Pants", price: "$60", imgUrl: product6 },
      { name: "Chic Blouse", price: "$40", imgUrl: product7 },
      { name: "Denim Jacket", price: "$55", imgUrl: product8 },
      { name: "Winter Coat", price: "$100", imgUrl: product9 },
      { name: "Beach Dress", price: "$45", imgUrl: product10 },
    ];

    // Shuffle the images and set the state
    const shuffledRecommendations = shuffleImages(images);
    setRecommendations(shuffledRecommendations);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">ImageFind Clothing Match</h2>

      {/* Image Upload Section */}
      <div className="bg-white p-12 rounded-xl shadow-lg max-w-4xl mx-auto">
        <div className="mb-8">
          <label className="block mb-4 text-xl font-medium text-gray-700">
            Upload an Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-3"
          />
        </div>

        {selectedImage && (
          <div className="mb-8">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-80 object-cover rounded-md shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleFindSimilar}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-md text-lg font-semibold"
        >
          Find Similar Products
        </button>
      </div>

      {/* Product Recommendation Cards */}
      {recommendations.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Recommended Products:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recommendations.map((product, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="font-semibold text-xl">{product.name}</h4>
                <p className="text-gray-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
