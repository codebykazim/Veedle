"use client"

export function PlaylistSkeleton() {
  return (
    <div className="w-full relative text-white sm:px-5 px-0">
      {/* Empty state skeleton */}
      <div className="text-center py-16 flex flex-col justify-center items-center animate-pulse">
        <div className="bg-[#072331] p-6 rounded-lg border border-[#1e3a47] max-w-md w-full">
          <div className="h-6 w-3/4 bg-[#0d3446] rounded mx-auto mb-4"></div>
          <div className="h-4 w-5/6 bg-[#0d3446] rounded mx-auto"></div>
        </div>
      </div>

      {/* Create Playlist Button Skeleton */}
      <div className="w-full flex justify-center mt-5">
        <div className="h-10 w-40 bg-[#00ed64]/30 rounded-md animate-pulse"></div>
      </div>

      {/* Playlist Grid Skeleton */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 p-4 gap-5 grid-cols-1 w-full mt-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative h-[15rem] w-full border border-[#1e3a47] rounded-lg overflow-hidden bg-[#072331] animate-pulse"
          >
            <div className="absolute inset-0 bg-[#0d3446]/50"></div>
            <div className="absolute flex justify-between bottom-0 left-0 border-t border-[#1e3a47] py-2 px-3 w-full bg-[#072331]">
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-[#0d3446] rounded"></div>
                <div className="h-3 w-24 bg-[#0d3446] rounded"></div>
              </div>
              <div className="h-6 w-12 bg-[#0d3446] rounded-md"></div>
            </div>
            <div className="py-2 px-3 z-10 relative">
              <div className="h-5 w-3/4 bg-[#0d3446] rounded mb-2"></div>
              <div className="h-4 w-full bg-[#0d3446] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton for TweetAndComment
