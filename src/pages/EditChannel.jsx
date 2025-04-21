import { ChannelHeader, ChannelNavigate, Spinner } from "../components"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function EditChannel() {
  const channel = useSelector((state) => state.auth?.userData)
  const loading = useSelector((state) => state.auth?.loading)

  window.scrollTo(0, 0)

  return (
    <div className="min-h-screen bg-[#051622] text-white">
      <div className="sm:ml-60 pt-14">
        {loading && (
          <div className="w-full fixed top-20 flex justify-center z-50">
            <div className="w-52 border border-[#1e3a47] bg-[#072331] rounded-lg flex gap-2 p-3 items-center shadow-lg">
              <Spinner />
              <span className="text-sm font-medium text-white">Loading your profile...</span>
            </div>
          </div>
        )}

        {channel && (
          <ChannelHeader
            username={channel?.username}
            coverImage={channel?.coverImage}
            avatar={channel?.avatar}
            subscribedCount={channel?.channelsSubscribedToCount}
            fullName={channel?.fullName}
            subscribersCount={channel?.subcribersCount}
            isSubscribed={channel?.isSubscribed}
            channelId={channel?._id}
            edit={true}
          />
        )}

        <ChannelNavigate edit={true} />

        <div className="overflow-y-auto pb-20 sm:pb-0 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default EditChannel
