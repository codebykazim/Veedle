import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThumbsUp, ThumbsDown } from "lucide-react";

import {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
} from "../store/likeSlice";
import {
  toggleVideoDislike,
  toggleCommentDislike,
  toggleTweetDislike,
} from "../store/dislikeSlice";

function LikeDislike({
  isLiked,
  isDisliked,
  likesCount = 0,
  dislikesCount = 0,
  tweetId,
  commentId,
  videoId,
  size = 20,
}) {
  const dispatch = useDispatch();

  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localIsDisliked, setLocalIsDisliked] = useState(isDisliked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikesCount);

  const handleLike = () => {
    if (localIsLiked) {
      setLocalIsLiked(false);
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalIsLiked(true);
      setLocalLikesCount((prev) => prev + 1);

      if (localIsDisliked) {
        setLocalIsDisliked(false);
        setLocalDislikesCount((prev) => prev - 1);
        dispatchDislike(); // Remove dislike
      }
    }
    dispatchLike();
  };

  const handleDislike = () => {
    if (localIsDisliked) {
      setLocalIsDisliked(false);
      setLocalDislikesCount((prev) => prev - 1);
    } else {
      setLocalIsDisliked(true);
      setLocalDislikesCount((prev) => prev + 1);

      if (localIsLiked) {
        setLocalIsLiked(false);
        setLocalLikesCount((prev) => prev - 1);
        dispatchLike(); // Remove like
      }
    }
    dispatchDislike();
  };

  const dispatchLike = () => {
    if (videoId) dispatch(toggleVideoLike(videoId));
    else if (tweetId) dispatch(toggleTweetLike(tweetId));
    else if (commentId) dispatch(toggleCommentLike(commentId));
  };

  const dispatchDislike = () => {
    if (videoId) dispatch(toggleVideoDislike(videoId));
    else if (tweetId) dispatch(toggleTweetDislike(tweetId));
    else if (commentId) dispatch(toggleCommentDislike(commentId));
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalIsDisliked(isDisliked);
    setLocalLikesCount(likesCount);
    setLocalDislikesCount(dislikesCount);
  }, [isLiked, isDisliked, likesCount, dislikesCount]);

  return (
    <div className="flex items-center gap-4">
      <button onClick={handleLike} className="flex items-center gap-1 group">
        <ThumbsUp
          size={size}
          className={`cursor-pointer transition-colors ${
            localIsLiked ? "text-[#00ed64]" : "group-hover:text-gray-300"
          }`}
        />
        <span
          className={`text-xs ${
            localIsLiked ? "text-[#00ed64]" : "text-gray-400"
          }`}
        >
          {localLikesCount}
        </span>
      </button>

      <button onClick={handleDislike} className="flex items-center gap-1 group">
        <ThumbsDown
          size={size}
          className={`cursor-pointer transition-colors ${
            localIsDisliked ? "text-red-500" : "group-hover:text-gray-300"
          }`}
        />
        <span
          className={`text-xs ${
            localIsDisliked ? "text-red-500" : "text-gray-400"
          }`}
        >
          {localDislikesCount}
        </span>
      </button>
    </div>
  );
}

export default LikeDislike;
