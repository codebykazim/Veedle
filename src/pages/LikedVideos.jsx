import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLikedVideos } from "../store/likeSlice"
import { makeVideosNull } from "../store/videoSlice"
// import HomeSkeleton from "../skeleton/HomeSkeleton"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import MessyDoodle from "../assets/MessyDoodle.svg"

function LikedVideos() {
  const dispatch = useDispatch()
  const likedVideos = useSelector((state) => state.like?.likedVideos)
  const loading = useSelector((state) => state.like.loading)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getLikedVideos())
    return () => dispatch(makeVideosNull())
  }, [dispatch])

  // if (loading) {
  //   return <HomeSkeleton />
  // }

  const hasVideos = likedVideos && likedVideos.length > 0

  return (
    <div className="bg-[#121212] min-h-screen ml-60 mt-14 text-white">
      {!hasVideos && (
        <div className="flex flex-col items-center justify-center py-16 p-6">
          <img src={MessyDoodle || "/placeholder.svg"} alt="No videos available" className="mb-6" width="200" />
          <p className="text-lg text-gray-400 mb-2">No videos liked yet</p>
          <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
            Your Liked videos will appear here. Start watching content.
          </p>
        </div>
      )}

      {hasVideos && (
        <div className="flex gap-6 p-6">
          {/* Left Panel */}
          <div
            className="w-[300px] h-full sticky top-0 p-3 border-1 border-[#5f5d5d]"
            style={{
              backgroundImage: `url(${likedVideos[0]?.likedVideo?.thumbnail?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>

            <div className="relative z-10">
              <div className="relative w-full h-40">
                <img
                  src={likedVideos[0]?.likedVideo?.thumbnail?.url || "/placeholder.svg"}
                  alt="Featured video"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="mt-3">
                <h1 className="text-white text-lg font-semibold">Liked videos</h1>
                <p className="text-xs text-gray-300">{likedVideos[0]?.likedVideo?.ownerDetails?.username}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {likedVideos.length} videos • Updated recently
                </p>
              </div>

              <div className="flex items-center mt-3 gap-2">
                <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1.5 text-sm">
                  Play all
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-none hover:bg-white/20 rounded-full px-4 py-1.5 text-sm"
                >
                  Shuffle
                </Button>
                <button className="ml-auto text-white/80 hover:text-white">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Video List */}
          <div className="flex-1 space-y-2">
            {likedVideos.map((videoObj, index) => {
              const video = videoObj.likedVideo
              return (
                <div key={video._id} className="flex gap-4 p-2 hover:bg-[#272727] group rounded-lg">
                  <div className="flex items-center w-8 text-center text-gray-400 font-medium">{index + 1}</div>
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <img
                      src={video.thumbnail?.url || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      {video.duration || "0:00"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                    <div className="flex flex-col mt-1 text-xs text-gray-400">
                      <span>{video.ownerDetails?.username}</span>
                      <div className="flex items-center">
                        <span>{video.views} views</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="self-start p-2 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-[#383838]">
                    <MoreVertical size={16} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LikedVideos
