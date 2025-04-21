"use client"

import { useState } from "react"

function Edit({ initialContent, onCancel, onSave }) {
  const [editedContent, setEditedContent] = useState(initialContent)

  const handleSave = () => {
    onSave(editedContent)
  }

  return (
    <div className="w-full text-sm">
      <input
        className="bg-[#0d3446] outline-none border-b border-[#1e3a47] w-3/4 p-2 focus:border-[#00ed64] transition-colors rounded-md"
        value={editedContent}
        autoFocus
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className="space-x-4 mt-3 w-3/4 inline-flex justify-end items-center">
        <button
          className="bg-[#0d3446] py-1.5 px-4 font-normal rounded-md hover:bg-[#164863] transition-colors cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[#00ed64] py-1.5 px-4 font-normal rounded-md hover:bg-[#00c050] transition-colors cursor-pointer text-[#051622]"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default Edit
