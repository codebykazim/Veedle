function LikedVideosSkeleton() {
  const placeholders = Array.from({ length: 5 })

  return (
    <div className="bg-[#121212] min-h-screen sm:ml-60 mt-14 text-white px-2 sm:px-0 pb-16 sm:pb-6">
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 p-2 sm:p-3 md:p-6">
        {/* Left Panel Skeleton - Full width on mobile, fixed width on desktop */}
        <div className="w-full md:w-[300px] h-auto md:h-full md:sticky md:top-16 p-3 border border-[#5f5d5d] bg-[#1e1e1e] rounded-md">
          <div className="w-full h-36 sm:h-32 md:h-40 bg-[#2b2b2b] rounded-lg mb-3 md:mb-4" />
          <div className="h-4 bg-[#333] rounded w-2/3 mb-2" />
          <div className="h-3 bg-[#2c2c2c] rounded w-1/3 mb-1 sm:mb-2" />
          <div className="h-3 bg-[#2c2c2c] rounded w-1/4 mb-3 sm:mb-4" />
          <div className="flex gap-2 mb-1 sm:mb-0">
            <div className="w-16 sm:w-20 h-7 sm:h-8 bg-[#3a3a3a] rounded-full" />
            <div className="w-16 sm:w-20 h-7 sm:h-8 bg-[#3a3a3a] rounded-full hidden sm:block" />
            <div className="w-7 sm:w-8 h-7 sm:h-8 bg-[#3a3a3a] rounded-full ml-auto" />
          </div>
        </div>

        {/* Right Panel Skeleton - Responsive sizing */}
        <div className="flex-1 space-y-2 mt-3 md:mt-0">
          {placeholders.map((_, idx) => (
            <div key={idx} className="flex gap-2 sm:gap-4 p-2 bg-[#1d1d1d] rounded-lg">
              <div className="w-5 sm:w-6 md:w-8 h-4 sm:h-5 bg-[#2a2a2a] rounded flex-shrink-0 self-center" />
              <div className="w-32 sm:w-32 md:w-40 h-20 sm:h-20 md:h-24 bg-[#2c2c2c] rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1 sm:space-y-2 pr-1">
                <div className="h-3 sm:h-4 bg-[#333] rounded w-full sm:w-3/4" />
                <div className="h-2 sm:h-3 bg-[#2c2c2c] rounded w-1/2" />
                <div className="flex gap-1 sm:gap-2 items-center">
                  <div className="h-2 sm:h-3 bg-[#2c2c2c] rounded w-1/4" />
                  <div className="h-2 sm:h-3 bg-[#2c2c2c] rounded w-1" />
                  <div className="h-2 sm:h-3 bg-[#2c2c2c] rounded w-1/4" />
                </div>
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#3a3a3a] rounded-full flex-shrink-0 self-start" />
            </div>
          ))}
          {/* Extra padding element to ensure last item is fully visible */}
          <div className="h-4 md:hidden"></div>
        </div>
      </div>
    </div>
  )
}

export default LikedVideosSkeleton
