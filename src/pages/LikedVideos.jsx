"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedVideos } from "../store/likeSlice"
import { makeVideosNull } from "../store/videoSlice"
import LikedVideosSkeleton from "@/skeleton/LikedVideosSkeleton"
import { MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import MessyDoodle from "../assets/MessyDoodle.svg"
import { useNavigate } from "react-router-dom"

function LikedVideos() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const likedVideos = useSelector((state) => state.like?.likedVideos)
  const loading = useSelector((state) => state.like.loading)

  const firstLikedVideo = likedVideos?.find((v) => v?.likedVideo)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getLikedVideos())
    return () => dispatch(makeVideosNull())
  }, [dispatch])

  const formatDuration = (durationInSeconds) => {
    if (!durationInSeconds || durationInSeconds === 0) return "0:00"
    const roundedDuration = Math.floor(durationInSeconds)
    const minutes = Math.floor(roundedDuration / 60)
    const seconds = roundedDuration % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  const playFirstVideo = () => {
    if (firstLikedVideo) {
      navigate(`/watch/${firstLikedVideo.likedVideo._id}`)
    }
  }

  if (loading) return <LikedVideosSkeleton />

  const hasVideos = Array.isArray(likedVideos) && likedVideos.length > 0

  return (
    <div className="bg-[#051622] min-h-screen sm:ml-60 mt-14 text-white px-2 sm:px-0 pb-16 sm:pb-6">
      {!hasVideos && (
        <div className="flex flex-col items-center justify-center py-10 sm:py-16 p-4 sm:p-6">
          <img src={MessyDoodle || "/placeholder.svg"} alt="No videos available" className="mb-4 sm:mb-6" width="160" />
          <p className="text-base sm:text-lg text-gray-400 mb-2">No videos liked yet</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 text-center max-w-md">
            Your Liked videos will appear here. Start watching content.
          </p>
        </div>
      )}

      {hasVideos && firstLikedVideo && (
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 p-2 sm:p-3 md:p-6">
          {/* Left Panel - Featured Video */}
          <div
            className="relative w-full md:w-[300px] h-auto md:h-full md:sticky md:top-16 p-3 border border-[#1e3a47] rounded-lg overflow-hidden"
            style={{
              backgroundImage: firstLikedVideo?.likedVideo?.thumbnail?.url
                ? `url(${firstLikedVideo.likedVideo.thumbnail.url})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 backdrop-blur-md bg-[#051622]/70 rounded-lg"></div>

            <div className="relative z-10">
              <div className="w-full h-36 sm:h-32 md:h-40">
                <img
                  src={firstLikedVideo?.likedVideo?.thumbnail?.url || "/placeholder.svg"}
                  alt="Featured video"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="mt-2 sm:mt-3">
                <h1 className="text-white text-base sm:text-lg font-semibold">Liked videos</h1>
                <p className="text-xs text-gray-300">{firstLikedVideo?.likedVideo?.ownerDetails?.username}</p>
                <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">{likedVideos.length} videos</p>
              </div>

              <div className="flex items-center mt-2 sm:mt-3 gap-2 mb-1 sm:mb-2 md:mb-0">
                <Button
                  className="bg-[#00ed64] text-[#051622] hover:bg-[#00c050] rounded-md px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm"
                  onClick={playFirstVideo}
                >
                  Play
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Video List with correct numbering */}
          <div className="flex-1 space-y-2 sm:space-y-2 mt-3 md:mt-0">
            {(() => {
              let count = 0
              return likedVideos.map((videoObj) => {
                const video = videoObj?.likedVideo
                if (!video) return null

                count += 1

                return (
                  <div
                    key={video._id}
                    className="flex gap-2 sm:gap-2 md:gap-4 p-2 hover:bg-[#0d3446] group rounded-lg cursor-pointer"
                    onClick={() => navigate(`/watch/${video._id}`)}
                  >
                    <div className="flex items-center w-5 sm:w-6 md:w-8 text-center text-gray-400 font-medium text-xs sm:text-sm md:text-base">
                      {count}
                    </div>
                    <div className="relative w-32 sm:w-32 md:w-40 h-20 sm:h-20 md:h-24 flex-shrink-0">
                      <img
                        src={video.thumbnail?.url || "/placeholder.svg"}
                        alt={video.title || "Video"}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-[10px] sm:text-xs px-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="text-xs sm:text-sm font-medium line-clamp-2">
                        {video.title || "Untitled Video"}
                      </h3>
                      <div className="flex flex-col mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-400">
                        <span className="truncate">{video.ownerDetails?.username || "Unknown"}</span>
                        <div className="flex items-center text-[10px] sm:text-xs">
                          <span>{video.views || 0} views</span>
                          <span className="mx-0.5 sm:mx-1">•</span>
                          <span>{new Date(video.createdAt).toLocaleDateString() || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    <button className="self-start p-1 sm:p-1.5 md:p-2 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-[#164863]">
                      <MoreVertical size={14} className="sm:hidden" />
                      <MoreVertical size={16} className="hidden sm:block" />
                    </button>
                  </div>
                )
              })
            })()}
            <div className="h-4 md:hidden"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LikedVideos
