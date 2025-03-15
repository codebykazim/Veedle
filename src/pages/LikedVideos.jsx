import { MoreVertical, Play, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import MessyDoodle from "../assets/MessyDoodle.svg"

function LikedVideos() {
  const hasVideos = true;

  const videos = [
    {
      title: "Creating a YouTube Clone with React & Tailwind CSS - Full Tutorial for Beginners",
      image: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      channel: "Channel One",
      views: "3.8M",
      time: "2 months",
    },
    {
      title: "Learn Web Development in 2024 - Complete Roadmap from Beginner to Advanced",
      image: "https://i.ytimg.com/vi/vutosf04gUQ/maxresdefault.jpg",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      channel: "Channel Two",
      views: "1.2M",
      time: "1 week",
    },
    {
      title: "10 Modern JavaScript Features You Should Be Using",
      image:
        "https://images.creativemarket.com/0.1.0/ps/8153948/1820/1214/m1/fpnw/wm0/prev-cm-1-.jpg?1587131055&s=678d97b9e41e456f26c32a3315d711b6",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      channel: "Channel Three",
      views: "890K",
      time: "5 days",
    },
    {
      title: "Building a Responsive Dashboard with Tailwind CSS",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/55ceb7157060263.63726d4260a81.jpg",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      channel: "Channel Four",
      views: "500K",
      time: "3 months",
    },
    {
      title: "Advanced React Patterns and Best Practices",
      image: "https://cdn.dribbble.com/users/6046827/screenshots/17519445/media/0b75715136317979b3ce7ebec343c754.jpg",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      channel: "Channel Five",
      views: "2.1M",
      time: "6 months",
    },
    {
      title: "Advanced React Patterns and Best Practices",
      image: "https://cdn.dribbble.com/users/6046827/screenshots/17519445/media/0b75715136317979b3ce7ebec343c754.jpg",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      channel: "Channel Five",
      views: "2.1M",
      time: "6 months",
    },
    {
      title: "Advanced React Patterns and Best Practices",
      image: "https://cdn.dribbble.com/users/6046827/screenshots/17519445/media/0b75715136317979b3ce7ebec343c754.jpg",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      channel: "Channel Five",
      views: "2.1M",
      time: "6 months",
    },
    {
      title: "Advanced React Patterns and Best Practices",
      image: "https://cdn.dribbble.com/users/6046827/screenshots/17519445/media/0b75715136317979b3ce7ebec343c754.jpg",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      channel: "Channel Five",
      views: "2.1M",
      time: "6 months",
    },
  ]

  return (
    <div className="bg-[#121212] min-h-screen ml-60 mt-14 text-white">
      {!hasVideos && (
        <div className="flex flex-col items-center justify-center py-16 p-6">
          <img src={MessyDoodle || "/placeholder.svg"} alt="No videos available" className="mb-6" width="200" />
          <p className="text-lg text-gray-400 mb-2">No videos liked yet</p>
          <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
            Your Liked videos will appear here. Start watching content.
          </p>
        </div>
      )}

      {hasVideos && (
        <div className="flex gap-6 p-6">
        {/* <div className="flex h-screen"> */}
{/* Left Side (Sticky) */}
<div
  className="w-[300px] h-full sticky top-0 p-3 border-1 border-[#5f5d5d]"
  style={{
    backgroundImage: `url(${videos[0].image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay for blur effect */}
  <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>

  <div className="relative z-10">
    <div className="relative w-full h-40">
      <img
        src={videos[0].image || "/placeholder.svg"}
        alt="Featured video"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

    <div className="mt-3">
      <h1 className="text-white text-lg font-semibold">Liked videos</h1>
      <p className="text-xs text-gray-300">Jane doe</p>
      <p className="text-xs text-gray-400 mt-1">
        {videos.length} videos • Updated 6 days ago
      </p>
    </div>

    <div className="flex items-center mt-3 gap-2">
      <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-4 py-1.5 text-sm">
        Play all
      </Button>
      <Button
        variant="outline"
        className="bg-white/10 text-white border-none hover:bg-white/20 rounded-full px-4 py-1.5 text-sm"
      >
        Shuffle
      </Button>
      <button className="ml-auto text-white/80 hover:text-white">
        <MoreVertical size={18} />
      </button>
    </div>
  </div>
</div>


          {/* Right side - Video list */}
          <div className="flex-1">
            {/* Tabs */}
            {/* <div className="flex gap-4 mb-4">
              <button className="px-4 py-1 text-sm font-medium bg-white text-black rounded-full">All</button>
              <button className="px-4 py-1 text-sm font-medium text-gray-400 hover:text-white">Videos</button>
              <button className="px-4 py-1 text-sm font-medium text-gray-400 hover:text-white">Shorts</button>
            </div> */}

            {/* Video list */}
            <div className="space-y-2">
              {videos.map((video, index) => (
                <div key={index} className="flex gap-4 p-2 hover:bg-[#272727] group rounded-lg">
                  <div className="flex items-center w-8 text-center text-gray-400 font-medium">{index + 1}</div>
                  <div className="relative w-40 h-24 flex-shrink-0">
                    <img
                      src={video.image || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      {index === 1 ? "2:16" : index === 2 ? "29:28" : "19:11"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                    <div className="flex flex-col mt-1 text-xs text-gray-400">
                      <span>{video.channel}</span>
                      <div className="flex items-center">
                        <span>{video.views} views</span>
                        <span className="mx-1">•</span>
                        <span>{video.time} ago</span>
                      </div>
                    </div>
                  </div>
                  <button className="self-start p-2 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-[#383838]">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LikedVideos
