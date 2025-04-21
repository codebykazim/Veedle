"use client"
import { formatDuration, timeAgo } from "../helpers/timeAgo"
import { useNavigate } from "react-router-dom"
import { MoreVertical } from "lucide-react"

function VideoList({ thumbnail, duration, title, views = 0, avatar, channelName, createdAt, videoId }) {
  const navigate = useNavigate()

  const handleAvatarClick = (e) => {
    e.stopPropagation()
    navigate(`/channel/${channelName}`)
  }

  return (
    <div className="w-full">
      <div className="bg-[#0d2a38] rounded-lg overflow-hidden">
        {/* Thumbnail with duration */}
        <div className="relative cursor-pointer" onClick={() => navigate(`/watch/${videoId}`)}>
          <img src={thumbnail || "/placeholder.svg"} className="w-full aspect-video object-cover" alt={title} />
          <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1.5 py-0.5 rounded">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Video info */}
        <div className="p-3 flex">
          {/* Avatar */}
          {avatar && (
            <div onClick={handleAvatarClick} className="flex-shrink-0 cursor-pointer mr-3">
              <img src={avatar || "/placeholder.svg"} className="w-8 h-8 rounded-full object-cover" alt={channelName} />
            </div>
          )}

          {/* Title, views, etc. */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[#00ed64] text-sm font-medium leading-tight line-clamp-1 mb-1">{title}</h3>
            <div className="text-xs text-gray-400">
              {views} views • {timeAgo(createdAt)}
            </div>
            <div className="text-xs text-gray-400">{channelName}</div>
          </div>

          {/* More options button */}
          <button className="text-gray-400 hover:text-white ml-2">
            {/* <MoreVertical size={16} /> */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoList
