import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown, SearchIcon } from "lucide-react";
import Search from "./Search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userLogout } from "../../store/authSlice";
import Logo from "../Logo";
import { SearchForSmallScreen } from "..";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth?.userData?.username);
  const profileImg = useSelector((state) => state.auth?.userData?.avatar);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await dispatch(userLogout());
    setIsDropdownOpen(false);
    navigate("/");
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${username}`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#072331] border-b border-[#1e3a47] h-14 px-2 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center flex-shrink-0">
          <div
            className="font-semibold text-xl text-white cursor-pointer pl-0 sm:pl-0"
            onClick={() => navigate("/")}
          >
            <Logo />
          </div>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="flex-1 mx-2 sm:mx-4">
          {/* Full Search for large screens */}
          <div className="hidden sm:block relative max-w-md mx-auto">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Search icon for small screens */}
          <div className="sm:hidden flex justify-center">
            <button
              onClick={() => setOpenSearch(true)}
              className="text-white hover:text-[#00ed64] transition-colors"
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Section: User */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {authStatus ? (
            <div className="flex items-center relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-white bg-transparent hover:bg-[#0d3446] rounded-md px-2 sm:px-3 py-1.5 transition-colors"
              >
                <span className="text-sm hidden sm:inline">{username}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[#0d3446] border border-[#1e3a47] rounded-md shadow-xl w-48 py-1 z-[100]">
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#164863] transition-colors"
                    onClick={handleAvatarClick}
                  >
                    Your Channel
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#164863] transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* Avatar */}
              <Avatar
                onClick={handleAvatarClick}
                className="h-8 w-8 border border-[#1e3a47] ml-1 cursor-pointer"
              >
                <AvatarImage
                  src={profileImg || "/placeholder.svg"}
                  alt={username}
                />
                <AvatarFallback>
                  {username?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="text-white border border-[#1e3a47] hover:bg-[#0d3446] text-xs sm:text-sm px-2 sm:px-3 h-8"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] text-xs sm:text-sm px-2 sm:px-3 h-8"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Modal */}
      <SearchForSmallScreen open={openSearch} setOpenSearch={setOpenSearch} />
    </>
  );
}
