// import React, { useState } from "react";
// import Button from "./Button";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Here, you can add any validation if needed.
//     if (username && password) {
//       onLogin(); // Close login page on successful login (you can add logic here)
//     } else {
//       alert("Please enter both username and password.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Login</h2>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="mt-2 p-2 w-full border rounded-md"
//             placeholder="Enter your username"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-2 p-2 w-full border rounded-md"
//             placeholder="Enter your password"
//           />
//         </div>
//         <Button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md">
//           Login
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from "react";
import Button from "./Button";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        <Button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 text-lg rounded-lg"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;





// import React, { useState } from "react";

// const LoginPage = ({ showHomePage }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (username && password) {
//       alert("Login successful!");
//       showHomePage();
//     } else {
//       alert("Please enter username and password.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Login Page</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         className="p-2 border rounded mb-2 w-full"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="p-2 border rounded mb-4 w-full"
//       />
//       <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded-md">
//         Login
//       </button>
//     </div>
//   );
// };

// export default LoginPage;
