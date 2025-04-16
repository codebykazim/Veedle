"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import EditAvatar from "../EditAvatar"
import { useDispatch, useSelector } from "react-redux"
import { toggleSubscription } from "../../store/subscriptionSlice"
import { Link } from "react-router-dom"
import HeaderSkeleton from "@/skeleton/HeaderSkeleton"

function ChannelHeader({
  coverImage,
  avatar,
  username,
  fullName,
  subscribersCount,
  subscribedCount,
  isSubscribed,
  channelId,
  edit,
}) {
  const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed)
  const [localSubscribersCount, setLocalSubscribersCount] = useState(subscribersCount)
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.user?.profileData?._id)
  const user = useSelector((state) => state.auth?.userData?._id)
  const loading = useSelector((state) => state.user?.loading)

  useEffect(() => {
    setLocalSubscribersCount(subscribersCount)
    setLocalIsSubscribed(isSubscribed)
  }, [subscribersCount, isSubscribed])

  const handleSubscribe = () => {
    dispatch(toggleSubscription(channelId))
    setLocalIsSubscribed((prev) => !prev)
    if (localIsSubscribed) {
      setLocalSubscribersCount((prev) => prev - 1)
    } else {
      setLocalSubscribersCount((prev) => prev + 1)
    }
  }

  if (loading) {
    return <HeaderSkeleton />
  }

  return (
    <div className="w-full text-white">
      {/* Cover image section with position container */}
      <section className="w-full ">
        <div className="w-full">
          {coverImage ? (
            <img src={coverImage || "/placeholder.svg"} alt="Cover" className="sm:h-40 h-28 w-full object-cover" />
          ) : (
            <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
          )}
        </div>

        {/* Edit cover button - positioned relative to the cover */}
        {edit && (
          <div className="absolute bottom-135 right-40 sm:bottom-120 sm:right-140">
            <EditAvatar cover={true} preImage={coverImage} />
          </div>
        )}
      </section>

      {/* Channel details section - keeping avatar left-aligned */}
      <section className="w-full sm:px-5 p-2 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 relative">
        {/* Avatar section - left-aligned on all screen sizes */}
        <div className="relative sm:w-42 w-28 sm:h-32 h-28 sm:-mt-16 -mt-12 z-10">
          {avatar && (
            <img
              src={avatar || "/placeholder.svg"}
              alt={username}
              className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover border-2 border-purple-700"
            />
          )}
          {edit && (
            <div className="absolute inset-0 sm:right-3 flex justify-center items-center">
              <EditAvatar preImage={avatar} />
            </div>
          )}
        </div>

        {/* User information */}
        <div className="w-full px-1 mt-2 sm:mt-0">
          {/* Changed this div to always be flex-row */}
          <div className="flex flex-row justify-between items-start w-full">
            <div className="text-left">
              <h1 className="text-xl font-bold">{fullName}</h1>
              <h3 className="text-sm text-slate-400">@{username}</h3>
              <div className="flex gap-3">
                <p className="text-xs text-slate-400">{localSubscribersCount} Subscribers</p>
                <p className="text-xs text-slate-400">{subscribedCount} Subscribed</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex-shrink-0">
              {user == userProfile && !edit && (
                <Link to={"/edit"}>
                  <Button className="border-slate-500 hover:scale-110 transition-all text-white font-bold px-4 py-1 bg-purple-500">
                    Edit
                  </Button>
                </Link>
              )}
              {user != userProfile && !edit && (
                <Button
                  onClick={handleSubscribe}
                  className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500"
                >
                  {localIsSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              )}
              {edit && (
                <Link to={`/channel/${username}`}>
                  <Button className="border-slate-500 hover:scale-110 transition-all text-white font-bold px-4 py-1 bg-purple-500">
                    View Channel
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChannelHeader
