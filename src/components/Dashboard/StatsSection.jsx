import React from "react"
import { MdOutlineSlowMotionVideo, RxAvatar, FaRegEye, FaRegHeart } from "../../components/icons"

function StatsSection({ dashboard }) {
  const stats = [
    {
      icon: <MdOutlineSlowMotionVideo size={28} className="text-[#00ed64]" />,
      label: "Total Videos",
      value: dashboard?.totalVideos || 0,
    },
    {
      icon: <FaRegEye size={28} className="text-[#00ed64]" />,
      label: "Total Views",
      value: dashboard?.totalViews || 0,
    },
    {
      icon: <RxAvatar size={28} className="text-[#00ed64]" />,
      label: "Total Subscribers",
      value: dashboard?.totalSubscribers || 0,
    },
    {
      icon: <FaRegHeart size={28} className="text-[#00ed64]" />,
      label: "Total Likes",
      value: dashboard?.totalLikes || 0,
    },
  ]

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#072331] border border-[#1e3a47] rounded-lg p-4 hover:border-[#00ed64] transition-colors"
        >
          <div className="mb-3">{stat.icon}</div>
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsSection
