"use client"

function HomeSkeleton({ rows = 3 }) {
  const loadingSkeletonStyle = "animate-pulse bg-[#072331] h-10 w-full mb-2"

  return (
    <>
      <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {Array.from({ length: rows * 3 }).map((_, index) => (
          <div key={index} className={`${loadingSkeletonStyle} h-56 relative rounded-lg border border-[#1e3a47]`}>
            <div className="absolute bottom-1 border-[#1e3a47] h-12 w-full border-t p-2">
              <div className="absolute bottom-1 w-8 h-8 animate-pulse bg-[#0d3446] rounded-full space-y-2"></div>
              <div>
                <div className="w-3/4 h-3 ml-10 bg-[#0d3446] rounded-sm mt-1"></div>
                <div className="w-3/4 h-3 ml-10 bg-[#0d3446] rounded-sm mt-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomeSkeleton
