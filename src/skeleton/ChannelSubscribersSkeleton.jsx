"use client"

const ChannelSubscribersSkeleton = () => (
  <div className="divide-y divide-[#1e3a47]">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="flex px-4 py-3 justify-between items-center text-white hover:bg-[#0d3446]/30 transition-colors animate-pulse"
      >
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 bg-[#0d3446] rounded-full"></div>
          <div>
            <div className="h-4 bg-[#0d3446] w-24 mb-2"></div>
            <div className="h-3 bg-[#0d3446] w-16"></div>
          </div>
        </div>
        <div>
          <div className="h-8 w-20 bg-[#00ed64]/30 rounded-md"></div>
        </div>
      </div>
    ))}
  </div>
)

export default ChannelSubscribersSkeleton
