import React from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MessyDoodle from '../assets/MessyDoodle.svg'

function YourVideos() {
  // Mock state for whether user has videos
  const hasVideos = false

  return (
    <div className="bg-[#121212] min-h-screen ml-60 mt-14 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Videos</h1>

        {!hasVideos && (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src={MessyDoodle}
              alt="No videos available"
              className="mb-6"
              width="200"
            />

            <p className="text-lg text-gray-400 mb-2">No videos uploaded yet</p>
            <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
              Your uploaded videos will appear here. Start creating and sharing your content.
            </p>

            <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2 rounded-full flex items-center gap-2">
              <Upload size={18} />
              Upload videos
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default YourVideos