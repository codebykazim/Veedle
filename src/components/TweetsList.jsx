import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { timeAgo } from "../helpers/timeAgo";
import Like from "./Like";
import DeleteConfirmation from "./DeleteConfirmation";
import Edit from "./Edit";
import { MoreVertical } from "lucide-react";
import { deleteTweet, editTweet } from "../store/tweetSlice";

function TweetsList({
  tweetId,
  avatar,
  username,
  createdAt,
  content,
  likesCount = 0,
  isLiked,
}) {
  const avatar2 = useSelector((state) => state.user?.profileData?.avatar);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditTweet = (editedContent) => {
    dispatch(editTweet({ tweetId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(tweetId));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      isOpen: false,
      delete: false,
    }));
  };

  return (
    <div className="text-white w-full flex justify-start items-start gap-4 p-4 hover:bg-[#0d3446]/20 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={avatar || avatar2}
          alt={username}
          className="w-10 h-10 object-cover rounded-full border border-[#1e3a47]"
        />
      </div>
      <div className="w-full flex flex-col gap-1 relative">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold hover:underline cursor-pointer">
            {username}
          </h2>
          <span className="text-xs text-gray-400">{timeAgo(createdAt)}</span>
        </div>

        {editState.editing ? (
          <Edit
            initialContent={editState.editedContent}
            onCancel={() =>
              setEditState((prevState) => ({
                ...prevState,
                editing: false,
                isOpen: false,
              }))
            }
            onSave={handleEditTweet}
          />
        ) : (
          <p className="text-sm mt-1 break-words whitespace-pre-line">
            {editState.editedContent}
          </p>
        )}

        <div className="mt-2 flex items-center gap-4">
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            tweetId={tweetId}
            size={20}
          />
        </div>

        {authUsername === username && (
          <div className="absolute right-0 top-0 cursor-pointer group">
            <MoreVertical
              size={18}
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  isOpen: !prevState.isOpen,
                }))
              }
            />
          </div>
        )}

        {editState.isOpen && (
          <div className="absolute right-0 top-6 z-10">
            <div className="bg-[#0d3446] text-sm border border-[#1e3a47] rounded-lg overflow-hidden shadow-xl">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-[#072331] cursor-pointer transition-colors"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      editing: true,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#072331] cursor-pointer transition-colors text-red-400 hover:text-red-300"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </li>
              </ul>
            </div>
          </div>
        )}

        {editState.delete && (
          <DeleteConfirmation
            tweet={true}
            onCancel={() =>
              setEditState((prevState) => ({
                ...prevState,
                delete: false,
              }))
            }
            onDelete={handleDeleteTweet}
          />
        )}
      </div>
    </div>
  );
}

export default TweetsList;
