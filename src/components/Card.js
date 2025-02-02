import React, { useState } from "react";
import Navbar from "./components/Navbar"; 
import Card from "./components/Card"; // Import the Card component
import { Input } from "./components/Input"; 
import Button from "./components/Button"; 

// Simulated product recommendations (you can replace with actual API later)
import product1Image from './assets/images/product1.jpg';
import product2Image from './assets/images/product2.jpg';
import product3Image from './assets/images/product3.jpg';
import product4Image from './assets/images/product4.jpg';

const ImageFindApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulated recommendation data
  const recommendations = [
    { name: "Product 1", description: "This is a description for product 1", imageUrl: product1Image, url: "#" },
    { name: "Product 2", description: "This is a description for product 2", imageUrl: product2Image, url: "#" },
    { name: "Product 3", description: "This is a description for product 3", imageUrl: product3Image, url: "#" },
    { name: "Product 4", description: "This is a description for product 4", imageUrl: product4Image, url: "#" },
  ];

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar is always displayed as the user is considered authenticated */}
      <Navbar isAuthenticated={true} /> 

      <div className="flex items-center justify-center p-9" style={{ minHeight: "calc(100vh - 64px)" }}>
        <div className="w-full max-w-5xl">
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">ImageFind Clothing Match</h2>
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            <Button onClick={() => {}} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white">
              {loading ? "Uploading..." : "Find Similar Products"}
            </Button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {selectedImage && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Image:</h3>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected Preview" className="object-cover rounded-md mt-2" />
              </div>
            )}

            {/* Display Local Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendations.map((product, index) => (
                  <div key={index} className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-lg">
                    <Card 
                      title={product.name || "No Title"} 
                      imageUrl={product.imgUrl || "hello"} 
                      onClick={() => window.open(product.url || "#", '_blank')} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFindApp;
