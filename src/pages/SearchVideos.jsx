"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NoVideosFound, VideoList } from "../components"
// import HomeSkeleton from "../skeleton/HomeSkeleton"
import { getAllVideos, makeVideosNull } from "../store/videoSlice"
import { Filter, X } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading)
  const videos = useSelector((state) => state.video?.videos)
  const dispatch = useDispatch()
  const { query } = useParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchParams, setSearchParms] = useSearchParams()

  useEffect(() => {
    const sortType = searchParams.get("sortType")
    const sortBy = searchParams.get("sortBy")
    dispatch(
      getAllVideos({
        query,
        sortBy,
        sortType,
      }),
    )
    return () => dispatch(makeVideosNull())
  }, [dispatch, query, searchParams])

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParms({ sortBy: newSortBy, sortType: newSortType })
    setFilterOpen(false)
  }

  if (videos?.totalDocs === 0) {
    return <NoVideosFound text={"Try searching something else"} />
  }

  // if (loading) {
  //   return <HomeSkeleton />
  // }

  return (
    <div className="w-full text-white">
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between border-b border-slate-800">
        <h1 className="text-lg font-medium">
          Search results for <span className="text-purple-400">"{query}"</span>
        </h1>
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-sm transition-colors"
          onClick={() => setFilterOpen(true)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="bg-black border border-slate-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Search Filters</DialogTitle>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setFilterOpen(false)}
            >
              <X size={18} />
            </button>
          </DialogHeader>

          <div className="p-2">
            <h3 className="font-medium border-b border-slate-700 pb-2 mb-3">Sort By</h3>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => handleSortParams("createdAt", "desc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>Upload date (Latest)</span>
                {searchParams.get("sortBy") === "createdAt" && searchParams.get("sortType") === "desc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
              <button
                onClick={() => handleSortParams("createdAt", "asc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>Upload date (Oldest)</span>
                {searchParams.get("sortBy") === "createdAt" && searchParams.get("sortType") === "asc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
              <button
                onClick={() => handleSortParams("views", "asc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>View count (Low to High)</span>
                {searchParams.get("sortBy") === "views" && searchParams.get("sortType") === "asc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
              <button
                onClick={() => handleSortParams("views", "desc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>View count (High to Low)</span>
                {searchParams.get("sortBy") === "views" && searchParams.get("sortType") === "desc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
              <button
                onClick={() => handleSortParams("duration", "asc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>Duration (Low to High)</span>
                {searchParams.get("sortBy") === "duration" && searchParams.get("sortType") === "asc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
              <button
                onClick={() => handleSortParams("duration", "desc")}
                className="w-full text-left py-2 px-3 hover:bg-slate-800 rounded-md transition-colors flex justify-between items-center"
              >
                <span>Duration (High to Low)</span>
                {searchParams.get("sortBy") === "duration" && searchParams.get("sortType") === "desc" && (
                  <span className="text-purple-400">✓</span>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4 text-white">
        {videos &&
          videos?.docs?.map((video) => (
            <VideoList
              key={video?._id}
              thumbnail={video?.thumbnail?.url}
              duration={video?.duration}
              title={video?.title}
              views={video?.views}
              avatar={video?.ownerDetails?.avatar?.url}
              channelName={video?.ownerDetails?.username}
              createdAt={video?.createdAt}
              videoId={video?._id}
            />
          ))}
      </div>
    </div>
  )
}

export default SearchVideos
