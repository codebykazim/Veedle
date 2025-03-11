import React from "react";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Header/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
