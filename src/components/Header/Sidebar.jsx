import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import {
  BiHistory,
  BiLike,
  HiOutlineVideoCamera,
  IoFolderOutline,
  RiHome6Line,
} from "../icons";
import { userLogout } from "../../store/authSlice";
import { Plus } from "lucide-react";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.username);

  const sidebarTopItems = [
    {
      icon: <RiHome6Line size={22} />,
      title: "Home",
      url: "/",
    },
    {
      icon: <BiLike size={22} />,
      title: "Liked Videos",
      url: "/liked-videos",
    },
    {
      icon: <BiHistory size={22} />,
      title: "History",
      url: "/history",
    },
    {
      icon: <HiOutlineVideoCamera size={22} />,
      title: "My Content",
      url: username ? `/channel/${username}` : "/channel",
    },
    {
      icon: <IoFolderOutline size={22} />,
      title: "Collections",
      url: "/collections",
    },
  ];

  const handleCreateClick = () => {
    navigate("/collections");
  };

  const NavItem = ({ item }) => (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        `group relative flex items-center gap-4 px-4 py-3 text-sm transition-colors ${
          isActive
            ? "bg-[#0d3446] text-white font-medium"
            : "text-gray-300 hover:bg-[#0d3446] hover:text-[#00ed64]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`${
              isActive ? "text-[#00ed64]" : "group-hover:text-[#00ed64]"
            }`}
          >
            {item.icon}
          </span>
          <span>{item.title}</span>
          {isActive && (
            <div className="absolute left-0 top-0 h-full w-[4px] bg-[#00ed64]" />
          )}
        </>
      )}
    </NavLink>
  );

  const MobileNavItem = ({ item }) => (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center h-full px-2 text-sm relative ${
          isActive ? "text-[#00ed64]" : "text-gray-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="mb-1">{item.icon}</div>
          <span className="text-[11px] font-medium">{item.title}</span>
          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#00ed64]" />
          )}
        </>
      )}
    </NavLink>
  );

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      {/* Sidebar for large screens - unchanged */}
      <div className="text-white fixed left-0 top-14 h-[calc(100vh-56px)] w-64 bg-[#072331] border-r border-[#1e3a47] hidden sm:flex flex-col py-2">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {sidebarTopItems.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
          <div className="py-2 border-t border-[#1e3a47]">
            {username && (
              <button
                onClick={logout}
                className="group flex items-center gap-4 px-4 py-3 text-sm text-gray-300 hover:bg-[#0d3446] hover:text-[#00ed64] transition-colors w-full"
              >
                <IoMdLogOut size={20} className="group-hover:text-[#00ed64]" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar for mobile - with added + button */}
      <div className="sm:hidden fixed bottom-0 w-full h-16 bg-[#072331] border-t border-[#1e3a47] flex justify-around items-center text-white z-20">
        <MobileNavItem
          item={{
            icon: <RiHome6Line size={24} />,
            title: "Home",
            url: "/",
          }}
        />

        <MobileNavItem
          item={{
            icon: <BiHistory size={24} />,
            title: "History",
            url: "/history",
          }}
        />

        <button
          onClick={handleCreateClick}
          className="flex flex-col items-center justify-center ml-3 h-full px-2 text-sm relative"
        >
          <div className="mb-1 p-1  bg-[#00ed64] rounded-full">
            <Plus className="h-6 w-6 text-[#051622]" />
          </div>
          <span className="text-[11px] font-medium">Create</span>
        </button>

        <MobileNavItem
          item={{
            icon: <IoFolderOutline size={24} />,
            title: "Subscription",
            url: "/subscriptions",
          }}
        />

        <MobileNavItem
          item={{
            icon: <BiLike size={24} />,
            title: "Liked",
            url: "/liked-videos",
          }}
        />
      </div>
    </>
  );
}

export default Sidebar;
