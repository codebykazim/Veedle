import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

function YourVideos() {
  return (
    <div className="bg-[#051622] min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#00ed64]">Your Videos</h1>
          <Button className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622] flex items-center gap-2">
            <Upload size={16} />
            Upload Video
          </Button>
        </div>

        <div className="bg-[#072331] rounded-xl p-16 text-center border border-[#1e3a47]">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-medium mb-2">No videos uploaded yet</h2>
            <p className="text-gray-400 mb-6">
              Your uploaded videos will appear here. Start creating and sharing your content with the world.
            </p>
            <Button className="bg-[#00ed64] hover:bg-[#00c050] text-[#051622]">Upload Your First Video</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourVideos
