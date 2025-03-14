// import {Card } from "../components/ui/card"
import Card from "@/components/Card/Card"

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
]

function Home() {
  return (
    <div className="bg-[#121212] min-h-screen ml-60 mt-14">
      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 p-6">
        {videos.map((video, index) => (
          <Card
            key={index}
            title={video.title}
            image={video.image}
            avatar={video.avatar}
            channel={video.channel}
            views={video.views}
            time={video.time}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
