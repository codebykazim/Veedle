"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserChannelSubscribers } from "../../store/subscriptionSlice"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import ChannelSubscribersSkeleton from "@/skeleton/ChannelSubscribersSkeleton"
import { Users } from "lucide-react"

function ChannelSubscribers() {
  const dispatch = useDispatch()
  const channelId = useSelector((state) => state.user.profileData?._id)
  const subscribers = useSelector((state) => state.subscription.channelSubscribers)
  const loading = useSelector((state) => state.subscription.loading)

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelSubscribers(channelId))
    }
  }, [dispatch, channelId])

  if (loading) {
    return <ChannelSubscribersSkeleton />
  }

  if (!loading && (!subscribers || subscribers.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <div className="bg-[#072331] p-8 rounded-lg text-center max-w-md">
          <h3 className="text-xl font-medium mb-3">No subscribers yet</h3>
          <p className="text-gray-400">When people subscribe to your channel, they'll appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#072331] rounded-lg overflow-hidden">
      {/* <div className="p-4 border-b border-[#1e3a47]/30">
        <h2 className="text-xl font-medium text-white">Subscribers</h2>
        <p className="text-sm text-gray-400 mt-1">{subscribers.length} people subscribed to this channel</p>
      </div> */}

      <div className="divide-y divide-[#1e3a47]/20">
        {subscribers.map((subscriber) => (
          <Link
            to={`/channel/${subscriber?.subscriber?.username}`}
            key={subscriber?.subscriber?._id}
            className="flex px-5 py-4 justify-between items-center text-white hover:bg-[#051622]/50 transition-colors"
          >
            <div className="flex gap-4 items-center">
              <Avatar src={subscriber?.subscriber?.avatar} channelName={subscriber?.subscriber?.username} />
              <div>
                <h5 className="text-sm font-medium">{subscriber?.subscriber?.username}</h5>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users size={12} />
                  {subscriber?.subscriber?.subscribersCount} Subscribers
                </span>
              </div>
            </div>
            <Button
              className={`${
                subscriber?.subscriber?.subscribedToSubscriber
                  ? "bg-[#0d3446] hover:bg-[#164863]"
                  : "bg-[#00ed64] hover:bg-[#00c050] text-[#051622]"
              } text-xs py-1 px-4 rounded-md transition-colors`}
            >
              {subscriber?.subscriber?.subscribedToSubscriber ? "Subscribed" : "Subscribe"}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ChannelSubscribers
