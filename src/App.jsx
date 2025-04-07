import React from "react";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Header/Sidebar";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow">
        {/* <Signup/> */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
