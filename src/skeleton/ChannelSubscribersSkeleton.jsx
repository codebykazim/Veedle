const ChannelSubscribersSkeleton = () => (
    <div className="divide-y divide-slate-700">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex px-4 py-3 justify-between items-center text-white hover:bg-slate-800/30 transition-colors animate-pulse">
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
            <div>
              <div className="h-4 bg-gray-600 w-24 mb-2"></div>
              <div className="h-3 bg-gray-600 w-16"></div>
            </div>
          </div>
          <div>
            <div className="h-8 w-20 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  export default ChannelSubscribersSkeleton;
