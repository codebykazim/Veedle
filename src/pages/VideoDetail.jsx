"use client"

import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getVideoById } from "../store/videoSlice"
import { CommentList, TweetAndComment, Video, Description, Spinner, InfiniteScroll, Navbar } from "../components"
import { cleanUpComments, getVideoComments } from "../store/commentSlice"

function VideoDetail() {
  const dispatch = useDispatch()
  const { videoId } = useParams()
  const video = useSelector((state) => state.video?.video)
  const comments = useSelector((state) => state.comment?.comments)
  const totalComments = useSelector((state) => state.comment?.totalComments)
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage)
  const loading = useSelector((state) => state.comment?.loading)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }))
      dispatch(getVideoComments({ videoId }))
    }

    return () => dispatch(cleanUpComments())
  }, [dispatch, videoId])

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }))
      setPage((prev) => prev + 1)
    }
  }, [page, loading, hasNextPage, dispatch, videoId])

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4">
        <div className="pt-4">
          <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
        </div>

        <div className="mt-4">
          <Description
            avatar={video?.owner?.avatar}
            channelName={video?.owner?.username}
            createdAt={video?.createdAt}
            description={video?.description}
            isSubscribed={video?.owner?.isSubscribed}
            likesCount={video?.likesCount}
            subscribersCount={video?.owner?.subscribersCount}
            title={video?.title}
            views={video?.views}
            key={video?._id}
            isLiked={video?.isLiked}
            videoId={video?._id}
            channelId={video?.owner?._id}
          />
        </div>

        <div className="mt-6">
          <div className="text-white font-semibold px-2 py-2 border-b border-slate-800">{totalComments} Comments</div>

          <TweetAndComment comment={true} videoId={video?._id} />

          <InfiniteScroll fetchMore={fetchMoreComments} hasNextPage={hasNextPage}>
            <div className="w-full">
              {comments?.map((comment) => (
                <CommentList
                  key={comment?._id}
                  avatar={comment?.owner?.avatar?.url}
                  commentId={comment?._id}
                  content={comment?.content}
                  createdAt={comment?.createdAt}
                  fullName={comment?.owner?.fullName}
                  isLiked={comment?.isLiked}
                  likesCount={comment?.likesCount}
                  username={comment?.owner?.username}
                />
              ))}
              {loading && (
                <div className="w-full flex justify-center items-center py-4">
                  <Spinner width={10} />
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
