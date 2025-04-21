"use client"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { updateAvatar, updateCoverImg } from "../store/authSlice"
import GetImagePreview from "./GetImagePreview"

function EditAvatar({ cover, preImage }) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const upload = (data) => {
    setIsOpen(false)
    const formData = new FormData()
    formData.append(`${cover ? "coverImage" : "avatar"}`, data.avatar[0])

    if (data) {
      const action = cover ? updateCoverImg : updateAvatar
      dispatch(action(formData)).then(() => {
        window.location.reload() // Refresh the page after update
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(upload)} className="relative">
      <Upload
        className="hover:text-[#00ed64] text-white rounded-md bg-[#0d3446] opacity-80 hover:opacity-100 p-1 cursor-pointer transition-all duration-200"
        size={35}
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#072331] p-8 relative border border-[#1e3a47] shadow-lg w-full max-w-md rounded-lg">
            <button
              type="button"
              className="absolute top-5 right-5 text-white hover:text-[#00ed64] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">Change {cover ? "Cover" : "Profile"} Picture</h2>

            <div className="flex flex-col items-center">
              <GetImagePreview
                name={"avatar"}
                control={control}
                cameraIcon
                cameraSize={30}
                className="w-full h-full object-contain min-h-20 max-h-60 bg-[#0d3446] rounded-md"
                image={preImage}
              />

              <button
                type="submit"
                className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] px-4 py-2 mt-4 w-full rounded-md transition-colors"
              >
                Upload
              </button>
            </div>

            {errors.avatar && <span className="text-red-500 block mt-2 text-sm">{errors.avatar.message}</span>}
          </div>
        </div>
      )}
    </form>
  )
}

export default EditAvatar
