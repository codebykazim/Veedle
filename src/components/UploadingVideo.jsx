"use client"

import { PiFilmReelFill } from "react-icons/pi"
import { Spinner } from "./index"
import { Button } from "./ui/button"
import { IoCloseCircleOutline, TiTick } from "./icons"
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
      <div className="w-full max-w-md p-5 text-white border rounded-xl border-slate-700 bg-black shadow-xl">
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
            <IoCloseCircleOutline size={25} />
          </button>
        </div>

        <div className="border border-slate-700 rounded-lg flex items-center p-3 mb-5 bg-slate-900/50">
          <div className="mr-3 flex-shrink-0">
            <PiFilmReelFill size={30} className="text-purple-500" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold truncate">{videoFileName}</h1>
            <p className="text-xs text-slate-400">{fileSize} MB</p>
            <div className="flex gap-2 items-center mt-2">
              {uploaded ? (
                <span className="text-xs flex items-center text-green-400">
                  <TiTick size={20} className="text-green-400 mr-1" />
                  Uploaded Successfully
                </span>
              ) : (
                <span className="text-xs flex items-center text-purple-400">
                  <Spinner className="mr-2" />
                  Uploading...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 border border-slate-700 hover:bg-slate-800 text-white transition-colors"
            onClick={handleCancelAndFinish}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white transition-colors"
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
