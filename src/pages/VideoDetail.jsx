import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, getAllVideos } from "../store/videoSlice";
import {
  CommentList,
  TweetAndComment,
  Video,
  Description,
  Spinner,
  InfiniteScroll,
  Navbar,
  VideoList,
} from "../components";
import { cleanUpComments, getVideoComments } from "../store/commentSlice";

function VideoDetail() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const [commentPage, setCommentPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);

  const video = useSelector((state) => state.video?.video);
  const allVideos = useSelector((state) => state.video?.videos?.docs || []);
  const videosLoading = useSelector((state) => state.video?.loading);
  const videosHasNextPage = useSelector(
    (state) => state.video?.videos?.hasNextPage
  );

  const comments = useSelector((state) => state.comment?.comments);
  console.log(comments);

  const totalComments = useSelector((state) => state.comment?.totalComments);
  const commentsHasNextPage = useSelector(
    (state) => state.comment?.hasNextPage
  );
  const commentLoading = useSelector((state) => state.comment?.loading);

  const relatedVideos = allVideos.filter(
    (v, index, self) =>
      v._id !== videoId && self.findIndex((vid) => vid._id === v._id) === index
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComments({ videoId, page: 1 }));
      dispatch(getAllVideos({ page: 1, limit: 15 }));
    }

    return () => {
      dispatch(cleanUpComments());
    };
  }, [dispatch, videoId]);

  const fetchMoreComments = useCallback(() => {
    if (!commentLoading && commentsHasNextPage) {
      const nextPage = commentPage + 1;
      dispatch(getVideoComments({ videoId, page: nextPage }));
      setCommentPage(nextPage);
    }
  }, [commentPage, commentLoading, commentsHasNextPage, dispatch, videoId]);

  const fetchMoreVideos = useCallback(() => {
    if (!videosLoading && videosHasNextPage) {
      const nextPage = videoPage + 1;
      dispatch(getAllVideos({ page: nextPage, limit: 15 }));
      setVideoPage(nextPage);
    }
  }, [videoPage, videosLoading, videosHasNextPage, dispatch]);

  const uniqueComments = comments?.filter(
    (comment, index, self) =>
      self.findIndex((c) => c._id === comment._id) === index
  );

  return (
    <div className="bg-[#051622] min-h-screen text-white">
      <Navbar />

      <div className="max-w-[1800px] mx-auto px-4 pt-16 flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="flex-1 max-w-full lg:max-w-[1100px]">
          {/* Video Player */}
          <div className="w-full bg-black rounded-xl overflow-hidden">
            <Video
              src={video?.videoFile?.url}
              poster={video?.thumbnail?.url}
              className="w-full aspect-video"
            />
          </div>

          {/* Video Metadata */}
          <div className="mt-4">
            <Description
              avatar={video?.owner?.avatar}
              channelName={video?.owner?.username}
              createdAt={video?.createdAt}
              description={video?.description}
              isSubscribed={video?.owner?.isSubscribed}
              likesCount={video?.likesCount}
              dislikesCount={video?.dislikesCount}
              subscribersCount={video?.owner?.subscribersCount}
              title={video?.title}
              views={video?.views}
              isLiked={video?.isLiked}
              isDisliked={video?.isDisliked}
              videoId={video?._id}
              channelId={video?.owner?._id}
            />
          </div>

          {/* Comments Section */}
          <div className=" mt-6">
            <div className="flex items-center gap-2 mb-4 mx-4">
              <h2 className="text-lg font-semibold">
                {totalComments} Comments
              </h2>
            </div>

            <TweetAndComment
              comment={true}
              videoId={video?._id}
              className="mb-4"
            />

            <InfiniteScroll
              fetchMore={fetchMoreComments}
              hasNextPage={commentsHasNextPage}
            >
              <div className="space-y-4">
                {uniqueComments?.map((comment) => (
                  <CommentList
                    key={comment?._id}
                    avatar={comment?.owner?.avatar}
                    commentId={comment?._id}
                    content={comment?.content}
                    createdAt={comment?.createdAt}
                    fullName={comment?.owner?.fullName}
                    isLiked={comment?.isLiked}
                    isDisliked={comment?.isDisliked}
                    likesCount={comment?.likesCount}
                    dislikesCount={comment?.dislikesCount}
                    username={comment?.owner?.username}
                  />
                ))}
                {commentLoading && (
                  <Spinner width={8} className="mx-auto my-4" />
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="w-full lg:w-[350px] shrink-0 space-y-3 mt-0 lg:mt-0">
          <h3 className="font-medium text-[20px] mb-3">Related Videos</h3>

          {videosLoading && videoPage === 1 ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-[168px] h-[94px] bg-[#0d3446] rounded animate-pulse" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3.5 bg-[#0d3446] rounded w-full" />
                    <div className="h-3 bg-[#0d3446] rounded w-3/4" />
                    <div className="h-3 bg-[#0d3446] rounded w-2/3" />
                  </div>
                </div>
              ))
          ) : (
            <>
              {relatedVideos.slice(0, 8).map((video) => (
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
                  compact={true}
                  className="!gap-2 !items-start"
                />
              ))}

              {videosHasNextPage && (
                <button
                  onClick={fetchMoreVideos}
                  disabled={videosLoading}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                >
                  {videosLoading ? "Loading..." : "Load More Videos"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
