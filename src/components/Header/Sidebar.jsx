import { Link } from "react-router-dom"
import { Home, Heart, Tv, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
  // Mock subscription data
  const subscriptions = [
    { id: 1, name: "Mason Jeffrey", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Yejal Kakumani", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "May David", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Annete Holt", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 5, name: "June Ellis", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  return (
    <div className="fixed left-0 top-14 h-[calc(100vh-56px)] w-60 bg-[#1a1a1a] border-r border-[#333] flex flex-col">
      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-white bg-[#7c3aed] hover:bg-[#7c3aed]/90"
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-3" />
              Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white"
          >
            <Link to="/subscriptions">
              <Tv className="h-4 w-4 mr-3" />
              Subscriptions
            </Link>
          </Button>

          {/* <Button
            asChild
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white"
          >
            <Link to="/your-videos">
              <LayoutGrid className="h-4 w-4 mr-3" />
              Your Videos
            </Link>
          </Button> */}

<Button
            asChild
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white"
          >
            <Link to="/your-videos">
              <Play className="h-4 w-4 mr-3" />
              Your videos
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white"
          >
            <Link to="/liked-videos">
              <Heart className="h-4 w-4 mr-3" />
              Liked videos
            </Link>
          </Button>


        </nav>

        {/* Subscriptions Section */}
        <div className="mt-8">
          <h3 className="px-3 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subscriptions</h3>
          <div className="space-y-1">
            {subscriptions.map((sub) => (
              <Button
                key={sub.id}
                asChild
                variant="ghost"
                className="w-full justify-start px-3 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-white"
              >
                <Link to={`/subscriptions/${sub.id}`}>
                  <Avatar className="h-6 w-6 mr-3">
                    <AvatarImage src={sub.avatar} alt={sub.name} />
                    <AvatarFallback>{sub.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {sub.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
