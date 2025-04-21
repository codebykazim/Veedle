"use client"
import { useNavigate } from "react-router-dom"

function Avatar({ src, channelName, size = "md" }) {
  const navigate = useNavigate()

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const handleAvatarClick = (e) => {
    e.stopPropagation()
    navigate(`/channel/${channelName}`)
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-[#00ed64]/20 flex items-center justify-center overflow-hidden border border-[#1e3a47] hover:border-[#00ed64] transition-colors cursor-pointer`}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt="avatar"
          className="w-full h-full object-cover"
          onClick={handleAvatarClick}
        />
      ) : (
        <span className="text-lg font-bold text-[#00ed64]">{channelName?.charAt(0)?.toUpperCase()}</span>
      )}
    </div>
  )
}

export default Avatar
