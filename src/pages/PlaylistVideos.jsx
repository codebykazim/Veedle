"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPlaylistById } from "../store/playlistSlice"
import { timeAgo } from "../helpers/timeAgo"
import { ArrowLeft, Play, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"

function PlaylistVideos() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const playlist = useSelector((state) => state.playlist?.playlist)
  console.log(playlist);
  
  const loading = useSelector((state) => state.playlist?.loading)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    if (id) {
      dispatch(getPlaylistById(id))
    }
  }, [dispatch, id])

  // Handle video selection
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index)
    // Scroll to top when selecting a new video on mobile
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    // Auto play when selecting a video
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log("Autoplay prevented:", err))
    }
  }

  // Format video duration
  const formatDuration = (seconds) => {
    if (!seconds) return "0:00"

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Handle video ended event
  const handleVideoEnded = () => {
    if (currentVideoIndex < (playlist?.videos?.length || 0) - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1)
    }
  }

  // Shuffle playlist
  const shufflePlaylist = () => {
    if (!playlist?.videos || playlist.videos.length <= 1) return
    const randomIndex = Math.floor(Math.random() * playlist.videos.length)
    setCurrentVideoIndex(randomIndex)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#051622]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ed64]"></div>
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="text-center py-16 flex flex-col justify-center items-center bg-[#051622] text-white min-h-screen">
        <div className="bg-[#072331] p-8 rounded-xl border border-[#1e3a47] max-w-md shadow-lg">
          <h1 className="text-2xl font-medium mb-3">Playlist Not Found</h1>
          <p className="text-gray-400 mb-4">The playlist you're looking for doesn't exist or has been removed.</p>
          <Button
            className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] px-6 py-2.5 rounded-md transition-colors font-medium shadow-md"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const currentVideo = playlist.videos?.[currentVideoIndex]

  return (
    <div className="bg-[#051622] text-white min-h-screen">
      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-400 hover:text-[#00ed64] transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </button>
        </div>

        {/* Video player section */}
        {playlist.videos && playlist.videos.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Video player */}
            <div className="lg:w-[65%] space-y-4">
              <div className="relative w-full bg-[#072331] rounded-xl overflow-hidden border border-[#1e3a47]">
                {currentVideo?.videoFile?.url ? (
                  <div className="aspect-video">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-contain"
                      src={currentVideo.videoFile.url}
                      poster={currentVideo.thumbnail?.url}
                      controls
                      onEnded={handleVideoEnded}
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <p className="text-gray-400">Video unavailable</p>
                  </div>
                )}
              </div>

              {/* Video info */}
              <div>
                <h1 className="text-xl font-bold">{currentVideo?.title || "Untitled Video"}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <span>{currentVideo?.views || 0} views</span>
                  <span>•</span>
                  <span>{timeAgo(currentVideo?.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Playlist sidebar */}
            <div className="lg:w-[35%]">
              <div className="bg-[#072331] rounded-xl border border-[#1e3a47] overflow-hidden sticky top-4">
                {/* Playlist header */}
                <div className="p-4 border-b border-[#1e3a47]">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-lg">{playlist.name}</h2>
                    <Button
                      onClick={shufflePlaylist}
                      className="p-1.5 bg-[#0d3446] hover:bg-[#164863] border border-[#1e3a47]/50"
                      title="Shuffle playlist"
                    >
                      <Shuffle size={16} />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-2">{playlist.description}</p>
                  <div className="text-xs text-gray-400">{playlist.videos?.length || 0} videos</div>
                </div>

                {/* Video list */}
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  {playlist.videos && playlist.videos.length > 0 ? (
                    playlist.videos.map((video, index) => (
                      <div
                        key={video._id || index}
                        className={`flex gap-3 p-3 hover:bg-[#0d3446] cursor-pointer transition-colors ${
                          currentVideoIndex === index ? "bg-[#0d3446]" : ""
                        }`}
                        onClick={() => handleVideoSelect(index)}
                      >
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <img
                            src={video.thumbnail?.url || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                            <Play size={20} className="text-white" />
                          </div>
                          <div className="absolute bottom-1 right-1 bg-black/70 text-xs px-1 rounded">
                            {formatDuration(video.duration)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{video.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{video.owner?.fullName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-center text-gray-400">No videos in this playlist</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#072331] rounded-xl p-8 border border-[#1e3a47] flex flex-col items-center justify-center">
            <p className="text-xl font-medium mb-4">This playlist has no videos</p>
            <p className="text-gray-400 text-center">Videos added to this playlist will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaylistVideos
