export default function Card({ title, image, avatar, channel, views, time }) {
    return (
      <div className="w-full">
        {/* Thumbnail Container - 16:9 aspect ratio */}
        <div className="relative group">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
              1:37
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex mt-3 gap-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            <img
              src={avatar || "/avatar-placeholder.png"}
              alt={channel}
              className="w-9 h-9 rounded-full"
            />
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h3 className="text-[15px] font-medium text-white line-clamp-2 leading-5 mb-1">
              {title}
            </h3>
            <div className="flex flex-col text-[13px] text-gray-400">
              <span className="hover:text-white cursor-pointer">{channel}</span>
              <div>
                <span>{views} views</span>
                <span className="mx-1">•</span>
                <span>{time} ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }