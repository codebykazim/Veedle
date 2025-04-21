"use client"

import { Film } from "lucide-react"
import { Spinner } from "./index"
import { Button } from "./ui/button"
import { X, CheckCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { updateUploadState } from "../store/videoSlice"

function UploadingVideo({ videoFileName, fileSize, setUploadVideoPopup, uploaded }) {
  const dispatch = useDispatch()

  const handleCancelAndFinish = () => {
    setUploadVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
    }))
    dispatch(updateUploadState())
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-200">
      <div className="w-full max-w-md p-5 text-white border rounded-xl border-[#1e3a47] bg-[#072331] shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold">{uploaded ? "Uploaded Video" : "Uploading Video..."}</h1>
            <span className="text-xs text-slate-400">Track your video uploading process.</span>
          </div>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={handleCancelAndFinish}
            aria-label="Close"
          >
            <X size={25} />
          </button>
        </div>

        <div className="border border-[#1e3a47] rounded-lg flex items-center p-3 mb-5 bg-[#0d3446]/50">
          <div className="mr-3 flex-shrink-0">
            <Film size={30} className="text-[#00ed64]" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold truncate">{videoFileName}</h1>
            <p className="text-xs text-slate-400">{fileSize} MB</p>
            <div className="flex gap-2 items-center mt-2">
              {uploaded ? (
                <span className="text-xs flex items-center text-[#00ed64]">
                  <CheckCircle size={20} className="text-[#00ed64] mr-1" />
                  Uploaded Successfully
                </span>
              ) : (
                <span className="text-xs flex items-center text-[#00ed64]">
                  <Spinner className="mr-2" />
                  Uploading...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 border border-[#1e3a47] hover:bg-[#0d3446] text-white transition-colors"
            onClick={handleCancelAndFinish}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-[#00ed64] hover:bg-[#00c050] text-[#051622] transition-colors"
            onClick={handleCancelAndFinish}
          >
            {uploaded ? "Finish" : "Close"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UploadingVideo
