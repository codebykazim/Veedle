"use client"

import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-[#333] h-14 px-4 flex items-center justify-between">
      {/* Logo */}
      <div className="font-semibold text-xl text-white">Serum</div>

      {/* Search Bar */}
      <div className="max-w-md w-full mx-4 relative">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full pl-8 bg-[#333] border-none rounded-md h-9 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#444]"
          />
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {/* User Profile and Custom Dropdown */}
        <div className="flex items-center relative" ref={dropdownRef}>
          {/* User Name and Dropdown Trigger */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-white bg-transparent hover:bg-[#333] rounded-md px-3 py-1.5 transition-colors"
          >
            <span className="text-sm">Jane Doe</span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {/* Custom Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-[#2a2a2a] border border-[#333] rounded-md shadow-xl w-48 py-1 z-[100]">
              <button
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333] transition-colors"
                onClick={() => {
                  // Handle settings click
                  console.log("Settings clicked")
                  setIsDropdownOpen(false)
                }}
              >
                Settings
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333] transition-colors"
                onClick={() => {
                  // Handle logout click
                  console.log("Logout clicked")
                  setIsDropdownOpen(false)
                }}
              >
                Logout
              </button>
            </div>
          )}

          {/* User Avatar */}
          <Avatar className="h-8 w-8 border border-[#333] ml-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}