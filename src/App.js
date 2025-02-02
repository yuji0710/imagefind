

// import React, { useState } from "react";
// import Navbar from "./components/Navbar"; 
// import MainCard from "./components/MainCard"; 
// import { Input } from "./components/Input"; 
// import Button from "./components/Button"; 
// import LoginPage from "./components/LoginPage"; // Import LoginPage
// import axios from "axios";

// // Simulated product recommendations (you can replace with actual API later)
// import product1Image from './assets/images/product1.jpg';
// import product2Image from './assets/images/product2.jpg';
// import product3Image from './assets/images/product3.jpg';
// import product4Image from './assets/images/product4.jpg';

// const ImageFindApp = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showLoginPage, setShowLoginPage] = useState(false); // Handle LoginPage visibility

//   // Handle Image Upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   // Handle Form Submit to fetch recommendations (mock recommendations here)
//   const handleSubmit = async () => {
//     if (!selectedImage) return alert("Please select an image first.");

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     setLoading(true);
//     setError(null);
//     try {
//       // Simulate an API call to get recommendations
//       // const response = await axios.post("http://localhost:5000/upload", formData, {
//       //   headers: {
//       //     "Content-Type": "multipart/form-data",
//       //   },
//       // });
//       // setRecommendations(response.data.similarProducts);

//       // Simulated recommendation response
//       setRecommendations([
//         { name: "Product 1", description: "This is a description for product 1", imageUrl: product1Image, url: "#" },
//         { name: "Product 2", description: "This is a description for product 2", imageUrl: product2Image, url: "#" },
//         { name: "Product 3", description: "This is a description for product 3", imageUrl: product3Image, url: "#" },
//         { name: "Product 4", description: "This is a description for product 4", imageUrl: product4Image, url: "#" },
//       ]);
//     } catch (error) {
//       setError("Error fetching recommendations. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show Login Page
//   const showLogin = () => {
//     setShowLoginPage(true);
//   };

//   // Show Home Page (via Navbar)
//   const showHomePage = () => {
//     setShowLoginPage(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Conditionally render Home or LoginPage based on showLoginPage state */}
//       {showLoginPage ? (
//         // Login Page
//         <LoginPage onLogin={showHomePage} />
//       ) : (
//         // Home Page
//         <>
//           <Navbar showHomePage={showHomePage} showLogin={showLogin} /> {/* Pass function for navbar */}

//           <div className="flex items-center justify-center p-9" style={{ minHeight: "calc(100vh - 64px)" }}>
//             <div className="w-full max-w-5xl">
//               <div className="p-8 bg-white rounded-2xl shadow-lg">
//                 <h2 className="text-xl font-bold mb-4">ImageFind Clothing Match</h2>
//                 <Input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
//                 <Button onClick={handleSubmit} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white">
//                   {loading ? "Uploading..." : "Find Similar Products"}
//                 </Button>

//                 {error && <p className="text-red-500 mt-4">{error}</p>}

//                 {selectedImage && (
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold">Selected Image:</h3>
//                     <img src={URL.createObjectURL(selectedImage)} alt="Selected Preview" className="object-cover rounded-md mt-2" />
//                   </div>
//                 )}

//                 {/* Display Local Recommendations */}
//                 {recommendations.length > 0 ? (
//                   <div className="mt-6">
//                     <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                       {recommendations.map((product, index) => (
//                         <div key={index} className="flex justify-center items-center bg-gray-100 p-4 rounded-lg shadow-lg">
//                           <MainCard
//                             title={product.name || "No Title"}
//                             description={product.description || "No Description"}
//                             imageUrl={product.imageUrl || ""}
//                             newsUrl={product.url || "#"}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="mt-6 text-gray-500">No recommendations available.</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Button to go to Login Page */}
//           <div className="flex justify-center">
//             <Button onClick={showLogin} className="bg-blue-500 text-white p-2 rounded-md">
//               Go to Login Page
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageFindApp;



import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const showLoginPage = () => setShowLogin(true);
  const showHomePage = () => setShowLogin(false);

  return (
    <div>
      <Navbar showHomePage={showHomePage} showLoginPage={showLoginPage} />
      {showLogin ? <LoginPage showHomePage={showHomePage} /> : <HomePage />}
    </div>
  );
}

export default App;
