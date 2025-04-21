"use client"

import { useEffect, useState } from "react"
import NoVideosFound from "../../components/NoVideosFound"
import VideoList from "../../components/VideoList"
import { useDispatch, useSelector } from "react-redux"
import { getAllVideos, makeVideosNull } from "../../store/videoSlice"
import HomeSkeleton from "../../skeleton/HomeSkeleton"

function ChannelVideos() {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user?.profileData?._id)
  const videos = useSelector((state) => state.video?.videos?.docs)
  const loading = useSelector((state) => state.video?.loading)
  const [searchParams, setSearchParams] = useState()
  const [activeButton, setActiveButton] = useState("button1")

  useEffect(() => {
    const sortBy = searchParams?.sortBy
    const sortType = searchParams?.sortType
    dispatch(getAllVideos({ userId, sortBy, sortType }))

    return () => dispatch(makeVideosNull())
  }, [dispatch, userId, searchParams])

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType })
  }

  if (loading && !videos?.length) {
    return (
      <div className="p-4">
        <HomeSkeleton />
      </div>
    )
  }

  if (videos?.length === 0 && !loading) {
    return <NoVideosFound />
  }

  return (
    <div className="w-full">
      {/* Sorting Buttons */}
      <div className="w-full p-4 text-white flex gap-2 flex-wrap">
        <button
          onClick={() => {
            setActiveButton("button1")
            handleSort("createdAt", "desc")
          }}
          className={`py-1.5 px-4 rounded-md transition-colors ${
            activeButton === "button1" ? "bg-[#00ed64] text-[#051622]" : "bg-[#072331] hover:bg-[#0d3446] text-gray-200"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2")
            handleSort("views", "desc")
          }}
          className={`py-1.5 px-4 rounded-md transition-colors ${
            activeButton === "button2" ? "bg-[#00ed64] text-[#051622]" : "bg-[#072331] hover:bg-[#0d3446] text-gray-200"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setActiveButton("button3")
            handleSort("createdAt", "asc")
          }}
          className={`py-1.5 px-4 rounded-md transition-colors ${
            activeButton === "button3" ? "bg-[#00ed64] text-[#051622]" : "bg-[#072331] hover:bg-[#0d3446] text-gray-200"
          }`}
        >
          Oldest
        </button>
      </div>

      {/* Video Listing */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-2 text-white">
        {videos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={video.avatar?.url}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
            videoId={video._id}
          />
        ))}
      </div>

      {/* Mini loading indicator when more videos are fetching */}
      {loading && videos?.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-pulse flex space-x-2">
            <div className="h-2 w-2 bg-[#00ed64] rounded-full"></div>
            <div className="h-2 w-2 bg-[#00ed64] rounded-full"></div>
            <div className="h-2 w-2 bg-[#00ed64] rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelVideos
