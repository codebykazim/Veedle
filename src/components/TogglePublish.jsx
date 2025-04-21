"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { togglePublishStatus } from "../store/videoSlice"

function TogglePublish({ videoId, isPublished }) {
  const [isChecked, setIsChecked] = useState(isPublished)
  const dispatch = useDispatch()

  const togglePublishState = () => {
    dispatch(togglePublishStatus(videoId))
    setIsChecked((prev) => !prev)
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={togglePublishState}
        aria-label={isChecked ? "Unpublish video" : "Publish video"}
      />
      <div className="w-11 h-6 bg-[#0d3446] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#00ed64] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-[#1e3a47] peer-checked:bg-[#00ed64]"></div>
      <span className="ml-3 text-sm font-medium text-gray-300">{isChecked ? "Published" : "Unpublished"}</span>
    </label>
  )
}

export default TogglePublish
