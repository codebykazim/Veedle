import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../store/subscriptionSlice";
import { timeAgo } from "../helpers/timeAgo";
import { Like, Dislike } from "./index";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

function Description({
  title,
  views,
  createdAt,
  channelName,
  avatar,
  subscribersCount,
  likesCount,
  dislikesCount,
  isSubscribed,
  description,
  isLiked,
  isDisliked,
  videoId,
  channelId,
}) {
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
  const [localSubscribersCount, setLocalSubscribersCount] =
    useState(subscribersCount);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const user = useSelector((state) => state.auth?.userData?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalSubscribersCount(subscribersCount);
    setLocalIsSubscribed(isSubscribed);
  }, [subscribersCount, isSubscribed]);

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId));
    setLocalIsSubscribed((prev) => !prev);
    if (localIsSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1);
    } else {
      setLocalSubscribersCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-4 text-white">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <div>
            <span>{views} views</span>
            <span className="mx-2">•</span>
            <span>{timeAgo(createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Like
              isLiked={isLiked}
              videoId={videoId}
              likesCount={likesCount}
              size={20}
            />
            <Dislike
              isDisliked={isDisliked}
              videoId={videoId}
              dislikesCount={dislikesCount}
              size={20}
            />
          </div>
        </div>
      </div>

      {description && (
        <div className="bg-[#0d3446] rounded-lg p-4 text-sm text-gray-300 border border-[#1e3a47]">
          <div
            className={`whitespace-pre-line ${
              showFullDescription ? "" : "line-clamp-1"
            }`}
          >
            {description}
          </div>
          {description.split("\n").length > 1 || description.length > 100 ? (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              {showFullDescription ? "Show less" : "Show more..."}
            </button>
          ) : null}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#1e3a47]">
        <Link
          to={`/channel/${channelName}/videos`}
          className="flex items-center gap-3 group"
        >
          <Avatar src={avatar} channelName={channelName} size="md" />
          <div>
            <p className="font-medium group-hover:text-[#00ed64] transition-colors">
              {channelName}
            </p>
            <p className="text-xs text-gray-400">
              {localSubscribersCount} subscribers
            </p>
          </div>
        </Link>
        <div>
          {/* Show subscribe button only if the logged-in user is not the channel owner */}
          {user !== channelId && (
            <Button
              onClick={handleSubscribe}
              className={`rounded-md px-4 py-1.5 font-medium transition-all ${
                localIsSubscribed
                  ? "bg-[#0d3446] hover:bg-[#164863] text-white"
                  : "bg-[#00ed64] hover:bg-[#00c050] text-[#051622]"
              }`}
            >
              {localIsSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;
