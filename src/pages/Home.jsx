import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/videoSlice";
import { VideoList } from "../components";
import HomeSkeleton from "@/skeleton/HomeSkeleton";
import debounce from "lodash.debounce";

// Shuffle helper function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function HomePage() {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);

  const [page, setPage] = useState(1);
  const [shuffledVideos, setShuffledVideos] = useState([]);

  useEffect(() => {
    dispatch(getAllVideos({ page: 1, limit: 6 }));
    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreVideos = useCallback(() => {
    if (loading || !hasNextPage) return;

    dispatch(getAllVideos({ page: page + 1, limit: 6 }))
      .then(() => setPage((prev) => prev + 1))
      .catch(() => {});
  }, [page, hasNextPage, dispatch, loading]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        hasNextPage
      ) {
        fetchMoreVideos();
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreVideos, loading, hasNextPage]);

  // Only shuffle once when new videos are fetched for the first time
  useEffect(() => {
    if (videos && videos.length > 0 && page === 1) {
      const unique = videos.filter(
        (video, index, self) =>
          index === self.findIndex((v) => v._id === video._id)
      );
      setShuffledVideos(shuffleArray(unique));
    } else {
      setShuffledVideos(videos || []);
    }
  }, [videos, page]);

  return (
    <div className="bg-[#051622] min-h-screen px-4 sm:px-6 md:px-10 pt-16 sm:pt-14 sm:ml-60 pb-20 sm:pb-8">
      <h2 className="text-2xl sm:text-xl md:text-2xl font-bold text-white mt-3 mb-5">
        Recommended Videos
      </h2>

      {loading && (!videos || videos.length === 0) && <HomeSkeleton />}

      <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 text-white">
        {(shuffledVideos || []).map((video) => (
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

      {loading && videos?.length > 0 && (
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
  );
}

export default HomePage;
