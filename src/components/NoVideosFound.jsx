import { FaPlayCircle } from "react-icons/fa"

function NoVideosFound({ text }) {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-[50vh] py-16">
      <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-800 flex flex-col items-center">
        <FaPlayCircle size={60} className="text-purple-500 mb-4" />
        <p className="text-xl font-medium">No videos found</p>
        <p className="text-slate-400 mt-2 text-center max-w-md">
          {text || "There are no videos available here at the moment."}
        </p>
      </div>
    </div>
  )
}

export default NoVideosFound
