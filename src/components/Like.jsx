"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../store/likeSlice"

function Like({ isLiked, likesCount = 0, tweetId, commentId, videoId, size }) {
  const dispatch = useDispatch()
  const [localIsLiked, setLocalIsLiked] = useState(isLiked)
  const [localLikesCount, setLocalLikesCount] = useState(likesCount)

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1)
    } else {
      setLocalLikesCount((prev) => prev + 1)
    }

    setLocalIsLiked((prev) => !prev)

    if (tweetId) {
      dispatch(toggleTweetLike(tweetId))
    }
    if (commentId) {
      dispatch(toggleCommentLike(commentId))
    }
    if (videoId) {
      dispatch(toggleVideoLike(videoId))
    }
  }

  useEffect(() => {
    setLocalIsLiked(isLiked)
    setLocalLikesCount(likesCount)
  }, [isLiked, likesCount])

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLikeToggle} className="flex items-center gap-1 group">
        <ThumbsUp
          size={size}
          className={`cursor-pointer transition-colors ${
            localIsLiked ? "text-[#00ed64]" : "group-hover:text-gray-300"
          }`}
        />
        <span className={`text-xs mr-3 ${localIsLiked ? "text-[#00ed64]" : "text-gray-400"}`}>{localLikesCount}</span>
      </button>
      <ThumbsDown size={size} className="cursor-pointer hover:text-gray-300 transition-colors" />
    </div>
  )
}

export default Like
