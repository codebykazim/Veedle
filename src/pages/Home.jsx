"use client"

import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllVideos, makeVideosNull } from "../store/videoSlice"
import { VideoList } from "../components"
import HomeSkeleton from "@/skeleton/HomeSkeleton"

function HomePage() {
  const dispatch = useDispatch()
  const videos = useSelector((state) => state.video?.videos?.docs)
  const loading = useSelector((state) => state.video?.loading)
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage)

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getAllVideos({ page: 1, limit: 10 }))
    return () => dispatch(makeVideosNull())
  }, [dispatch])

  useEffect(() => {
    if (videos && videos.length > 0) {
    }
  }, [videos])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  const fetchMoreVideos = useCallback(() => {
    if (isLoading) return

    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1, limit: 10 }))
        .then(() => setPage((prev) => prev + 1))
        .catch((error) => {
          setIsLoading(false)
        })
    }
  }, [page, hasNextPage, dispatch, isLoading])

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      if (bottom && !loading && hasNextPage) {
        fetchMoreVideos()
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fetchMoreVideos, loading, hasNextPage])

  const uniqueVideos = videos?.filter((video, index, self) => index === self.findIndex((v) => v._id === video._id))

  return (
    <div className="bg-[#051622] min-h-screen px-4 sm:px-6 md:px-10 pt-16 sm:pt-14 sm:ml-60 pb-20 sm:pb-8">
      {/* Recommended Videos Header */}
      <h2 className="text-2xl sm:text-xl md:text-2xl font-bold text-white md:text-white mt-3 mb-5">
        Recommended Videos
      </h2>

      {/* Initial loading skeleton when no videos yet */}
      {isLoading && (!videos || videos.length === 0) && <HomeSkeleton />}

      <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 text-white">
        {/* Videos */}
        {uniqueVideos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={video.ownerDetails?.avatar}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
            channelName={video.ownerDetails?.username}
            videoId={video._id}
          />
        ))}
      </div>

      {/* Loading skeleton for infinite scroll */}
      {isLoading && videos?.length > 0 && (
        <div className="py-4 sm:py-8">
          <HomeSkeleton rows={1} />
        </div>
      )}

      {!hasNextPage && videos?.length > 0 && (
        <div className="text-center py-4 sm:py-8 text-gray-400">
          <p className="text-sm sm:text-base">You've reached the end</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
