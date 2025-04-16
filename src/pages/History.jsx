"use client"

import { useEffect } from "react"
import { NoVideosFound, VideoList } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { getWatchHistory } from "../store/userSlice"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import HomeSkeleton from "../skeleton/HomeSkeleton"

function History() {
  const loading = useSelector((state) => state.user?.loading)
  const videos = useSelector((state) => state.user?.history)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getWatchHistory())
  }, [dispatch])

  // Show skeleton during initial loading
  if (loading && (!videos || videos.length === 0)) {
    return (
      <div className="bg-[#121212] min-h-screen pt-[64px] sm:ml-60 px-4 sm:px-6">
        <HomeSkeleton />
      </div>
    )
  }

  // No videos found
  if (videos?.length === 0) {
    return (
      <div className="bg-[#121212] min-h-screen pt-[64px] sm:ml-60 px-4 sm:px-6">
        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg sm:text-xl font-bold text-white">History</h1>
          </div>
          <NoVideosFound text="Your watch history is empty. Videos you watch will appear here." />
        </div>
      </div>
    )
  }

  // Main content
  return (
    <div className="bg-[#121212] min-h-screen pt-[64px] sm:ml-60 px-4 sm:px-6">
      <div className="py-6">
        {/* Optional title and clear history button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white ">Your History</h1>
          {/* <Button variant="outline" className="bg-[#272727] hover:bg-[#3a3a3a] text-white border-none rounded-full w-fit text-sm sm:text-base">
            <Trash2 size={16} className="mr-2" />
            Clear all watch history
          </Button> */}
        </div>

        <div className="text-white grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
          {videos?.map((video) => (
            <VideoList
              key={video._id}
              avatar={video.owner?.avatar}
              duration={video.duration}
              title={video.title}
              thumbnail={video.thumbnail?.url}
              createdAt={video.createdAt}
              views={video.views}
              channelName={video.owner.username}
              videoId={video._id}
            />
          ))}
        </div>

        {/* Optional: mini loading dots */}
        {loading && videos?.length > 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default History
