import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import Search from "./Search"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { userLogout } from "../../store/authSlice"
// import Search from "./Search"
import { userChannelProfile } from '../../store/userSlice'
import { useParams } from "react-router-dom"
import Logo from "../Logo"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

//   const { username } = useParams();
// const channel = useSelector((state) => state.user?.profileData);
//       useEffect(() => {
//           dispatch(userChannelProfile(username));
//       }, [dispatch, username]);


  const authStatus = useSelector((state) => state.auth.status)
  const username = useSelector((state) => state.auth?.userData?.username)
  const profileImg = useSelector((state) => state.auth?.userData?.avatar)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await dispatch(userLogout())
    setIsDropdownOpen(false)
    navigate("/")
  }

  const handleAvatarClick = (e) => {
    e.stopPropagation()
    navigate(`/channel/${username}`)
  }


  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-[#5f5d5d] h-14 px-4 flex items-center justify-between">
      <div
        className="font-semibold text-xl text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Logo/>
      </div>

      {/* Search Bar */}
      <div className="max-w-md w-full mx-4 relative hidden sm:block">
        <div className="relative">
          {/* <Search/> */}
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {authStatus ? (
          <div className="flex items-center relative" ref={dropdownRef}>
            {/* Username + Dropdown */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-white bg-transparent hover:bg-[#333] rounded-md px-3 py-1.5 transition-colors"
            >
              <span className="text-sm">{username}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#2a2a2a] border border-[#333] rounded-md shadow-xl w-48 py-1 z-[100]">
                {/* <button
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333] transition-colors"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    navigate("/settings") // optional route
                  }}
                >
                  Settings
                </button> */}
                <button
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333] transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}

            {/* Avatar */}
            <Avatar onClick={handleAvatarClick} className="h-8 w-8 border border-[#333] ml-2">
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
              className="text-white border border-[#444] hover:bg-[#333] text-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="ghost"
              className="text-white border border-[#444] hover:bg-[#333] text-sm"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
