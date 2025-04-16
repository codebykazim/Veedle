import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

function YourVideos() {
  return (
    <div className="bg-[#121212] min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Videos</h1>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2">
            <Upload size={16} />
            Upload Video
          </Button>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-16 text-center border border-slate-700">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-2">No videos uploaded yet</h2>
            <p className="text-gray-400 mb-6">
              Your uploaded videos will appear here. Start creating and sharing your content with the world.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">Upload Your First Video</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourVideos
