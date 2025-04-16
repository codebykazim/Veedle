"use client"

export function PlaylistSkeleton() {
  return (
    <div className="w-full relative text-white sm:px-5 px-0">
      {/* Empty state skeleton */}
      <div className="text-center py-16 flex flex-col justify-center items-center animate-pulse">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 max-w-md w-full">
          <div className="h-6 w-3/4 bg-slate-700 rounded mx-auto mb-4"></div>
          <div className="h-4 w-5/6 bg-slate-700 rounded mx-auto"></div>
        </div>
      </div>

      {/* Create Playlist Button Skeleton */}
      <div className="w-full flex justify-center mt-5">
        <div className="h-10 w-40 bg-slate-700 rounded-full animate-pulse"></div>
      </div>

      {/* Playlist Grid Skeleton */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 p-4 gap-5 grid-cols-1 w-full mt-5">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative h-[15rem] w-full border border-slate-700 rounded-lg overflow-hidden bg-slate-800 animate-pulse"
          >
            <div className="absolute inset-0 bg-slate-700"></div>
            <div className="absolute flex justify-between bottom-0 left-0 border-t border-slate-700 py-2 px-3 w-full bg-slate-800">
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 bg-slate-700 rounded"></div>
                <div className="h-3 w-24 bg-slate-700 rounded"></div>
              </div>
              <div className="h-6 w-12 bg-slate-700 rounded-full"></div>
            </div>
            <div className="py-2 px-3 z-10 relative">
              <div className="h-5 w-3/4 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 w-full bg-slate-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}