import React from "react";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Header/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
