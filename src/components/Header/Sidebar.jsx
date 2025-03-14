import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Tv, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed left-0 top-14 h-[calc(100vh-56px)] w-60 bg-[#1A1A1A] border-r border-[#5f5d5d] flex flex-col">
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start px-3 py-2 text-sm transition-colors ${
              isActive("/")
                ? "text-white bg-[#7c3aed] hover:bg-[#6b21a8] hover:text-white"
                : "text-gray-300 hover:bg-[#333] hover:text-white"
            }`}
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-3" />
              Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start px-3 py-2 text-sm transition-colors ${
              isActive("/subscriptions")
                ? "text-white bg-[#7c3aed] hover:bg-[#6b21a8] hover:text-white"
                : "text-gray-300 hover:bg-[#333] hover:text-white"
            }`}
          >
            <Link to="/subscriptions">
              <Tv className="h-4 w-4 mr-3" />
              Subscriptions
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start px-3 py-2 text-sm transition-colors ${
              isActive("/your-videos")
                ? "text-white bg-[#7c3aed] hover:bg-[#6b21a8] hover:text-white"
                : "text-gray-300 hover:bg-[#333] hover:text-white"
            }`}
          >
            <Link to="/your-videos">
              <Play className="h-4 w-4 mr-3" />
              Your videos
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start px-3 py-2 text-sm transition-colors ${
              isActive("/liked-videos")
                ? "text-white bg-[#7c3aed] hover:bg-[#6b21a8] hover:text-white"
                : "text-gray-300 hover:bg-[#333] hover:text-white"
            }`}
          >
            <Link to="/liked-videos">
              <Heart className="h-4 w-4 mr-3" />
              Liked videos
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
