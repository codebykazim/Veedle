"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubscribedChannels } from "../store/subscriptionSlice"
import { Link } from "react-router-dom"
import { Avatar } from "../components"
import ChannelSubscribersSkeleton from "@/skeleton/ChannelSubscribersSkeleton"

function MySubscriptions() {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.mySubscriptions)
  const subscriberId = useSelector((state) => state.auth?.userData?._id)
  const loading = useSelector((state) => state.subscription.loading);

  useEffect(() => {
    if (subscriberId) {
      dispatch(getSubscribedChannels(subscriberId))
    }
  }, [dispatch, subscriberId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <div className="bg-[#121212] min-h-screen px-0 sm:px-6 pt-16 sm:pt-14 sm:ml-60 pb-20 sm:pb-8">
        <ChannelSubscribersSkeleton />
      </div>
    )
  }


  if (!subscriptions?.length) {
    return (
      <div className="bg-[#121212] min-h-screen px-0 sm:px-6 pt-16 sm:pt-14 sm:ml-60 pb-20 sm:pb-8">
        <div className="flex flex-col items-center justify-center p-8 text-white">
          <div className="bg-[#1f1f1f] p-6 rounded-xl border border-slate-700 text-center max-w-md">
            <h3 className="text-xl font-medium mb-2">You're not subscribed to any channels yet</h3>
            <p className="text-gray-400">Subscribe to channels to see their latest videos here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#121212] min-h-screen px-0 sm:px-6 pt-16 sm:pt-14 sm:ml-60 pb-20 sm:pb-8">
      <h2 className="text-xl font-semibold text-white mb-6 px-4 sm:px-0">My Subscriptions</h2>

      <div className="bg-[#1f1f1f] rounded-lg overflow-hidden">
        <div className="divide-y divide-slate-700 text-white">
          {subscriptions.map((subscription) => {
            const channel = subscription?.subscribedChannel
            const latestVideo = channel?.latestVideo

            return (
              <div
                key={channel?._id}
                className="flex px-4 py-3 justify-between items-center hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex gap-3 items-center">
  <Link to={`/channel/${channel?.username}`}>
    <Avatar src={channel?.avatar} channelName={channel?.username} />
  </Link>
  <div>
    <h5 className="text-sm font-medium">{channel?.username}</h5>
    <p className="text-xs text-slate-400">{channel?.fullName}</p>
  </div>
</div>

                {latestVideo && (
                  <Link
                    to={`/watch/${latestVideo?._id}`}
                    className="text-sm px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Watch Latest
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MySubscriptions
