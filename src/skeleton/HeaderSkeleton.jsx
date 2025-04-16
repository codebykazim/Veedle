import React from "react"

const HeaderSkeleton = () => {
  return (
    <div className="w-full text-white ">
      {/* Cover Image */}
      <div className="w-full sm:h-40 h-28 bg-gray-800" />

      {/* Channel Info */}
      <div className="w-full sm:px-5 p-2 flex flex-col sm:flex-row items-start gap-4 relative">
        {/* Avatar */}
        <div className="sm:w-37 w-28 sm:h-32 h-28 sm:-mt-16 -mt-12 rounded-full bg-gray-700 border-2 border-black" />

        {/* Info block */}
        <div className="w-full px-1 mt-2 sm:mt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
            {/* Name, username, stats */}
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-600 rounded" />
              <div className="flex gap-3">
                <div className="h-3 w-20 bg-gray-600 rounded" />
                <div className="h-3 w-24 bg-gray-600 rounded" />
              </div>
            </div>

            {/* Button */}
            <div className="h-8 w-24 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSkeleton
