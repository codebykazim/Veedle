"use client"

const HeaderSkeleton = () => {
  return (
    <div className="w-full text-white">
      {/* Cover Image */}
      <div className="w-full sm:h-40 h-28 bg-[#072331]" />

      {/* Channel Info */}
      <div className="w-full sm:px-5 p-2 flex flex-col sm:flex-row items-start gap-4 relative">
        {/* Avatar */}
        <div className="sm:w-37 w-28 sm:h-32 h-28 sm:-mt-16 -mt-12 rounded-full bg-[#0d3446] border-2 border-[#051622]" />

        {/* Info block */}
        <div className="w-full px-1 mt-2 sm:mt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
            {/* Name, username, stats */}
            <div className="space-y-2">
              <div className="h-6 w-40 bg-[#0d3446] rounded" />
              <div className="h-4 w-24 bg-[#0d3446] rounded" />
              <div className="flex gap-3">
                <div className="h-3 w-20 bg-[#0d3446] rounded" />
                <div className="h-3 w-24 bg-[#0d3446] rounded" />
              </div>
            </div>

            {/* Button */}
            <div className="h-8 w-24 bg-[#00ed64]/30 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSkeleton
