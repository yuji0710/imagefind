// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ isAuthenticated }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className="bg-blue-700 p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-white font-bold text-2xl">
//           <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
//             ImageFind
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8">
//           {isAuthenticated ? (
//             // If authenticated, show Home link
//             <Link to="/" className="text-white hover:text-gray-300 transition duration-200">
//               Home
//             </Link>
//           ) : (
//             // If not authenticated, show Login link
//             <Link to="/login" className="text-white hover:text-gray-300 transition duration-200">
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-blue-700 text-white text-center space-y-4 mt-4 rounded-lg shadow-lg p-4">
//           {isAuthenticated ? (
//             // If authenticated, show Home link in mobile menu
//             <Link to="/" className="block py-2">Home</Link>
//           ) : (
//             // If not authenticated, show Login link in mobile menu
//             <Link to="/login" className="block py-2">Login</Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ showHomePage, showLogin }) => {
//   return (
//     <nav className="bg-blue-500 p-4">
//       <div className="flex justify-between items-center">
//         <div className="text-white text-xl font-bold cursor-pointer" onClick={showHomePage}>
//           ImageFind
//         </div>
//         <div className="space-x-4">
//           <button onClick={showLogin} className="text-white bg-green-500 p-2 rounded-md">
//             Login
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from "react";

const Navbar = ({ showHomePage, showLoginPage }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between">
        <h1 className="text-white text-xl cursor-pointer" onClick={showHomePage}>
          ImageFind
        </h1>
        <button
          onClick={showLoginPage}
          className="text-white bg-green-500 p-2 rounded-md"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
