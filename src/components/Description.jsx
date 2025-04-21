"use client"

import { useState } from "react"
import { timeAgo } from "../helpers/timeAgo"
import { Like } from "./index"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toggleSubscription } from "../store/subscriptionSlice"
import Avatar from "./Avatar"

function Description({
  title,
  views,
  createdAt,
  channelName,
  avatar,
  subscribersCount,
  likesCount,
  isSubscribed,
  description,
  isLiked,
  videoId,
  channelId,
}) {
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed)
  const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount)
  const dispatch = useDispatch()

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId))
    setLocalIsSubscribed((prev) => !prev)
    setLocalSubscribersCount((prev) => (localIsSubscribed ? prev - 1 : prev + 1))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4 text-white">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <div>
            <span>{views} views</span>
            <span className="mx-2">•</span>
            <span>{timeAgo(createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Like isLiked={isLiked} videoId={videoId} likesCount={likesCount} size={20} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#1e3a47]">
        <Link to={`/channel/${channelName}/videos`} className="flex items-center gap-3 group">
          <Avatar src={avatar} channelName={channelName} size="md" />
          <div>
            <p className="font-medium group-hover:text-[#00ed64] transition-colors">{channelName}</p>
            <p className="text-xs text-gray-400">{localSubscribersCount} subscribers</p>
          </div>
        </Link>
        <Button
          onClick={handleSubscribe}
          className={`rounded-md px-4 py-1.5 font-medium transition-all ${
            localIsSubscribed
              ? "bg-[#0d3446] hover:bg-[#164863] text-white"
              : "bg-[#00ed64] hover:bg-[#00c050] text-[#051622]"
          }`}
        >
          {localIsSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </div>

      {description && (
        <div className="bg-[#0d3446] rounded-lg p-4 text-sm text-gray-300 whitespace-pre-line border border-[#1e3a47]">
          {description}
        </div>
      )}
    </div>
  )
}

export default Description
