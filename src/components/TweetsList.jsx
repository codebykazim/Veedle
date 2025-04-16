"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { timeAgo } from "../helpers/timeAgo"
import Like from "./Like"
import DeleteConfirmation from "./DeleteConfirmation"
import Edit from "./Edit"
import { HiOutlineDotsVertical } from "./icons"
import { deleteTweet, editTweet } from "../store/tweetSlice"

function TweetsList({ tweetId, avatar, username, createdAt, content, likesCount = 0, isLiked }) {
  const avatar2 = useSelector((state) => state.user?.profileData?.avatar)
  const authUsername = useSelector((state) => state.auth?.userData?.username)
  const dispatch = useDispatch()

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  })

  const handleEditTweet = (editedContent) => {
    dispatch(editTweet({ tweetId, content: editedContent }))
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }))
  }

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(tweetId))
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      isOpen: false,
      delete: false,
    }))
  }

  return (
    <div className="text-white w-full flex justify-start items-start sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5 hover:bg-slate-900/30 transition-colors">
      <div className="w-10 flex-shrink-0">
        <img
          src={avatar || avatar2}
          alt={username}
          className="w-8 h-8 object-cover rounded-full border border-slate-700"
        />
      </div>
      <div className="w-full flex flex-col gap-1 relative">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-medium">{username}</h2>
          <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
        </div>

        {/* editing the tweet */}
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
          <p className="text-sm mt-1 break-words">{editState.editedContent}</p>
        )}

        {/* Like the tweet */}
        <div className="mt-2">
          <Like isLiked={isLiked} likesCount={likesCount} tweetId={tweetId} size={20} />
        </div>

        {/* 3 dots */}
        {authUsername == username && (
          <div className="absolute right-0 top-0 cursor-pointer">
            <HiOutlineDotsVertical
              size={18}
              className="hover:text-gray-300 transition-colors"
              onClick={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  isOpen: !prevState.isOpen,
                }))
              }
            />
          </div>
        )}

        {/* edit and delete dropdown */}
        {editState.isOpen && (
          <div className="border bg-[#222222] text-sm border-slate-600 absolute text-center right-0 top-6 rounded-lg overflow-hidden z-10 shadow-lg">
            <ul>
              <li
                className="hover:bg-slate-700 px-5 py-2 cursor-pointer border-b border-slate-600 transition-colors"
                onClick={() =>
                  setEditState((prevState) => ({
                    ...prevState,
                    editing: !prevState.editing,
                    isOpen: false,
                  }))
                }
              >
                Edit
              </li>
              <li
                className="px-5 py-2 hover:bg-slate-700 cursor-pointer transition-colors text-red-400 hover:text-red-300"
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
        )}

        {/* deleting the tweet */}
        {editState.delete && (
          <DeleteConfirmation
            tweet={true}
            onCancel={() =>
              setEditState((prevState) => ({
                ...prevState,
                delete: !prevState.delete,
              }))
            }
            onDelete={handleDeleteTweet}
          />
        )}
      </div>
    </div>
  )
}

export default TweetsList
