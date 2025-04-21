"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserTweets } from "../../store/tweetSlice"
import TweetAndComment from "@/components/TweetAndComment"
import TweetsList from "@/components/TweetsList"
import { TweetAndCommentSkeleton, TweetsListSkeleton } from "../../skeleton/TweetAndCommentSkeleton"

function ChannelTweets() {
  const dispatch = useDispatch()
  const authId = useSelector((state) => state.auth?.userData?._id)
  const userId = useSelector((state) => state.user?.profileData?._id)
  const tweets = useSelector((state) => state.tweet?.tweets)
  const loading = useSelector((state) => state.tweet?.loading)

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId))
  }, [dispatch, userId])

  // Render skeletons while loading
  if (loading) {
    return (
      <div className="bg-[#072331] rounded-xl border-2 border-[#1e3a47] p-5 shadow-lg">
        {authId === userId && <TweetAndCommentSkeleton />}
        <div>
          {[...Array(5)].map((_, index) => (
            <TweetsListSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Render actual tweets when loading is complete
  return (
    <div className="bg-[#072331] border- border-[#1e3a47] p-5 shadow-lg">
      {authId === userId && <TweetAndComment tweet={true} />}
      {tweets?.length > 0 ? (
        tweets?.map((tweet) => (
          <TweetsList
            key={tweet?._id}
            avatar={tweet?.ownerDetails?.avatar}
            content={tweet?.content}
            createdAt={tweet?.createdAt}
            likesCount={tweet?.likesCount}
            tweetId={tweet?._id}
            username={tweet?.ownerDetails?.username}
            isLiked={tweet?.isLiked}
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No tweets yet. Start the conversation!</p>
        </div>
      )}
    </div>
  )
}

export default ChannelTweets
