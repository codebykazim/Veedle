import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThumbsDown } from "lucide-react";
import {
  toggleCommentDislike,
  toggleTweetDislike,
  toggleVideoDislike,
} from "../store/dislikeSlice";

function Dislike({
  isDisliked,
  dislikesCount = 0,
  tweetId,
  commentId,
  videoId,
  size,
}) {
  const dispatch = useDispatch();
  const [localIsDisliked, setLocalIsDisliked] = useState(isDisliked);
  const [localDislikesCount, setLocalDislikesCount] = useState(dislikesCount);

  const handleDislikeToggle = () => {
    if (localIsDisliked) {
      setLocalDislikesCount((prev) => prev - 1);
    } else {
      setLocalDislikesCount((prev) => prev + 1);
    }

    setLocalIsDisliked((prev) => !prev);

    if (tweetId) {
      dispatch(toggleTweetDislike(tweetId));
    }
    if (commentId) {
      dispatch(toggleCommentDislike(commentId));
    }
    if (videoId) {
      dispatch(toggleVideoDislike(videoId));
    }
  };

  useEffect(() => {
    setLocalIsDisliked(isDisliked);
    setLocalDislikesCount(dislikesCount);
  }, [isDisliked, dislikesCount]);

  return (
    <button
      onClick={handleDislikeToggle}
      className="flex items-center gap-1 group"
    >
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
  );
}

export default Dislike;
