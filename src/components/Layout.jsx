import Navbar from "../components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Header/Sidebar";

function Layout() {
  return (
    <div className="bg-[#051622] min-h-screen">
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="">
          <Sidebar />
        </div>
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
