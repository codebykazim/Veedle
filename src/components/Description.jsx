import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../store/subscriptionSlice";
import { timeAgo } from "../helpers/timeAgo";
import { LikeDislike } from "./index";
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
    setLocalSubscribersCount((prev) =>
      localIsSubscribed ? prev - 1 : prev + 1
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 space-y-4">
      {/* Video Title and Stats */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-200 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <LikeDislike
            isLiked={isLiked}
            isDisliked={isDisliked}
            likesCount={likesCount}
            dislikesCount={dislikesCount}
            videoId={videoId}
          />
        </div>
      </div>

      {/* Video Description - Transparent with subtle border */}
      {description && (
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-300 dark:text-gray-300 bg-transparent">
          {/* Description Metadata */}
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-300 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>{views} views</span>
              <span>•</span>
              <span>{timeAgo(createdAt)}</span>
            </div>
          </div>

          {/* Description Text */}
          <div
            className={`whitespace-pre-line ${
              showFullDescription ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </div>

          {/* Show More/Less Button */}
          {(description.split("\n").length > 1 || description.length > 100) && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}

      {/* Channel Info */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/channel/${channelName}/videos`}
          className="flex items-center gap-3 group"
        >
          <Avatar src={avatar} channelName={channelName} size="md" />
          <div>
            <p className="font-medium text-gray-200 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {channelName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {localSubscribersCount} subscribers
            </p>
          </div>
        </Link>
        <div>
          {user !== channelId && (
            <Button
              onClick={handleSubscribe}
              className={`rounded-full px-4 py-1.5 font-medium transition-all ${
                localIsSubscribed
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
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
