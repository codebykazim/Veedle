"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-[#333] h-14 px-4 flex items-center justify-between">
      {/* Logo */}
      <div className="font-semibold text-xl text-white">Serum</div>

      {/* Search Bar */}
      <div className="max-w-md w-full mx-4 relative">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search"
            className="w-full pl-8 bg-[#333] border-none rounded-md h-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#444]"
          />
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">

        {/* User Profile and Dropdown */}
        <div className="flex items-center" ref={dropdownRef}>
          {/* User Name and Dropdown Trigger */}
          <div className="relative mr-3">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-white hover:opacity-80"
            >
              <span className="text-sm mr-1">Jane Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#2a2a2a] border border-[#333] rounded-md shadow-lg overflow-hidden">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#333] focus:bg-[#333] focus:outline-none">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#333] focus:bg-[#333] focus:outline-none">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar - Separated */}
          <div className="h-8 w-8 rounded-full bg-gray-700 border border-[#333] overflow-hidden">
            <img src="/placeholder.svg?height=32&width=32" alt="Jane Doe" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
