import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import { getAllVideos, makeVideosNull } from "../store/videoSlice";
import { Filter, X } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HomeSkeleton from "@/skeleton/HomeSkeleton";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.videos?.docs);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParms] = useSearchParams();

  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    const page = 1;
    const limit = 50;

    dispatch(getAllVideos({ query, sortBy, sortType, page, limit }));
    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParms({ sortBy: newSortBy, sortType: newSortType });
    setFilterOpen(false);
  };

  const uniqueVideos = videos?.filter(
    (video, index, self) => index === self.findIndex((v) => v._id === video._id)
  );

  return (
    <div className="bg-[#051622] min-h-screen px-4 sm:px-8 pt-16 sm:pt-17 sm:ml-60 pb-20 sm:pb-8 text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-1">
        <h1 className="text-xl font-semibold">
          Search results for <span className="text-[#00ed64]">"{query}"</span>
        </h1>
        {/* <button
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0d3446] hover:bg-[#164863] rounded-md text-sm transition-colors"
          onClick={() => setFilterOpen(true)}
        >
          <Filter size={16} />
          <span>Filters</span>
        </button> */}
      </div>

      {/* Filter Dialog */}
      {/* <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="bg-[#072331] border border-[#1e3a47] text-white sm:max-w-md">
          <DialogHeader className="border-b border-[#1e3a47] pb-4">
            <DialogTitle className="text-xl font-bold flex justify-between items-center">
              Search Filters
              <button
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setFilterOpen(false)}
              >
                <X size={18} />
              </button>
            </DialogTitle>
          </DialogHeader>

          <div className="p-2">
            <h3 className="font-medium text-[15px] border-b border-[#1e3a47] pb-2 mb-3">
              Sort By
            </h3>
            <div className="space-y-1 text-sm">
              {[
                {
                  label: "Upload date (Latest)",
                  value: "createdAt",
                  type: "desc",
                },
                {
                  label: "Upload date (Oldest)",
                  value: "createdAt",
                  type: "asc",
                },
                {
                  label: "View count (High to Low)",
                  value: "views",
                  type: "desc",
                },
                {
                  label: "View count (Low to High)",
                  value: "views",
                  type: "asc",
                },
                {
                  label: "Duration (Longest)",
                  value: "duration",
                  type: "desc",
                },
                {
                  label: "Duration (Shortest)",
                  value: "duration",
                  type: "asc",
                },
              ].map((option) => (
                <button
                  key={`${option.value}-${option.type}`}
                  onClick={() => handleSortParams(option.value, option.type)}
                  className={`w-full text-left py-2 px-3 rounded-md transition-colors flex justify-between items-center
                    ${
                      searchParams.get("sortBy") === option.value &&
                      searchParams.get("sortType") === option.type
                        ? "bg-[#0d3446] text-[#00ed64]"
                        : "hover:bg-[#0d3446]"
                    }`}
                >
                  <span>{option.label}</span>
                  {searchParams.get("sortBy") === option.value &&
                    searchParams.get("sortType") === option.type && (
                      <span className="text-[#00ed64]">✓</span>
                    )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* Skeleton Loader */}
      {loading && <HomeSkeleton rows={2} />}

      {/* Video Grid */}
      {!loading && (!uniqueVideos || uniqueVideos.length === 0) ? (
        <NoVideosFound text={"Try searching something else"} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-4 sm:gap-x-4 sm:gap-y-3 mt-4">
          {uniqueVideos?.map((video) => (
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
              className="hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchVideos;
