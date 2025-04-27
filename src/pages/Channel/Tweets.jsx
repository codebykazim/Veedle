import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTweets } from "../../store/tweetSlice";
import TweetAndComment from "@/components/TweetAndComment";
import TweetsList from "@/components/TweetsList";
import {
  TweetAndCommentSkeleton,
  TweetsListSkeleton,
} from "../../skeleton/TweetAndCommentSkeleton";

function ChannelTweets() {
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.auth?.userData?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);
  const loading = useSelector((state) => state.tweet?.loading);

  useEffect(() => {
    if (userId) dispatch(getUserTweets(userId));
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="bg-[#072331] rounded-xl border border-[#1e3a47] p-4 shadow-lg">
        {authId === userId && <TweetAndCommentSkeleton />}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <TweetsListSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#072331] rounded-xl border border-[#1e3a47] shadow-lg overflow-hidden mt-5 m-1 sm:m-6">
      {authId === userId && (
        <div className="p-4 border-b border-[#1e3a47]">
          <TweetAndComment tweet={true} />
        </div>
      )}
      <div className="divide-y divide-[#1e3a47]">
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
          <div className="text-center p-8 text-gray-400">
            <p className="text-lg">No tweets yet. Start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChannelTweets;
