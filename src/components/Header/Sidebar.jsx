import { Link } from "react-router-dom";
import { Home, TrendingUp, LayoutGrid, Heart, Video } from "lucide-react";

export default function Sidebar() {
  // Mock subscription data
  const subscriptions = [
    { id: 1, name: "Mason Jeffrey", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Yejal Kakumani", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "May David", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Annete Holt", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 5, name: "June Ellis", avatar: "/placeholder.svg?height=32&width=32" },
  ];

  return (
    <div className="fixed left-0 top-14 h-[calc(100vh-56px)] w-60 bg-[#1a1a1a] border-r border-[#333] flex flex-col">
      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          <Link to="/" className="flex items-center px-3 py-2 text-sm text-white bg-[#7c3aed] rounded-lg">
            <Home className="h-4 w-4 mr-3" />
            Home
          </Link>
          <Link to="/trending" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded-lg">
            <TrendingUp className="h-4 w-4 mr-3" />
            Trending
          </Link>
          <Link to="/categories" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded-lg">
            <LayoutGrid className="h-4 w-4 mr-3" />
            Categories
          </Link>
          <Link to="/favorites" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded-lg">
            <Heart className="h-4 w-4 mr-3" />
            Favorites
          </Link>
          <Link to="/videos" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded-lg">
            <Video className="h-4 w-4 mr-3" />
            Your videos
          </Link>
        </nav>

        {/* Subscriptions Section */}
        <div className="mt-8">
          <h3 className="px-3 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subscriptions</h3>
          <div className="space-y-1">
            {subscriptions.map((sub) => (
              <Link
                key={sub.id}
                to={`/subscriptions/${sub.id}`}
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-[#333] rounded-lg"
              >
                <div className="h-6 w-6 rounded-full overflow-hidden mr-3">
                  <img src={sub.avatar || "/placeholder.svg"} alt={sub.name} className="h-full w-full object-cover" />
                </div>
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
