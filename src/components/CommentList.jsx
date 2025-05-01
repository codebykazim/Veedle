import { useState } from "react";
import { timeAgo } from "../helpers/timeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Like, Dislike, DeleteConfirmation, Edit } from "./index";
import { MoreVertical } from "lucide-react";
import { deleteAComment, editAComment } from "../store/commentSlice";
import Avatar from "./Avatar";

function CommentsList({
  avatar,
  username,
  createdAt,
  content,
  commentId,
  isLiked,
  likesCount,
  dislikesCount,
  isDisliked,
}) {
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar?.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditComment = (editedContent) => {
    dispatch(editAComment({ commentId, content: editedContent }));
    setEditState((prev) => ({
      ...prev,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteComment = () => {
    dispatch(deleteAComment(commentId));
    setEditState((prev) => ({ ...prev, delete: false }));
  };

  return (
    <div className="w-full flex gap-4 p-4 hover:bg-[#0d3446] transition-colors border-b border-[#1e3a47]">
      <Avatar src={avatar || avatar2} channelName={username} size="sm" />

      <div className="flex-1 relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{username}</span>
          <span className="text-xs text-gray-500">{timeAgo(createdAt)}</span>
        </div>

        {editState.editing ? (
          <Edit
            initialContent={editState.editedContent}
            onCancel={() =>
              setEditState((prev) => ({ ...prev, editing: false }))
            }
            onSave={handleEditComment}
          />
        ) : (
          <p className="text-sm text-gray-300 mb-2">
            {editState.editedContent}
          </p>
        )}

        <div className="flex items-center gap-4">
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            commentId={commentId}
            size={16}
          />
          <Dislike
            isDisliked={isDisliked}
            commentId={commentId}
            dislikesCount={dislikesCount}
            size={20}
          />
        </div>

        {authUsername === username && (
          <div className="absolute top-0 right-0">
            <button
              onClick={() =>
                setEditState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
              }
              className="text-gray-400 hover:text-white p-1"
            >
              <MoreVertical size={18} />
            </button>

            {editState.isOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#072331] border border-[#1e3a47] rounded-lg shadow-lg z-10 overflow-hidden">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#0d3446] transition-colors"
                  onClick={() =>
                    setEditState((prev) => ({
                      ...prev,
                      editing: true,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[#0d3446] text-red-400 transition-colors"
                  onClick={() =>
                    setEditState((prev) => ({
                      ...prev,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {editState.delete && (
          <DeleteConfirmation
            onCancel={() =>
              setEditState((prev) => ({ ...prev, delete: false }))
            }
            onDelete={handleDeleteComment}
            comment={true}
          />
        )}
      </div>
    </div>
  );
}

export default CommentsList;
