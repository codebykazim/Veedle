"use client"

import { Trash2 } from "lucide-react"

function DeleteConfirmation({ onCancel, onDelete, comment, tweet, video }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-[#072331] border border-[#1e3a47] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-start gap-4 mb-4">
          <Trash2 size={28} className="text-red-500 mt-1 flex-shrink-0" />
          <div>
            <h1 className="text-xl font-bold mb-2">
              Delete {`${comment ? "Comment" : ""} ${tweet ? "Tweet" : ""} ${video ? "Video" : ""}`}
            </h1>
            <p className="text-gray-400 text-sm">
              Are you sure you want to delete this{" "}
              {`${comment ? "comment" : ""} ${tweet ? "tweet" : ""} ${video ? "video" : ""}`}? Once deleted, you won't
              be able to recover it.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-[#0d3446] hover:bg-[#164863] transition-colors">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
