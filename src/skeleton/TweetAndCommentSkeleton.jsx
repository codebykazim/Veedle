export const TweetAndCommentSkeleton = () => (
  <div className="bg-[#072331] p-4 rounded-lg w-full mb-5 border border-[#1e3a47] animate-pulse">
    <div className="h-5 bg-[#0d3446] w-1/3 rounded mb-3"></div>
    <div className="h-4 bg-[#0d3446] w-full rounded mb-4"></div>
    <div className="h-3 bg-[#0d3446] w-1/4 rounded"></div>
  </div>
)

// Skeleton for TweetsList
export const TweetsListSkeleton = () => (
  <div className="w-full bg-[#072331] rounded-lg p-4 mb-5 border border-[#1e3a47] animate-pulse">
    <div className="flex gap-4">
      <div className="h-10 w-10 bg-[#0d3446] rounded-full"></div>
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-[#0d3446] w-1/3 rounded"></div>
        <div className="h-5 bg-[#0d3446] w-2/3 rounded"></div>
        <div className="h-3 bg-[#0d3446] w-1/4 rounded"></div>
      </div>
    </div>
  </div>
)

// Full Tweets Page Skeleton
export const TweetsSkeleton = () => (
  <div className="w-full relative text-white sm:px-5 px-0">
    {/* Tweet Composer Skeleton */}
    <div className="bg-[#072331] p-4 rounded-lg border border-[#1e3a47] mb-5 animate-pulse">
      <div className="h-5 bg-[#0d3446] w-1/4 rounded mb-4"></div>
      <div className="h-20 bg-[#0d3446] rounded mb-4"></div>
      <div className="h-10 bg-[#00ed64]/30 w-24 rounded-md ml-auto"></div>
    </div>

    {/* Tweets List Skeleton */}
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <TweetsListSkeleton key={i} />
      ))}
    </div>
  </div>
)
