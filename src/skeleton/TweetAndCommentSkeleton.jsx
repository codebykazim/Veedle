// Skeleton for TweetAndComment (Matching PlaylistSkeleton style)
export const TweetAndCommentSkeleton = () => (
    <div className="bg-slate-800 p-4 rounded-xl w-full mb-5 border border-slate-700 animate-pulse">
      <div className="h-5 bg-slate-700 w-1/3 rounded mb-3"></div>
      <div className="h-4 bg-slate-700 w-full rounded mb-4"></div>
      <div className="h-3 bg-slate-700 w-1/4 rounded"></div>
    </div>
  );

  // Skeleton for TweetsList (Matching PlaylistSkeleton style)
  export const TweetsListSkeleton = () => (
    <div className="w-full bg-slate-800 rounded-lg p-4 mb-5 border border-slate-700 animate-pulse">
      <div className="flex gap-4">
        <div className="h-10 w-10 bg-slate-700 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-700 w-1/3 rounded"></div>
          <div className="h-5 bg-slate-700 w-2/3 rounded"></div>
          <div className="h-3 bg-slate-700 w-1/4 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Full Tweets Page Skeleton (Like PlaylistSkeleton)
  export const TweetsSkeleton = () => (
    <div className="w-full relative text-white sm:px-5 px-0">
      {/* Tweet Composer Skeleton */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-5 animate-pulse">
        <div className="h-5 bg-slate-700 w-1/4 rounded mb-4"></div>
        <div className="h-20 bg-slate-700 rounded mb-4"></div>
        <div className="h-10 bg-slate-700 w-24 rounded ml-auto"></div>
      </div>

      {/* Tweets List Skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <TweetsListSkeleton key={i} />
        ))}
      </div>
    </div>
  );